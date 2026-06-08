'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { DateRange } from 'react-day-picker';
import { bookingService } from '@/services/booking.service';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';
import type { BusyRange } from '@/components/atoms/DateRangePicker';

function diffDays(from: Date, to: Date): number {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
}

export function useBookingNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId') ?? '';
  const hydrated = useAuthStore((s) => s._hydrated);

  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data: car } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => carService.getById(carId),
    enabled: !!carId && hydrated,
  });

  const { data: bookedDates = [], refetch: refetchBookedDates } = useQuery({
    queryKey: ['car', carId, 'booked-dates'],
    queryFn: () => carService.getBookedDates(carId),
    enabled: !!carId && hydrated,
  });

  const busyRanges: BusyRange[] = bookedDates.map((b) => ({
    from: new Date(b.startAt),
    to: new Date(b.endAt),
    type: b.bookingStatus === 'CONFIRMED' ? 'confirmed' : 'pending',
  }));

  const days = dateRange?.from && dateRange?.to ? diffDays(dateRange.from, dateRange.to) : 0;
  const pricePerDay = car?.pricePerDay ?? 0;
  const deposit = car?.deposit ?? 0;
  const rentalCost = days * pricePerDay;
  const total = rentalCost + deposit;

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: () =>
      bookingService.create({
        carId,
        startAt: dateRange!.from!.toISOString(),
        endAt: dateRange!.to!.toISOString(),
      }),
    onSuccess: () => {
      setTimeout(() => router.replace('/bookings'), 1000);
    },
  });

  function handleConfirm() {
    if (dateRange?.from && dateRange?.to) mutate();
  }

  return {
    carId,
    car,
    dateRange,
    setDateRange,
    busyRanges,
    days,
    pricePerDay,
    deposit,
    rentalCost,
    total,
    loading: isPending,
    confirmed: isSuccess,
    error,
    handleConfirm,
    refetchBookedDates,
  };
}
