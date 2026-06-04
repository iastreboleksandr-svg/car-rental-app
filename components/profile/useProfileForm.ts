import { useState, useRef } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { validateForm } from './validateProfile';
import type { ProfileFormData, FormErrors } from './validateProfile';

export function useProfileForm() {
  const { user } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ProfileFormData>({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: user?.phone ?? '',
  });
  const [backup, setBackup] = useState<ProfileFormData>(form);
  const [errors, setErrors] = useState<FormErrors>({});
  const [avatar, setAvatar] = useState<string | null>(user?.avatarUrl ?? null);

  const handleEditStart = () => {
    setBackup(form);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(backup);
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: вызов API для сохранения
    setIsEditing(false);
  };

  const handleAvatarChange = (dataUrl: string) => {
    setAvatar(dataUrl);
  };

  const handleFieldChange = (field: keyof ProfileFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return {
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
  };
}