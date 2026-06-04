'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

export function UserDropdown() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initial = user?.firstName?.[0]?.toUpperCase() ?? 'U';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Меню пользователя"
        aria-expanded={open}
        aria-haspopup="true"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-ring text-sm font-medium text-text-inverse"
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.firstName}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 rounded-md border border-border-default bg-bg-card py-1 shadow-lg"
        >
          <div className="px-4 py-2 border-b border-border-default">
            <p className="text-sm font-medium text-text-base">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-text-muted truncate">{user?.email}</p>
          </div>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-text-secondary hover:bg-brand-subtle"
          >
            Профиль
          </Link>
          <Link
            href="/settings"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-text-secondary hover:bg-brand-subtle"
          >
            Настройки
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => { setOpen(false); logout(); }}
            className="block w-full px-4 py-2 text-left text-sm text-status-error hover:bg-bg-error"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}