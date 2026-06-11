'use client';

import { use } from 'react';
import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { CarForm } from '@/components/cars/CarForm';

export default function CarEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <PrivateRoute>
      <CarForm mode="edit" carId={id} />
    </PrivateRoute>
  );
}
