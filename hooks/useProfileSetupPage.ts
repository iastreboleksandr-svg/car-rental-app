'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useProfileSetupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleContinue() {
    router.push('/profile');
  }

  function handleSkip() {
    router.push('/profile');
  }

  return {
    firstName, setFirstName,
    lastName, setLastName,
    phone, setPhone,
    avatar,
    fileInputRef,
    openFilePicker,
    handleAvatarChange,
    handleContinue,
    handleSkip,
  };
}
