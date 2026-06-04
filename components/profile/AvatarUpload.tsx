'use client';

import { useRef } from 'react';
import { Camera } from 'lucide-react';

interface AvatarUploadProps {
  avatar: string | null;
  firstName: string;
  lastName: string;
  isEditing: boolean;
  onAvatarChange: (dataUrl: string) => void;
}

export function AvatarUpload({ avatar, firstName, lastName, isEditing, onAvatarChange }: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onAvatarChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-bg-page border-2 border-border-default">
          {avatar ? (
            <img src={avatar} alt="Фото профиля" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-subtle">
              <span className="text-2xl font-semibold text-brand">
                {(firstName[0] ?? '?').toUpperCase()}
                {(lastName[0] ?? '').toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {isEditing && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-brand text-text-inverse flex items-center justify-center shadow-md hover:bg-brand-hover transition-colors"
            aria-label="Изменить фото профиля"
          >
            <Camera size={13} />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        tabIndex={-1}
        aria-label="Загрузить фото профиля"
        onChange={handleFileChange}
      />

      {!isEditing && (
        <p className="mt-3 text-base font-semibold text-text-base">
          {firstName} {lastName}
        </p>
      )}
    </div>
  );
}