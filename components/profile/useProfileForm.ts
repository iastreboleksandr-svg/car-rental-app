import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useSharedAvatar, setSharedAvatar } from '@/store/avatar.store';
import { validateForm } from './validateProfile';
import type { ProfileFormData, FormErrors } from './validateProfile';

export function useProfileForm() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Shared avatar = the committed value shown everywhere (profile + header).
  const sharedAvatar = useSharedAvatar();

  const [isEditing, setIsEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [form, setForm] = useState<ProfileFormData>({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: user?.phone ?? '',
  });
  const [backup, setBackup] = useState<ProfileFormData>(form);
  const [errors, setErrors] = useState<FormErrors>({});
  // While editing the avatar is a draft (revert on cancel); in view mode the
  // shared value is shown directly so it stays in sync with the header.
  const [draftAvatar, setDraftAvatar] = useState<string | null>(sharedAvatar);
  const avatar = isEditing ? draftAvatar : sharedAvatar;

  const handleEditStart = () => {
    setBackup(form);
    setDraftAvatar(sharedAvatar);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(backup);
    setDraftAvatar(sharedAvatar);
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO (backend): PATCH /users/me — { ...form, avatar } speichern (inkl. Foto)
    setSharedAvatar(draftAvatar); // commit draft → shared (syncs header)
    setBackup(form);
    setIsEditing(false);
  };

  const handleAvatarChange = (dataUrl: string) => {
    if (isEditing) {
      setDraftAvatar(dataUrl);
    } else {
      // View mode has no save button → persist immediately + sync everywhere.
      // TODO (backend): PATCH /users/me { avatar } sofort speichern.
      setSharedAvatar(dataUrl);
    }
  };

  const handleAvatarRemove = () => {
    if (isEditing) {
      setDraftAvatar(null);
    } else {
      // TODO (backend): PATCH /users/me { avatar: null } sofort speichern.
      setSharedAvatar(null);
    }
  };

  const handleFieldChange = (field: keyof ProfileFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const requestDelete = () => setConfirmingDelete(true);
  const cancelDelete = () => setConfirmingDelete(false);

  const handleDeleteProfile = () => {
    // TODO (backend): DELETE /users/me — Profil serverseitig löschen
    logout();
    router.push('/');
  };

  return {
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
  };
}