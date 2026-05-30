import Link from 'next/link';
import { Bell } from 'lucide-react';

interface NotificationBadgeProps {
  count: number;
  href: string;
}

export function NotificationBadge({ count, href }: NotificationBadgeProps) {
  return (
    <Link href={href} className="relative flex items-center text-gray-600 hover:text-gray-900">
      <Bell size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
