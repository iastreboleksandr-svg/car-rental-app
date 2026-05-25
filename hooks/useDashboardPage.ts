'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';

export function useDashboardPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  // GET /cars/me не реализован на беке — фильтруем по ownerId
  const { data: allCars = [], isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: () => carService.getAll(),
  });

  const cars = allCars.filter((car) => car.ownerId === user?.id);

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
