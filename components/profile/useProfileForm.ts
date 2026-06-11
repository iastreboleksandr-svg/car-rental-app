'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { apiFetch } from '@/lib/apiFetch';
import { validateForm } from './validateProfile';
import type { ProfileFormData, FormErrors } from './validateProfile';
import type { UserProfile } from '@/types/profile';

const EMPTY_FORM: ProfileFormData = { firstName: '', lastName: '', phone: '' };

function toForm(profile: UserProfile): ProfileFormData {
  return {
    firstName: profile.firstName ?? '',
    lastName: profile.lastName ?? '',
    phone: profile.phone ?? '',
  };
}

export function useProfileForm() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hydrated);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [form, setForm] = useState<ProfileFormData>(EMPTY_FORM);
  const [backup, setBackup] = useState<ProfileFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState('');

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await apiFetch('/users/me');
      const text = await res.text();
      if (!res.ok) throw new Error(`Ошибка ${res.status}: ${text || 'нет ответа'}`);
      if (!text) throw new Error('Сервер вернул пустой ответ');
      const data: UserProfile = JSON.parse(text);
      setProfile(data);
      setForm(toForm(data));
      setAvatar(data.avatarUrl ?? null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hydrated && token) loadProfile();
  }, [hydrated, token, loadProfile]);

  const handleEditStart = useCallback(() => {
    setBackup(form);
    setErrors({});
    setSaveError('');
    setIsEditing(true);
  }, [form]);

  const handleCancel = useCallback(() => {
    setForm(backup);
    setErrors({});
    setSaveError('');
    setIsEditing(false);
  }, [backup]);

  const handleFieldChange = useCallback(
    (field: keyof ProfileFormData) => (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    },
    [],
  );

  const handleSave = useCallback(async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSaving(true);
    setSaveError('');
    try {
      const res = await apiFetch('/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`Ошибка ${res.status}: ${text || 'нет ответа'}`);
      setProfile((prev) => (prev ? { ...prev, ...form } : prev));
      updateUser(form);
      setIsEditing(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Не удалось сохранить');
    } finally {
      setIsSaving(false);
    }
  }, [form, updateUser]);

  const handleAvatarChange = useCallback(async (file: File) => {
    setAvatarError('');
    const previous = avatar;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await apiFetch('/users/me/avatar', { method: 'POST', body: formData });
      const text = await res.text();
      if (!res.ok) throw new Error(`Ошибка ${res.status}: ${text || 'нет ответа'}`);
      if (text) {
        const data = JSON.parse(text);
        if (data.avatarUrl) {
          setAvatar(data.avatarUrl);
          setProfile((prev) => (prev ? { ...prev, avatarUrl: data.avatarUrl } : prev));
          updateUser({ avatarUrl: data.avatarUrl });
        }
      }
    } catch (err) {
      setAvatar(previous);
      setAvatarError(err instanceof Error ? err.message : 'Не удалось загрузить аватар');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  return {
    user: profile,
    loading,
    loadError,
    form,
    errors,
    avatar,
    avatarError,
    isEditing,
    isSaving,
    saveError,
    handleEditStart,
    handleCancel,
    handleSave,
    handleAvatarChange,
    handleFieldChange,
  };
}
