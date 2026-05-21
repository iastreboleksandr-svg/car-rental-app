'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';

function initials(user: { firstName: string | null; lastName: string | null; email: string } | null): string {
  if (!user) return 'U';
  const first = user.firstName?.[0] ?? user.email[0];
  const second = user.lastName?.[0] ?? user.email[1];
  return (first + second).toUpperCase();
}

export function UserDropdown() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  async function handleLogout() {
    setOpen(false);
    if (token) await authService.logout(token).catch(() => {});
    logout();
    router.replace('/login');
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
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700"
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
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Profile settings
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
