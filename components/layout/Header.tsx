'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useNotificationStore } from '@/store/notification.store';
import { UserDropdown } from './UserDropdown';
import { NotificationBadge } from './NotificationBadge';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const { isAuthenticated } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const authenticated = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true' || isAuthenticated;

  return (
    <header className="sticky top-0 z-50 shadow-sm border-gray-100 bg-white">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/search" className="text-lg font-semibold text-gray-900">
          CarRental
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {authenticated ? (
            <>
              <Link href="/search" className="text-sm text-gray-600 hover:text-gray-900">
                Search
              </Link>
              <Link href="/bookings" className="text-sm text-gray-600 hover:text-gray-900">
                My bookings
              </Link>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <NotificationBadge count={unreadCount} href="/notifications" />
              <UserDropdown />
            </>
          ) : (
            <>
            
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                Log in
              </Link>

              <Link
                href="/login?tab=register"
                className="rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>

        <MobileMenu isAuthenticated={authenticated} unreadCount={unreadCount} />
      </div>
    </header>
  );
}
