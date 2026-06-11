'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/apiFetch';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';

export function useDeleteAccount() {
  const router = useRouter();
  const { token, refreshToken, logout } = useAuthStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    setIsDeleting(true);
    setError('');
    try {
      const res = await apiFetch('/users/me', { method: 'DELETE' });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Ошибка ${res.status}: ${text || 'нет ответа'}`);
      }
      if (token && refreshToken) {
        await authService.logout(token, refreshToken).catch(() => {});
      }
      logout();
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось удалить аккаунт');
      setIsDeleting(false);
    }
  }

  return { handleDelete, isDeleting, error };
}
