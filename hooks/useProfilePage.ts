'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { apiFetch } from '@/lib/apiFetch';

interface Profile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  isBlocked: boolean;
  createdAt: string;
}

export function useProfilePage() {
  const token = useAuthStore((s) => s.token);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
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

    if (token) {
      loadProfile();
    }
  }, [token]);

  return { profile, loading, error };
}
