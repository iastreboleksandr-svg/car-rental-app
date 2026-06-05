'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { carService } from '@/services/car.service';
import type { CreateCarDto, FuelType, Transmission } from '@/types/car';

const INITIAL_FORM: CreateCarDto = {
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  fuelType: 'petrol',
  transmission: 'automatic',
  seats: 5,
  description: '',
  pricePerDay: 0,
  deposit: 0,
  lat: 0,
  lng: 0,
  address: '',
};

export function useCarNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreateCarDto>(INITIAL_FORM);

  const { mutate: createCar, isPending, error } = useMutation({
    mutationFn: (dto: CreateCarDto) => carService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars', 'me'] });
      router.replace('/dashboard');
    },
  });

  function handleChange<K extends keyof CreateCarDto>(key: K, value: CreateCarDto[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    createCar(form);
  }

  return {
    form,
    handleChange,
    handleSubmit,
    isPending,
    error,
    fuelType: form.fuelType as FuelType,
    transmission: form.transmission as Transmission,
  };
}
