'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services/booking.service';
import { useAuthStore } from '@/store/auth.store';
import type { BookingStatus } from '@/types/booking';

export type MyBookingsTab = 'all' | 'active' | 'completed' | 'cancelled';

const ACTIVE_STATUSES: BookingStatus[] = ['PENDING', 'CONFIRMED'];

export function useMyBookingsPage() {
  const hydrated = useAuthStore((s) => s._hydrated);
  const token = useAuthStore((s) => s.token);
  const userId = useAuthStore((s) => s.user?.id);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<MyBookingsTab>('all');

  const { data: allBookings = [], isLoading, isError } = useQuery({
    queryKey: ['bookings', 'my', userId],
    queryFn: () => bookingService.getMy(),
    enabled: hydrated && !!token && !!userId,
    refetchInterval: 5000,
    refetchOnMount: 'always',
  });

  const { mutate: cancel, isPending: isCancelling } = useMutation({
    mutationFn: (id: string) => bookingService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', 'my'] });
    },
  });

  const bookings = allBookings.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ACTIVE_STATUSES.includes(b.status);
    if (activeTab === 'completed') return b.status === 'COMPLETED';
    return b.status === 'CANCELLED';
  });

  return {
    bookings,
    isLoading,
    isError,
    activeTab,
    setActiveTab,
    cancel,
    isCancelling,
  };
}
