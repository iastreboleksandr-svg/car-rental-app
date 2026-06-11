'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Spinner from '@/components/atoms/Spinner';
import { AvatarUpload } from './AvatarUpload';
import { ProfileViewMode } from './ProfileViewMode';
import { ProfileEditMode } from './ProfileEditMode';
import { useProfileForm } from './useProfileForm';

export function ProfileCard() {
  const t = useTranslations('userProfile');
  const tCommon = useTranslations('common');
  const {
    user,
    loading,
    loadError,
    form,
    errors,
    avatar,
    avatarError,
    isEditing,
    isSaving,
    saveError,
    handleEditStart,
    handleCancel,
    handleSave,
    handleAvatarChange,
    handleFieldChange,
  } = useProfileForm();

  if (loading) {
    return (
      <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-10 flex items-center justify-center gap-2 text-text-muted">
        <Spinner size="sm" /> {tCommon('loading')}
      </div>
    );
  }

  if (loadError || !user) {
    return (
      <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-10 text-center text-sm text-text-error">
        {loadError || t('notFound')}
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-text-base">{t('title')}</h1>

        {isEditing && (
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-base transition-colors"
          >
            <X size={14} />
            {t('cancel')}
          </button>
        )}
      </div>

      <AvatarUpload
        avatar={avatar}
        firstName={form.firstName}
        lastName={form.lastName}
        isEditing={isEditing}
        onAvatarChange={handleAvatarChange}
      />

      {avatarError && <p className="text-xs text-text-error text-center mb-4">{avatarError}</p>}

      <hr className="border-border-default mb-6" />

      {isEditing ? (
        <>
          <ProfileEditMode
            form={form}
            errors={errors}
            onFieldChange={handleFieldChange}
            onSave={handleSave}
            saving={isSaving}
            saveLabel={t('save')}
            savingLabel={t('saving')}
          />
          {saveError && <p className="text-xs text-text-error mt-3">{saveError}</p>}
        </>
      ) : (
        <>
          <ProfileViewMode form={form} email={user.email ?? '—'} />

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleEditStart}
              className="text-sm text-brand hover:underline transition-colors"
            >
              {t('edit')}
            </button>

            <Link
              href="/profile/delete"
              className="text-sm text-text-error hover:underline transition-colors"
            >
              {t('delete')}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
