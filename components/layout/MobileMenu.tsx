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
  const { logout } = useAuthStore();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        className="flex h-8 w-8 items-center justify-center rounded text-gray-600"
      >
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white px-4 py-3 shadow-md">
          <nav className="flex flex-col gap-1">
            <Link
              href="/search"
              onClick={() => setOpen(false)}
              className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Search
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/bookings"
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  My bookings
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="/notifications"
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Notifications{unreadCount > 0 && ` (${unreadCount})`}
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Profile settings
                </Link>
                <button
                  type="button"
                  onClick={() => { setOpen(false); logout(); }}
                  className="rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Log out
                </button>
              </>
            ) : null}
          </nav>
        </div>
      )}
    </div>
  );
}
