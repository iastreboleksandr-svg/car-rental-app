'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';

export function useDashboardPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hydrated);
  const userId = useAuthStore((s) => s.user?.id);

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['cars', 'me', userId],
    queryFn: () => carService.getMine(),
    enabled: hydrated && !!token && !!userId,
    refetchInterval: 5000,
  });

  function goToEdit(id: string) {
    router.push(`/cars/${id}/edit`);
  }

  function goToSlots(id: string) {
    router.push(`/cars/${id}/slots`);
  }

  function goToNewCar() {
    router.push('/cars/new');
  }

  return { cars, isLoading, goToEdit, goToSlots, goToNewCar };
}
