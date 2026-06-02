'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';

export function useCarDetailPage(id: string) {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hydrated);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', id],
    queryFn: () => carService.getById(id, token ?? undefined),
    enabled: !!id && hydrated && !!token,
  });

  function handleBook() {
    setLoading(true);
    setTimeout(() => {
      setBooked(true);
      setLoading(false);
    }, 800);
  }

  return {
    car,
    isLoading: !hydrated || isLoading,
    isError,
    booked,
    loading,
    handleBook,
  };
}
