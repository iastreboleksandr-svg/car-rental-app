'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';

function initials(user: { firstName: string | null; lastName: string | null; email: string } | null): string {
  if (!user) return 'U';
  const first = user.firstName?.[0] ?? user.email[0];
  const second = user.lastName?.[0] ?? user.email[1];
  return (first + second).toUpperCase();
}

export function UserDropdown() {
  const t = useTranslations('nav');
  const tAuth = useTranslations('auth');
  const { user, token, refreshToken, logout } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  async function handleLogout() {
    setOpen(false);
    if (token && refreshToken) {
      await authService.logout(token, refreshToken).catch(() => {});
    }
    logout();
    router.replace('/');
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#48C964] text-sm font-medium text-white"
      >
        {user?.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatarUrl} alt={user.firstName ?? 'User'} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span>{initials(user)}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md border border-gray-100 bg-white py-1 shadow-lg">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            {t('profile')}
          </Link>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            {t('settings')}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
          >
            {tAuth('logout')}
          </button>
        </div>
      )}
    </div>
  );
}
