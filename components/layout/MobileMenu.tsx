'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';

interface MobileMenuProps {
  isAuthenticated: boolean;
  unreadCount: number;
}

export function MobileMenu({ isAuthenticated, unreadCount }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuthStore();
  const isOwner = user?.role === 'owner';

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Меню"
        className="flex h-8 w-8 items-center justify-center rounded text-text-secondary"
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-t border-border-default bg-bg-card px-4 py-3 shadow-md">
          <nav className="flex flex-col gap-1">

            {isAuthenticated ? (
              <>
                <Link href="/" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                  Главная
                </Link>
                {isOwner ? (
                  <>
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                      Мои машины
                    </Link>
                    <Link href="/bookings/incoming" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                      Входящие брони
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/search" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                      Поиск
                    </Link>
                    <Link href="/bookings" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                      Мои брони
                    </Link>
                  </>
                )}
                <Link href="/notifications" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                  Уведомления{unreadCount > 0 && ` (${unreadCount})`}
                </Link>
                <Link href="/profile" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                  Профиль
                </Link>
                <Link href="/settings" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                  Настройки
                </Link>
                <button
                  type="button"
                  onClick={() => { setOpen(false); logout(); }}
                  className="rounded px-3 py-2 text-left text-sm text-text-error hover:bg-bg-error"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link href="/" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                  Главная
                </Link>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                  Войти
                </Link>
                <Link href="/login?tab=register" onClick={() => setOpen(false)} className="rounded px-3 py-2 text-sm text-text-secondary hover:bg-bg-page">
                  Регистрация
                </Link>
              </>
            )}

          </nav>
        </div>
      )}
    </div>
  );
}