'use client';

import { useQuery } from '@tanstack/react-query';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';

export function useCarDetailPage(id: string) {
  const hydrated = useAuthStore((s) => s._hydrated);

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', id],
    queryFn: () => carService.getById(id),
    enabled: !!id && hydrated,
  });

  return {
    car,
    isLoading: !hydrated || isLoading,
    isError,
  };
}
