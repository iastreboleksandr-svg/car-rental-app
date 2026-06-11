'use client';

import { useState } from 'react';
import type { CarPhoto } from '@/types/car';

interface CarGalleryProps {
  photos?: CarPhoto[];
  alt?: string;
}

function CarImagePlaceholder() {
  return (
    <div className="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-gray-300">
        <path
          d="M5 11l1.5-4.5h11L19 11M3 11h18v7H3v-7zm2 7v2h2v-2H5zm12 0v2h2v-2h-2zM5.5 15a1 1 0 100-2 1 1 0 000 2zm13 0a1 1 0 100-2 1 1 0 000 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function CarGallery({ photos = [], alt = 'Car' }: CarGalleryProps) {
  const [activeImg, setActiveImg] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <CarImagePlaceholder />
      </div>
    );
  }

  const active = photos[Math.min(activeImg, photos.length - 1)];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={active.url} alt={alt} className="w-full h-full object-cover" />
      </div>
      {photos.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setActiveImg(i)}
              className={`w-16 h-12 rounded-lg border-2 overflow-hidden transition-colors ${
                i === activeImg ? 'border-[#48C964]' : 'border-transparent hover:border-gray-200'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
