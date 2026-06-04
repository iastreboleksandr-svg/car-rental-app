import Link from 'next/link';
import { Bell } from 'lucide-react';

interface NotificationBadgeProps {
  count: number;
  href: string;
}

export function NotificationBadge({ count, href }: NotificationBadgeProps) {
  return (
    <Link href={href} className="relative flex items-center text-text-secondary hover:text-text-base">
      <Bell size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-text-error text-[10px] font-medium text-text-inverse">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
