'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Car, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useNotificationStore } from '@/store/notification.store';
import { UserDropdown } from './UserDropdown';
import { NotificationBadge } from './NotificationBadge';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTheme } from '@/components/providers/ThemeProvider';

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
  const { theme, toggleTheme } = useTheme();
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
            Car<span className="text-brand">Rental</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {authenticated && (
            <nav className="flex items-center gap-6">
              <NavLink href="/search">{t('search')}</NavLink>
              <NavLink href="/bookings" exact>{t('myBookings')}</NavLink>
              <NavLink href="/dashboard">{t('myCars')}</NavLink>
              <NavLink href="/bookings/incoming">{t('incoming')}</NavLink>
              <NotificationBadge count={unreadCount} href="/notifications" label={t('notifications')} />
              <UserDropdown />
            </nav>
          )}
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-border-default text-text-muted hover:text-text-base hover:bg-bg-page transition-colors"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        <MobileMenu isAuthenticated={authenticated} unreadCount={unreadCount} />
      </div>
    </header>
  );
}