'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { useBookingStats } from '@/hooks/useBookingStats';
import { StatusBadges } from './StatusBadges';

interface MobileMenuProps {
  isAuthenticated: boolean;
  unreadCount: number;
}

export function MobileMenu({ isAuthenticated, unreadCount }: MobileMenuProps) {
  const t = useTranslations('nav');
  const tAuth = useTranslations('auth');
  const [open, setOpen] = useState(false);
  const { token, refreshToken, logout } = useAuthStore();
  const { toggles, newCounts, isGroupEnabled } = useBookingStats();
  const router = useRouter();

  async function handleLogout() {
    setOpen(false);
    if (token && refreshToken) {
      await authService.logout(token, refreshToken).catch(() => {});
    }
    logout();
    router.replace('/');
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Меню"
        className="flex h-8 w-8 items-center justify-center rounded text-gray-600"
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white px-4 py-3 shadow-md">
          <nav className="flex flex-col gap-1">
            <Link href="/" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              {t('home')}
            </Link>

            {isAuthenticated && (
              <>
                <Link href="/search" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {t('search')}
                </Link>
                <Link href="/bookings" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {t('myBookings')}
                  {isGroupEnabled('myBookings') && (
                    <StatusBadges newCounts={newCounts.myBookings} toggles={toggles.myBookings} />
                  )}
                </Link>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {t('myCars')}
                </Link>
                <Link href="/bookings/incoming" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {t('incoming')}
                  {isGroupEnabled('incoming') && (
                    <StatusBadges newCounts={newCounts.incoming} toggles={toggles.incoming} />
                  )}
                </Link>
                <Link href="/notifications" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {t('notifications')}{unreadCount > 0 && ` (${unreadCount})`}
                </Link>
                <Link href="/profile" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {t('profile')}
                </Link>
                <Link href="/settings" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  {t('settings')}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                >
                  {tAuth('logout')}
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
