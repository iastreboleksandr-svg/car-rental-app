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

export function AvatarUpload({
  avatar,
  firstName,
  lastName,
  isEditing,
  onAvatarChange,
}: AvatarUploadProps) {
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
        {/* Весь аватар — кнопка, всегда кликабельна */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-24 h-24 rounded-full overflow-hidden bg-bg-page border-2 border-border-default relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="Изменить фото профиля"
        >
          {avatar ? (
            <img src={avatar} alt="Фото профиля" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-subtle">
              {firstName[0] || lastName[0] ? (
                <span className="text-2xl font-semibold text-brand">
                  {(firstName[0] ?? '').toUpperCase()}
                  {(lastName[0] ?? '').toUpperCase()}
                </span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 text-brand"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
          )}

          {/* Оверлей с иконкой камеры — появляется при hover */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <Camera size={20} className="text-white" />
          </div>
        </button>
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
