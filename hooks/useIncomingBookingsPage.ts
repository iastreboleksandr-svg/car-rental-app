'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services/booking.service';
import { useAuthStore } from '@/store/auth.store';

export type IncomingFilterTab = 'all' | 'pending' | 'confirmed';

export function useIncomingBookingsPage() {
  const hydrated = useAuthStore((s) => s._hydrated);
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<IncomingFilterTab>('all');

  const { data: allBookings = [], isLoading, isError } = useQuery({
    queryKey: ['bookings', 'incoming'],
    queryFn: () => bookingService.getIncoming(),
    enabled: hydrated && !!token,
    refetchInterval: 5000,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['bookings', 'incoming'] });

  const { mutate: confirm, isPending: isConfirming } = useMutation({
    mutationFn: (id: string) => bookingService.confirm(id),
    onSuccess: invalidate,
  });

  const { mutate: decline, isPending: isDeclining } = useMutation({
    mutationFn: (id: string) => bookingService.cancel(id),
    onSuccess: invalidate,
  });

  const { mutate: complete, isPending: isCompleting } = useMutation({
    mutationFn: (id: string) => bookingService.complete(id),
    onSuccess: invalidate,
  });

  const bookings = allBookings.filter((b) => {
    if (activeTab === 'all') return b.status !== 'CANCELLED';
    if (activeTab === 'pending') return b.status === 'PENDING';
    return b.status === 'CONFIRMED';
  });

  const pendingCount = allBookings.filter((b) => b.status === 'PENDING').length;

  return {
    bookings,
    isLoading,
    isError,
    activeTab,
    setActiveTab,
    confirm,
    decline,
    complete,
    isMutating: isConfirming || isDeclining || isCompleting,
    pendingCount,
  };
}
