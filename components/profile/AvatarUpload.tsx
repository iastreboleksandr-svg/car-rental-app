'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, X, ZoomIn } from 'lucide-react';

interface AvatarUploadProps {
  avatar: string | null;
  firstName: string;
  lastName: string;
  isEditing: boolean;
  onAvatarChange: (dataUrl: string) => void;
  onAvatarRemove: () => void;
}

export function AvatarUpload({
  avatar,
  firstName,
  lastName,
  isEditing,
  onAvatarChange,
  onAvatarRemove,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onAvatarChange(reader.result as string);
    reader.readAsDataURL(file);
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
        {/* The whole avatar is clickable — opens the file picker (change photo) */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Изменить фото профиля"
          className="group relative block h-24 w-24 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring focus-visible:ring-offset-2"
        >
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-border-default bg-bg-page">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt="Фото профиля" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand-subtle">
                <span className="text-2xl font-semibold text-brand">
                  {(firstName[0] ?? '?').toUpperCase()}
                  {(lastName[0] ?? '').toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Hover overlay hint */}
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <Camera size={20} className="text-white" />
          </span>
        </button>

        {/* Preview (magnifier) — only when a real photo exists */}
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

        {/* Delete photo — edit mode only, and only when a real photo exists */}
        {isEditing && avatar && (
          <button
            type="button"
            onClick={onAvatarRemove}
            aria-label="Удалить фото профиля"
            className="absolute -right-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-card bg-text-error text-white shadow-md transition-colors hover:bg-red-700"
          >
            <X size={14} />
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

      {/* Lightbox preview */}
      {previewOpen && avatar && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
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
