'use client';

import { Edit2, X, Trash2 } from 'lucide-react';
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
    confirmingDelete,
    handleEditStart,
    handleCancel,
    handleSave,
    handleAvatarChange,
    handleAvatarRemove,
    handleFieldChange,
    requestDelete,
    cancelDelete,
    handleDeleteProfile,
  } = useProfileForm();

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-text-base">Мой профиль</h1>

        {isEditing && (
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
        onAvatarRemove={handleAvatarRemove}
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
        <>
          <ProfileViewMode form={form} email={user?.email ?? '—'} />

          <div className="mt-6 border-t border-border-default pt-5">
            {confirmingDelete ? (
              <div className="flex flex-col gap-3 rounded-xl border border-border-error bg-bg-error p-4">
                <p className="text-sm text-text-base">
                  Удалить профиль? Это действие необратимо.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<Trash2 size={14} />}
                    onClick={handleDeleteProfile}
                  >
                    Удалить
                  </Button>
                  <Button variant="secondary" size="sm" onClick={cancelDelete}>
                    Отмена
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Trash2 size={14} />}
                  onClick={requestDelete}
                  className="text-text-error hover:bg-bg-error"
                >
                  Удалить профиль
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Edit2 size={14} />}
                  onClick={handleEditStart}
                >
                  Редактировать
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
