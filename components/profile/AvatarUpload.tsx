'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, X, ZoomIn } from 'lucide-react';

interface AvatarUploadProps {
  avatar: string | null;
  firstName: string;
  lastName: string;
  isEditing: boolean;
  onAvatarChange: (file: File) => void;
}

export function AvatarUpload({
  avatar,
  firstName,
  lastName,
  isEditing,
  onAvatarChange,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onAvatarChange(file);
    e.target.value = '';
  };

  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [previewOpen]);

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-24 h-24 rounded-full overflow-hidden bg-bg-page border-2 border-border-default relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="Изменить фото профиля"
        >
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
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

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <Camera size={20} className="text-white" />
          </div>
        </button>

        {avatar && (
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            aria-label="Просмотреть фото профиля"
            className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-card bg-bg-card text-text-secondary shadow-md transition-colors hover:text-text-base"
          >
            <ZoomIn size={14} />
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

      {previewOpen && avatar && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-95 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Фото профиля"
            onClick={() => setPreviewOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              aria-label="Закрыть"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X size={18} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt="Фото профиля"
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
