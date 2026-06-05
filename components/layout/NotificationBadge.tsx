import Link from 'next/link';

interface NotificationBadgeProps {
  count: number;
  href: string;
  label: string;
}

export function NotificationBadge({ count, href, label }: NotificationBadgeProps) {
  return (
    <Link href={href} className="relative flex items-center">
      <span>{label}</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
