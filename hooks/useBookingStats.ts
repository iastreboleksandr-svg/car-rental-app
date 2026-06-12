'use client';

import { useQuery } from '@tanstack/react-query';
import { bookingService } from '@/services/booking.service';
import { useAuthStore } from '@/store/auth.store';
import { useSettingsStore, computeNew, defaultUserState } from '@/store/settings.store';
import type { StatsGroup } from '@/store/settings.store';

export function useBookingStats() {
  const hydrated = useAuthStore((s) => s._hydrated);
  const token = useAuthStore((s) => s.token);
  const userId = useAuthStore((s) => s.user?.id);

  const settingsHydrated = useSettingsStore((s) => s._hydrated);
  const userState = useSettingsStore((s) => (userId ? s.byUser[userId] : undefined));

  const { toggles, baseline } = userState ?? defaultUserState();
  const anyEnabled = (['myBookings', 'incoming'] as const).some((g) =>
    toggles[g].pending || toggles[g].confirmed || toggles[g].cancelled,
  );

  const enabled = hydrated && settingsHydrated && !!token && !!userId && anyEnabled;

  const { data: stats } = useQuery({
    queryKey: ['bookings', 'stats', userId],
    queryFn: () => bookingService.getStats(),
    enabled,
    refetchInterval: anyEnabled ? 10000 : false,
    refetchOnMount: 'always',
  });

  const isGroupEnabled = (group: StatsGroup) =>
    toggles[group].pending || toggles[group].confirmed || toggles[group].cancelled;

  const newCounts = {
    myBookings: computeNew(stats, baseline, 'myBookings'),
    incoming: computeNew(stats, baseline, 'incoming'),
  };

  return {
    stats,
    toggles,
    newCounts,
    isGroupEnabled,
    enabled,
  };
}
