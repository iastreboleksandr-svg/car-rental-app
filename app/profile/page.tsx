'use client';

import Avatar from '@/components/atoms/Avatar';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import Spinner from '@/components/atoms/Spinner';
import { useProfilePage } from '@/hooks/useProfilePage';
import { CarIcon, Link } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('userProfile');
  const tCommon = useTranslations('common');

  const {
    loading,

    profile,

    avatar,
    handleAvatarChange,
    openFilePicker,
    fileInputRef,

    isEditing,
    isSaving,
    startEditing,
    cancelEditing,
    handleSave,

    draft,
    setDraft,

    handleDeleteAccount,

    isChangePassword,
    startEditingPassword,
    setIsChangePassword,
    oldPassword,
    newPassword,
    setOldPassword,
    setNewPassword,
    handleSavePassword,
    cancelEditingPassword,

    error,
  } = useProfilePage();

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Профиль не найден</p>;
  }

  return (
    <>
      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-text-base">{t('title')}</h1>

        <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-10 flex flex-col items-center gap-3">
          <div onClick={openFilePicker} style={{ cursor: 'pointer' }}>
            <img
              src={avatar ?? profile.avatarUrl ?? '/default-avatar.png'}
              alt={t('avatar')}
              className="w-full h-full object-cover"
            />
          </div>
          <Avatar
            // src='../avatar.jpg'
            firstName="Jane"
            lastName="Smith"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />

          {!isEditing ? (
            <>
              <p className="text-sm text-text-muted">
                {t('createdAt')} {new Date(profile.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-text-muted">
                {t('email')}: {profile.email ?? '—'}
              </p>
              <p className="text-sm text-text-muted">
                {t('firstName')}: {profile.firstName ?? '—'}
              </p>
              <p className="text-sm text-text-muted">
                {t('lastName')}: {profile.lastName ?? '—'}
              </p>
              <p className="text-sm text-text-muted">
                {t('phone')}: {profile.phone ?? '—'}
              </p>
              <Button onClick={startEditing}>{t('edit')}</Button>
              <Button onClick={handleDeleteAccount}>{t('delete')}</Button>
            </>
          ) : (
            <>
              <Input
                label={t('firstName')}
                type="text"
                placeholder="Имя"
                autoComplete="off"
                onChange={(value) => setDraft((p) => ({ ...p, firstName: value }))}
                required
              />
              <Input
                label={t('lastName')}
                type="text"
                placeholder="Фамилия"
                autoComplete="off"
                onChange={(value) => setDraft((p) => ({ ...p, lastName: value }))}
                required
              />
              <Input
                label={t('phone')}
                type="text"
                placeholder="Телефон"
                autoComplete="off"
                onChange={(value) => setDraft((p) => ({ ...p, phone: value }))}
                required
              />
              <button onClick={cancelEditing}>Отмена</button>
              <button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
