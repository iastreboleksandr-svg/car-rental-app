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

  // Инициал из firstName — исправляем баг с name
  const initial = user?.firstName?.[0]?.toUpperCase() ?? 'U';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#48C964] text-sm font-medium text-white"
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
            Профиль
          </Link>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Настройки
          </Link>
          <button
            type="button"
            onClick={() => { setOpen(false); logout(); }}
            className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}