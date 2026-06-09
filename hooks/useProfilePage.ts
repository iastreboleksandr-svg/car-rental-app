'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { apiFetch } from '@/lib/apiFetch';
import { UserProfile } from '@/types/profiile';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { z } from 'zod';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
  phone: z
    .string()
    .regex(
      /^\+?\d{10,}$/,
      'Phone number must start with an optional "+" and contain at least 10 digits'
    ),
});

type ProfileFieldErrors = Partial<Record<keyof z.infer<typeof profileSchema>, string>>;

export function useProfilePage() {
  const { refreshToken, logout } = useAuthStore();

  const token = useAuthStore((s) => s.token);

  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draft, setDraft] = useState<Partial<UserProfile>>({});
  const [profileFieldErrors, setProfileFieldErrors] = useState<ProfileFieldErrors>({});

  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [token]);

  async function fetchProfile() {
    if (!token) {
      setError('Пользователь не авторизован');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await apiFetch('/users/me');

      const text = await res.text();

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${text || 'нет ответа'}`);
      }

      if (!text) {
        throw new Error('Сервер вернул пустой ответ');
      }

      const data = JSON.parse(text);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  }

  function startEditing() {
    if (!profile) {
      return;
    }
    setDraft(profile);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
  }

  async function handleSave() {
    if (!profile) {
      return;
    }
    
    setIsSaving(true);
    setError('');
    try {
      console.log('Saving profile changes...', draft);

      const { firstName, lastName, phone } = draft;

      const res = await apiFetch('/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${text || 'нет ответа'}`);
      }

      if (!text) {
        throw new Error('Сервер вернул пустой ответ');
      }

      setProfile((prev) => ({ ...prev!, ...draft }));
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (!profile) {
      return;
    }

    setError('');
    try {
      const res = await apiFetch('/users/me', {
        method: 'DELETE',
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${text || 'нет ответа'}`);
      }

      if (!text) {
        throw new Error('Сервер вернул пустой ответ');
      }

      if (token && refreshToken) {
        await authService.logout(token, refreshToken).catch(() => {});
      }
      logout();
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not delete account. Please try again.');
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!profile) {
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    const previousAvatar = avatar;

    const reader = new FileReader();
    reader.onload = async () => {
      const formData = new FormData();
      formData.append('file', file);
      // return request('/users/me/avatar', {
      //   method: 'POST',
      //   body: formData,
      // });

      //const base64 = reader.result as string;
      //setAvatar(base64); // превью

      try {
        const res = await apiFetch('/users/me/avatar', {
          method: 'POST',
          body: formData,
        });

        const text = await res.text();

        if (!res.ok) throw new Error(`Ошибка ${res.status}: ${text}`);

        if (!text) throw new Error('Сервер вернул пустой ответ');

        const data = JSON.parse(text);
        setProfile((prev) => ({ ...prev!, avatarUrl: data.avatarUrl }));
      } catch (err) {
        setAvatar(previousAvatar);
        setError(err instanceof Error ? err.message : 'Не удалось загрузить аватар');
      }
    };
    reader.readAsDataURL(file);
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function startEditingPassword() {
    setIsChangePassword(true);
  }

  function cancelEditingPassword() {
    setIsChangePassword(false);
  }

  async function handleSavePassword() {
    if (!profile) {
      return;
    }

    setError('');
    try {
      const res = await apiFetch('/users/me/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const text = await res.text();

      if (!res.ok) throw new Error(`Ошибка ${res.status}: ${text || 'нет ответа'}`);

      if (!text) throw new Error('Сервер вернул пустой ответ');

      setIsChangePassword(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сменить пароль');
    }
  }

  return {
    loading,

    profile,

    avatar,
    handleAvatarChange,
    openFilePicker,
    fileInputRef,

    isEditing,
    isSaving,
    startEditing,
    cancelEditing,
    handleSave,

    draft,
    setDraft,

    handleDeleteAccount,

    isChangePassword,
    startEditingPassword,
    setIsChangePassword,
    oldPassword,
    newPassword,
    setOldPassword,
    setNewPassword,
    handleSavePassword,
    cancelEditingPassword,

    error,
  };
}
