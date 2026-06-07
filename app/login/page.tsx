'use client';

import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Mail, Lock, Eye } from 'lucide-react';
import { useLoginPage } from '@/hooks/useLoginPage';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('auth');
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
    <div className="flex items-center justify-center p-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 flex flex-col gap-6"
      >
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => switchTab('login')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'login'
                ? 'text-[#48C964] border-b-2 border-[#48C964]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t('login')}
          </button>
          <button
            type="button"
            onClick={() => switchTab('register')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'register'
                ? 'text-[#48C964] border-b-2 border-[#48C964]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {t('register')}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label={t('email')}
            type="email"
            leadingIcon={<Mail size={16} />}
            placeholder="user@example.com"
            hint={t('emailHint')}
            value={email}
            onChange={setEmail}
            autoComplete="off"
            required
          />
          <Input
            label={t('password')}
            type={showPassword ? 'text' : 'password'}
            leadingIcon={<Lock size={16} />}
            placeholder="••••••••"
            hint={t('passwordHint')}
            trailingIcon={
              <button onClick={() => setShowPassword(!showPassword)} type="button">
                <Eye size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            }
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            required
          />
          {tab === 'register' && (
            <Input
              label={t('confirmPassword')}
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
          {loading ? t('loginLoading') : tab === 'login' ? t('login') : t('register')}
        </Button>

        <p className="text-center text-sm text-gray-500">
          {tab === 'login' ? (
            <>
              {t('noAccount')}{' '}
              <button type="button" onClick={() => switchTab('register')} className="text-[#48C964] hover:underline">
                {t('register')}
              </button>
            </>
          ) : (
            <>
              {t('hasAccount')}{' '}
              <button type="button" onClick={() => switchTab('login')} className="text-[#48C964] hover:underline">
                {t('login')}
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
