'use client';

import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Mail, Lock, Eye } from 'lucide-react';
import { useLoginPage } from '@/hooks/useLoginPage';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('auth');

  const {
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
  } = useLoginPage();

  const Rule = ({ ok, text }: { ok: boolean; text: string }) => (
    <div className={`text-xs flex gap-2 ${ok ? 'text-green-500' : 'text-gray-400'}`}>
      <span>{ok ? '✓' : '○'}</span>
      <span>{text}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center p-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 flex flex-col gap-6"
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => switchTab('login')}
            className={`pb-2 px-4 text-sm font-medium ${
              tab === 'login' ? 'text-[#48C964] border-b-2 border-[#48C964]' : 'text-gray-400'
            }`}
          >
            {t('login')}
          </button>

          <button
            type="button"
            onClick={() => switchTab('register')}
            className={`pb-2 px-4 text-sm font-medium ${
              tab === 'register' ? 'text-[#48C964] border-b-2 border-[#48C964]' : 'text-gray-400'
            }`}
          >
            {t('register')}
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <Input
            label={t('email')}
            type="email"
            leadingIcon={<Mail size={16} />}
            value={email}
            onChange={setEmail}
            required
          />

          <Input
            label={t('password')}
            type={showPassword ? 'text' : 'password'}
            leadingIcon={<Lock size={16} />}
            trailingIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                <Eye size={16} />
              </button>
            }
            value={password}
            onChange={setPassword}
            required
          />

          {tab === 'register' && (
            <>
              <Input
                label={t('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                leadingIcon={<Lock size={16} />}
                trailingIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Eye size={16} />
                  </button>
                }
                value={confirmPassword}
                onChange={setConfirmPassword}
                required
              />

              {/* RULES (как на твоём скрине) */}
              <div className="flex flex-col gap-1 mt-2">
                <Rule ok={steps.passLength} text="Минимум 8 символов" />
                <Rule ok={steps.upper} text="A-Z (заглавные)" />
                <Rule ok={steps.lower} text="a-z (строчные)" />
                <Rule ok={steps.number} text="0-9 (цифры)" />
                <Rule ok={steps.special} text="!@# (символы)" />
                <Rule ok={steps.confirmMatch} text="Пароли совпадают" />
              </div>
            </>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? t('loginLoading') : tab === 'login' ? t('login') : t('register')}
        </Button>
      </form>
    </div>
  );
}
