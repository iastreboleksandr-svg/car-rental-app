'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useNotificationStore } from '@/store/notification.store';
import { UserDropdown } from './UserDropdown';
import { NotificationBadge } from './NotificationBadge';
import { MobileMenu } from './MobileMenu';

// Компонент навигационной ссылки с подсветкой активной страницы
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  // Проверяем совпадает ли текущий путь с href
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`
        text-sm font-medium transition-colors relative
        ${isActive ? 'text-[#48C964]' : 'text-gray-600 hover:text-gray-900'}
      `}
    >
      {children}
      {/* Подчёркивание под активной ссылкой */}
      {isActive && <span className="absolute -bottom-[18px] left-0 right-0 h-0.5 bg-[#48C964]" />}
    </Link>
  );
}

export function Header() {
  const { isAuthenticated, user } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const authenticated = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true' || isAuthenticated;
  const isOwner = user?.role === 'owner';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Логотип с иконкой и зелёным акцентом */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#48C964] flex items-center justify-center">
            <Car size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">
            Car<span className="text-[#48C964]">Rental</span>
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

              <NotificationBadge count={unreadCount} href="/notifications" />
              <UserDropdown />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                Войти
              </Link>
              <Link
                href="/login?tab=register"
                className="rounded-lg bg-[#48C964] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#32a84d] transition-colors"
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>

        <MobileMenu isAuthenticated={authenticated} unreadCount={unreadCount} />
      </div>
    </header>
  );
}
