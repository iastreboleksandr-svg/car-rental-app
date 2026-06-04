'use client';

import { Edit2, X } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { AvatarUpload } from './AvatarUpload';
import { ProfileViewMode } from './ProfileViewMode';
import { ProfileEditMode } from './ProfileEditMode';
import { useProfileForm } from './useProfileForm';

export function ProfileCard() {
  const {
    user,
    form,
    errors,
    avatar,
    isEditing,
    handleEditStart,
    handleCancel,
    handleSave,
    handleAvatarChange,
    handleFieldChange,
  } = useProfileForm();

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-text-base">Мой профиль</h1>

        {!isEditing ? (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Edit2 size={14} />}
            onClick={handleEditStart}
          >
            Редактировать
          </Button>
        ) : (
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-base transition-colors"
          >
            <X size={14} />
            Отмена
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

      <hr className="border-border-default mb-6" />

      {isEditing ? (
        <ProfileEditMode
          form={form}
          errors={errors}
          onFieldChange={handleFieldChange}
          onSave={handleSave}
        />
      ) : (
        <ProfileViewMode
          form={form}
          email={user?.email ?? '—'}
        />
      )}
    </div>
  );
}