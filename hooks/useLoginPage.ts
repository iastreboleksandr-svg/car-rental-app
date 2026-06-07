'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

type Steps = {
  emailValid: boolean;
  passLength: boolean;
  upper: boolean;
  lower: boolean;
  number: boolean;
  special: boolean;
  confirmMatch: boolean;
};

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

  const [steps, setSteps] = useState<Steps>({
    emailValid: false,
    passLength: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
    confirmMatch: false,
  });

  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  useEffect(() => {
    const emailValid = email.includes('@') && email.includes('.');

    const passLength = password.length >= 8;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const confirmMatch =
      tab === 'register' ? password === confirmPassword && confirmPassword.length > 0 : true;

    setSteps({
      emailValid,
      passLength,
      upper,
      lower,
      number,
      special,
      confirmMatch,
    });
  }, [email, password, confirmPassword, tab]);

  function switchTab(next: 'login' | 'register') {
    setTab(next);
    setError('');
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (tab === 'register' && !steps.confirmMatch) {
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
      router.replace('/search');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  }

  return {
    tab,
    switchTab,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    loading,
    handleSubmit,
    steps,
  };
}
