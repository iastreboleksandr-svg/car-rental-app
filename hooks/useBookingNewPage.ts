'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { DateRange } from 'react-day-picker';
import { bookingService } from '@/services/booking.service';
import { carService } from '@/services/car.service';
import { useAuthStore } from '@/store/auth.store';
import type { BusyRange, AvailableRange } from '@/components/atoms/DateRangePicker';

function diffDays(from: Date, to: Date): number {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)));
}

function toUtcMidnightIso(d: Date): string {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
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

  const { data: availability, refetch: refetchBookedDates } = useQuery({
    queryKey: ['car', carId, 'booked-dates'],
    queryFn: () => carService.getBookedDates(carId),
    enabled: !!carId && hydrated,
  });

  const busyRanges: BusyRange[] = (availability?.bookings ?? []).map((b) => ({
    from: new Date(b.startAt),
    to: new Date(b.endAt),
    type: b.bookingStatus === 'CONFIRMED' ? 'confirmed' : 'pending',
  }));

  const availableRanges: AvailableRange[] = (availability?.slots ?? [])
    .filter((s) => s.periodType === 'available')
    .map((s) => ({ from: new Date(s.dateFrom), to: new Date(s.dateTo) }));

  const blockedRanges: BusyRange[] = (availability?.slots ?? [])
    .filter((s) => s.periodType === 'blocked')
    .map((s) => ({ from: new Date(s.dateFrom), to: new Date(s.dateTo), type: 'blocked' }));

  const days = dateRange?.from && dateRange?.to ? diffDays(dateRange.from, dateRange.to) : 0;
  const pricePerDay = car?.pricePerDay ?? 0;
  const deposit = car?.deposit ?? 0;
  const rentalCost = days * pricePerDay;
  const total = rentalCost + deposit;

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: () =>
      bookingService.create({
        carId,
        startAt: toUtcMidnightIso(dateRange!.from!),
        endAt: toUtcMidnightIso(dateRange!.to!),
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
    availableRanges,
    blockedRanges,
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
