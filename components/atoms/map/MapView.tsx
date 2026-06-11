'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

const MapViewInner = dynamic(() => import('./MapViewInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-56 rounded-xl bg-bg-disabled flex items-center justify-center text-text-muted">
      <MapPin size={24} />
    </div>
  ),
});

interface MapViewProps {
  lat: number;
  lng: number;
}

export function MapView({ lat, lng }: MapViewProps) {
  if (lat === 0 && lng === 0) return null;
  return <MapViewInner lat={lat} lng={lng} />;
}
