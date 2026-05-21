'use client';

import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Mail, Lock, Eye } from 'lucide-react';
import { useLoginPage } from '@/hooks/useLoginPage';

export default function LoginPage() {
  const {
    tab, switchTab,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    showConfirmPassword, setShowConfirmPassword,
    error,
    loading,
    handleSubmit,
  } = useLoginPage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 flex flex-col gap-6"
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => switchTab('login')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'login'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Войти
          </button>
          <button
            type="button"
            onClick={() => switchTab('register')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'register'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Зарегистрироваться
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            leadingIcon={<Mail size={16} />}
            placeholder="user@example.com"
            value={email}
            onChange={setEmail}
            required
          />

          <Input
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            leadingIcon={<Lock size={16} />}
            trailingIcon={
              <button onClick={() => setShowPassword(!showPassword)} type="button">
                <Eye size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            }
            value={password}
            onChange={setPassword}
            required
          />

          {tab === 'register' && (
            <Input
              label="Подтверждение пароля"
              type={showConfirmPassword ? 'text' : 'password'}
              leadingIcon={<Lock size={16} />}
              trailingIcon={
                <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                  <Eye size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              }
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />
          )}
        </div>

        {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Загрузка...' : tab === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>

        <p className="text-center text-sm text-gray-500">
          {tab === 'login' ? (
            <>
              Нет аккаунта?{' '}
              <button type="button" onClick={() => switchTab('register')} className="text-blue-500 hover:underline">
                Зарегистрируйтесь
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{' '}
              <button type="button" onClick={() => switchTab('login')} className="text-blue-500 hover:underline">
                Войти
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
