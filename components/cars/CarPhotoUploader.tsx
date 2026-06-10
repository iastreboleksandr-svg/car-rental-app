'use client';

import { useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import type { CarPhoto } from '@/types/car';
import type { PhotoDraft } from '@/hooks/useCarForm';
import { PHOTO_ACCEPTED_TYPES } from '@/lib/carForm';

interface CarPhotoUploaderProps {
  newPhotos: PhotoDraft[];
  existingPhotos: CarPhoto[];
  onAddFiles: (files: FileList | File[]) => void;
  onRemoveNew: (uid: string) => void;
  onRemoveExisting: (id: string) => void;
  disabled?: boolean;
  error?: string;
  fileError?: string;
  labels: {
    drop: string;
    formats: string;
    remove: string;
  };
}

function Thumb({
  src,
  onRemove,
  removeLabel,
  disabled,
}: {
  src: string;
  onRemove: () => void;
  removeLabel: string;
  disabled?: boolean;
}) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl border border-border-default bg-bg-disabled">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity hover:bg-black/75 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}

export function CarPhotoUploader({
  newPhotos,
  existingPhotos,
  onAddFiles,
  onRemoveNew,
  onRemoveExisting,
  disabled = false,
  error,
  fileError,
  labels,
}: CarPhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length) onAddFiles(e.dataTransfer.files);
  }

  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={[
          'flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors',
          disabled ? 'cursor-not-allowed opacity-60' : '',
          dragOver
            ? 'border-border-focus bg-brand-subtle'
            : hasError
              ? 'border-border-error bg-bg-error'
              : 'border-border-focus bg-brand-subtle/50 hover:bg-brand-subtle/80',
        ].join(' ')}
      >
        <ImagePlus size={24} className="text-brand" aria-hidden="true" />
        <span className="text-sm font-medium text-brand">{labels.drop}</span>
        <span className="text-xs text-text-muted">{labels.formats}</span>
        <input
          ref={inputRef}
          type="file"
          accept={PHOTO_ACCEPTED_TYPES.join(',')}
          multiple
          className="hidden"
          disabled={disabled}
          onChange={(e) => {
            if (e.target.files?.length) onAddFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {(existingPhotos.length > 0 || newPhotos.length > 0) && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {existingPhotos.map((p) => (
            <Thumb
              key={p.id}
              src={p.url}
              onRemove={() => onRemoveExisting(p.id)}
              removeLabel={labels.remove}
              disabled={disabled}
            />
          ))}
          {newPhotos.map((p) => (
            <Thumb
              key={p.uid}
              src={p.preview}
              onRemove={() => onRemoveNew(p.uid)}
              removeLabel={labels.remove}
              disabled={disabled}
            />
          ))}
        </div>
      )}

      {fileError && <p className="text-xs text-text-error">{fileError}</p>}
      {error && <p className="text-xs text-text-error">{error}</p>}
    </div>
  );
}

export default CarPhotoUploader;
