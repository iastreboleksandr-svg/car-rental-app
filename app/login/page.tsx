'use client';

import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Mail, Lock, Eye } from 'lucide-react';
import { useState } from 'react';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (tab === 'register') {
      if (!firstName.trim()) newErrors.firstName = 'Введите имя';
      if (!lastName.trim()) newErrors.lastName = 'Введите фамилию';
    }

    if (!email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Введите корректный email, например user@example.com';
    }

    if (!password) {
      newErrors.password = 'Введите пароль';
    } else if (tab === 'register' && password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    }

    if (tab === 'register' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Форма валидна');
    }
  };

  const handleTabChange = (newTab: 'login' | 'register') => {
    setTab(newTab);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page">
      <div className="bg-bg-card rounded-2xl shadow-md w-full max-w-md p-6 flex flex-col gap-6">

        {/* Tabs */}
        <div role="tablist" aria-label="Форма входа" className="flex border-b border-border-default">
          <button
            role="tab"
            aria-selected={tab === 'login'}
            aria-controls="panel-login"
            id="tab-login"
            onClick={() => handleTabChange('login')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'login'
                ? 'text-brand border-b-2 border-brand'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            Войти
          </button>
          <button
            role="tab"
            aria-selected={tab === 'register'}
            aria-controls="panel-register"
            id="tab-register"
            onClick={() => handleTabChange('register')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'register'
                ? 'text-brand border-b-2 border-brand'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            Зарегистрироваться
          </button>
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={tab === 'login' ? 'panel-login' : 'panel-register'}
          aria-labelledby={tab === 'login' ? 'tab-login' : 'tab-register'}
          className="flex flex-col gap-4"
        >
          {tab === 'register' && (
            <>
              <Input
                label="Имя"
                type="text"
                placeholder="Иван"
                value={firstName}
                onChange={setFirstName}
                error={errors.firstName}
                required
              />
              <Input
                label="Фамилия"
                type="text"
                placeholder="Иванов"
                value={lastName}
                onChange={setLastName}
                error={errors.lastName}
                required
              />
            </>
          )}

          <Input
            label="Email"
            type="email"
            leadingIcon={<Mail size={16} />}
            placeholder="user@example.com"
            value={email}
            onChange={setEmail}
            error={errors.email}
            required
          />

          <Input
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            leadingIcon={<Lock size={16} />}
            trailingIcon={
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                <Eye size={16} className="text-text-muted hover:text-text-secondary" />
              </button>
            }
            value={password}
            onChange={setPassword}
            error={errors.password}
            hint={tab === 'register' ? 'Минимум 8 символов' : undefined}
            required
          />

          {tab === 'register' && (
            <Input
              label="Подтверждение пароля"
              type={showConfirmPassword ? 'text' : 'password'}
              leadingIcon={<Lock size={16} />}
              trailingIcon={
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                  aria-label={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  <Eye size={16} className="text-text-muted hover:text-text-secondary" />
                </button>
              }
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
              required
            />
          )}
        </div>

        {/* Submit */}
        <Button className="w-full" onClick={handleSubmit}>
          {tab === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>

        {/* Switch link */}
        <p className="text-center text-sm text-text-muted">
          {tab === 'login' ? (
            <>
              Нет аккаунта?{' '}
              <button
                onClick={() => handleTabChange('register')}
                className="text-text-link hover:underline font-medium"
              >
                Зарегистрируйтесь
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{' '}
              <button
                onClick={() => handleTabChange('login')}
                className="text-text-link hover:underline font-medium"
              >
                Войти
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}




