'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { UserDropdown } from './UserDropdown';
import { MobileMenu } from './MobileMenu';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`
        text-sm font-medium transition-colors relative
        ${isActive ? 'text-brand' : 'text-text-muted hover:text-text-base'}
      `}
    >
      {children}
      {isActive && <span className="absolute bottom-4.5 left-0 right-0 h-0.5 bg-brand" />}
    </Link>
  );
}

export function Header() {
  const { isAuthenticated, user } = useAuthStore();
  const authenticated = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true' || isAuthenticated;
  const isOwner = user?.role === 'owner';

  return (
    <header className="sticky top-0 z-50 bg-bg-card border-b border-border-default shadow-sm">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-ring flex items-center justify-center">
            <Car size={16} className="text-text-base" />
          </div>
          <span className="text-lg font-bold text-text-base">
            Car<span className="text-brand">Rental</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {authenticated ? (
            <>
              {isOwner ? (
                <>
                  <NavLink href="/">Главная</NavLink>
                  <NavLink href="/dashboard">Мои машины</NavLink>
                  <NavLink href="/bookings/incoming">Входящие брони</NavLink>
                </>
              ) : (
                <>
                  <NavLink href="/">Главная</NavLink>
                  <NavLink href="/search">Поиск</NavLink>
                  <NavLink href="/bookings">Мои брони</NavLink>
                </>
              )}
              <UserDropdown />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-text-muted hover:text-text-base">
                Войти
              </Link>
              <Link
                href="/login?tab=register"
                className="rounded-lg bg-brand-ring px-4 py-1.5 text-sm font-medium text-text-base hover:bg-brand-hover transition-colors"
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>

        <MobileMenu isAuthenticated={authenticated} />
      </div>
    </header>
  );
}