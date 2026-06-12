'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Car } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useNotificationStore } from '@/store/notification.store';
import { useBookingStats } from '@/hooks/useBookingStats';
import { UserDropdown } from './UserDropdown';
import { StatusBadges } from './StatusBadges';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';

function NavLink({ href, children, exact }: { href: string; children: React.ReactNode; exact?: boolean }) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors relative ${
        isActive ? 'text-brand' : 'text-text-muted hover:text-text-base'
      }`}
    >
      {children}
      {isActive && <span className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-brand" />}
    </Link>
  );
}

const HIDDEN_ON = ['/'];

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const { toggles, newCounts, isGroupEnabled } = useBookingStats();
  const authenticated = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true' || isAuthenticated;

  if (HIDDEN_ON.includes(pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-bg-card border-b border-border-default shadow-sm">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-landing-cta-bg flex items-center justify-center">
            <Car size={16} className="text-text-inverse" />
          </div>
          <span className="text-lg font-bold text-text-base">
            Lunar <span className="text-brand">Carsharing</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {authenticated && (
            <nav className="flex items-center gap-6">
              <NavLink href="/search">{t('search')}</NavLink>
              <span className="flex items-center gap-1.5">
                <NavLink href="/bookings" exact>{t('myBookings')}</NavLink>
                {isGroupEnabled('myBookings') && (
                  <StatusBadges newCounts={newCounts.myBookings} toggles={toggles.myBookings} />
                )}
              </span>
              <NavLink href="/dashboard">{t('myCars')}</NavLink>
              <span className="flex items-center gap-1.5">
                <NavLink href="/bookings/incoming">{t('incoming')}</NavLink>
                {isGroupEnabled('incoming') && (
                  <StatusBadges newCounts={newCounts.incoming} toggles={toggles.incoming} />
                )}
              </span>
              <UserDropdown />
            </nav>
          )}
          <LanguageSwitcher />
        </div>

        <MobileMenu isAuthenticated={authenticated} unreadCount={unreadCount} />
      </div>
    </header>
  );
}
