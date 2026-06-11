'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

const LocationPickerMap = dynamic(() => import('./LocationPickerMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 rounded-xl bg-bg-disabled flex items-center justify-center text-text-muted">
      <MapPin size={24} />
    </div>
  ),
});

interface LocationPickerProps {
  label?: string;
  hint?: string;
  lat: number;
  lng: number;
  onChange: (lat: number, lng: number) => void;
}

export function LocationPicker({ label, hint, lat, lng, onChange }: LocationPickerProps) {
  const hasPoint = lat !== 0 || lng !== 0;

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-text-secondary">{label}</label>}
      <LocationPickerMap lat={lat} lng={lng} onChange={onChange} />
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
      {hasPoint && (
        <p className="text-xs text-text-muted">
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>
      )}
    </div>
  );
}
