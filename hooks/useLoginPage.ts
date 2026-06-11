'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

function authCookieHasToken(token: string): boolean {
  const match = document.cookie.match(/(?:^|; )auth=([^;]*)/);
  if (!match) return false;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return parsed?.state?.token === token;
  } catch {
    return false;
  }
}

async function waitForAuthCookie(token: string, attempts = 20): Promise<void> {
  for (let i = 0; i < attempts; i++) {
    if (authCookieHasToken(token)) return;
    await new Promise((r) => setTimeout(r, 25));
  }
}

export function useLoginPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore((s) => s.setAuth);

  const PASSWORD_MIN_LENGTH = 12;

  const passwordRules = {
    length: password.length >= PASSWORD_MIN_LENGTH,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    match: confirmPassword.length > 0 && password === confirmPassword,
  };

  function switchTab(next: 'login' | 'register') {
    setTab(next);
    setError('');
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (tab === 'register' && password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      const data =
        tab === 'login'
          ? await authService.login(email, password)
          : await authService.register(email, password);

      setAuth(data.user, data.accessToken, data.refreshToken);

      await waitForAuthCookie(data.accessToken);
      window.location.assign('/search');
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  }

  return {
    tab,
    switchTab,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    error,
    loading,
    handleSubmit,
    passwordRules,
    passwordMinLength: PASSWORD_MIN_LENGTH,
  };
}
