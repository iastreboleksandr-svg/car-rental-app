'use client';

import { useTranslations } from 'next-intl';
import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { Toggle } from '@/components/atoms/Toggle';
import { useAuthStore } from '@/store/auth.store';
import { useSettingsStore, defaultUserState } from '@/store/settings.store';
import type { StatsGroup, StatsKey } from '@/store/settings.store';

const GROUPS: StatsGroup[] = ['myBookings', 'incoming'];
const KEYS: { key: StatsKey; dot: string }[] = [
  { key: 'pending', dot: 'bg-amber-500' },
  { key: 'confirmed', dot: 'bg-brand' },
  { key: 'cancelled', dot: 'bg-gray-400' },
];

export default function SettingsPage() {
  const t = useTranslations('settings');
  const userId = useAuthStore((s) => s.user?.id);
  const userState = useSettingsStore((s) => (userId ? s.byUser[userId] : undefined));
  const toggleFn = useSettingsStore((s) => s.toggle);
  const toggles = (userState ?? defaultUserState()).toggles;

  return (
    <PrivateRoute>
      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-text-base">{t('title')}</h1>

        <div className="flex flex-col gap-2 rounded-2xl border border-border-default bg-bg-card p-5">
          <h2 className="text-base font-semibold text-text-base">{t('notifTitle')}</h2>
          <p className="text-sm text-text-muted mb-2">{t('notifDesc')}</p>

          <div className="flex flex-col gap-5">
            {GROUPS.map((group) => (
              <div key={group} className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-text-muted tracking-widest uppercase">
                  {t(group)}
                </p>
                {KEYS.map(({ key, dot }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                      {t(key)}
                    </span>
                    <Toggle
                      checked={toggles[group][key]}
                      onChange={() => userId && toggleFn(userId, group, key)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
