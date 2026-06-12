'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services/booking.service';
import { useAuthStore } from '@/store/auth.store';
import { useSettingsStore } from '@/store/settings.store';
import type { StatsGroup } from '@/store/settings.store';
import type { BookingStats } from '@/types/booking';

export function useMarkStatsSeen(group: StatsGroup) {
  const token = useAuthStore((s) => s.token);
  const userId = useAuthStore((s) => s.user?.id);
  const settingsHydrated = useSettingsStore((s) => s._hydrated);
  const resetGroupBaseline = useSettingsStore((s) => s.resetGroupBaseline);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!settingsHydrated || !token || !userId) return;

    let cancelled = false;

    const mark = async () => {
      const cached = queryClient.getQueryData<BookingStats>(['bookings', 'stats', userId]);
      const stats = cached ?? (await bookingService.getStats().catch(() => undefined));
      if (!cancelled && stats && userId) {
        resetGroupBaseline(userId, group, stats[group]);
      }
    };

    mark();

    return () => {
      cancelled = true;
    };
  }, [group, settingsHydrated, token, userId, queryClient, resetGroupBaseline]);
}
