'use client';

import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Mail, Lock, Eye, Check, Circle } from 'lucide-react';
import { useLoginPage } from '@/hooks/useLoginPage';
import { useTranslations } from 'next-intl';

function PasswordRule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className={`text-xs flex items-center gap-2 transition-colors ${ok ? 'text-brand' : 'text-text-muted'}`}>
      {ok ? <Check size={13} /> : <Circle size={13} />}
      <span>{text}</span>
    </div>
  );
}

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
    passwordRules,
    passwordMinLength,
  } = useLoginPage();

  return (
    <div className="flex items-center justify-center p-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 flex flex-col gap-6"
      >
        <div className="flex border-b border-border-default">
          <button
            type="button"
            onClick={() => switchTab('login')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'login'
                ? 'text-brand border-b-2 border-brand'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {t('login')}
          </button>
          <button
            type="button"
            onClick={() => switchTab('register')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'register'
                ? 'text-brand border-b-2 border-brand'
                : 'text-text-muted hover:text-text-secondary'
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
                <Eye size={16} className="text-text-muted hover:text-text-secondary" />
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
                  <Eye size={16} className="text-text-muted hover:text-text-secondary" />
                </button>
              }
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />
          )}

          {tab === 'register' && (
            <div className="flex flex-col gap-1.5">
              <PasswordRule ok={passwordRules.length} text={t('rules.length', { min: passwordMinLength })} />
              <PasswordRule ok={passwordRules.upper} text={t('rules.upper')} />
              <PasswordRule ok={passwordRules.lower} text={t('rules.lower')} />
              <PasswordRule ok={passwordRules.number} text={t('rules.number')} />
              <PasswordRule ok={passwordRules.special} text={t('rules.special')} />
              <PasswordRule ok={passwordRules.match} text={t('rules.match')} />
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500 -mt-2">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t('loginLoading') : tab === 'login' ? t('login') : t('register')}
        </Button>

        <p className="text-center text-sm text-text-muted">
          {tab === 'login' ? (
            <>
              {t('noAccount')}{' '}
              <button type="button" onClick={() => switchTab('register')} className="text-brand hover:underline">
                {t('register')}
              </button>
            </>
          ) : (
            <>
              {t('hasAccount')}{' '}
              <button type="button" onClick={() => switchTab('login')} className="text-brand hover:underline">
                {t('login')}
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
