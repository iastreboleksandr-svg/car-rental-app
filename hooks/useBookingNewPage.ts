'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import type { DateRange } from 'react-day-picker';
import { bookingService } from '@/services/booking.service';

function diffDays(from: Date, to: Date): number {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
}

export function useBookingNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId') ?? '';

  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const days = dateRange?.from && dateRange?.to ? diffDays(dateRange.from, dateRange.to) : 0;

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
    dateRange,
    setDateRange,
    days,
    loading: isPending,
    confirmed: isSuccess,
    error,
    handleConfirm,
  };
}
