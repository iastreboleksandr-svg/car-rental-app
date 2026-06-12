import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { BookingStats, BookingStatsCounts } from '@/types/booking';

export type StatsGroup = 'myBookings' | 'incoming';
export type StatsKey = 'pending' | 'confirmed' | 'cancelled';

export interface ToggleState {
  pending: boolean;
  confirmed: boolean;
  cancelled: boolean;
}

export interface UserNotificationState {
  toggles: Record<StatsGroup, ToggleState>;
  baseline: Record<StatsGroup, BookingStatsCounts>;
}

const emptyCounts: BookingStatsCounts = { pending: 0, confirmed: 0, cancelled: 0 };
const defaultToggles: ToggleState = { pending: true, confirmed: true, cancelled: true };

export function defaultUserState(): UserNotificationState {
  return {
    toggles: {
      myBookings: { ...defaultToggles },
      incoming: { ...defaultToggles },
    },
    baseline: {
      myBookings: { ...emptyCounts },
      incoming: { ...emptyCounts },
    },
  };
}

interface SettingsState {
  byUser: Record<string, UserNotificationState>;
  _hydrated: boolean;
  getForUser: (userId: string | undefined) => UserNotificationState;
  toggle: (userId: string, group: StatsGroup, key: StatsKey) => void;
  resetGroupBaseline: (userId: string, group: StatsGroup, counts: BookingStatsCounts) => void;
  anyEnabled: (userId: string | undefined) => boolean;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      byUser: {},
      _hydrated: false,
      getForUser: (userId) => {
        if (!userId) return defaultUserState();
        return get().byUser[userId] ?? defaultUserState();
      },
      toggle: (userId, group, key) =>
        set((state) => {
          const current = state.byUser[userId] ?? defaultUserState();
          return {
            byUser: {
              ...state.byUser,
              [userId]: {
                ...current,
                toggles: {
                  ...current.toggles,
                  [group]: { ...current.toggles[group], [key]: !current.toggles[group][key] },
                },
              },
            },
          };
        }),
      resetGroupBaseline: (userId, group, counts) =>
        set((state) => {
          const current = state.byUser[userId] ?? defaultUserState();
          return {
            byUser: {
              ...state.byUser,
              [userId]: {
                ...current,
                baseline: { ...current.baseline, [group]: { ...counts } },
              },
            },
          };
        }),
      anyEnabled: (userId) => {
        const { toggles } = get().getForUser(userId);
        return (['myBookings', 'incoming'] as StatsGroup[]).some((g) =>
          (['pending', 'confirmed', 'cancelled'] as StatsKey[]).some((k) => toggles[g][k]),
        );
      },
    }),
    {
      name: 'lunar-notifications',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ byUser: state.byUser }),
      onRehydrateStorage: () => (state) => {
        if (state) state._hydrated = true;
      },
    },
  ),
);

export function computeNew(
  stats: BookingStats | undefined,
  baseline: Record<StatsGroup, BookingStatsCounts>,
  group: StatsGroup,
): BookingStatsCounts {
  if (!stats) return { ...emptyCounts };
  const current = stats[group];
  const base = baseline[group];
  return {
    pending: Math.max(0, current.pending - base.pending),
    confirmed: Math.max(0, current.confirmed - base.confirmed),
    cancelled: Math.max(0, current.cancelled - base.cancelled),
  };
}
