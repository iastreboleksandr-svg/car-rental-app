import { Car } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import type { MyBooking } from '@/hooks/useMyBookingsPage';

interface MyBookingItemProps {
  booking: MyBooking;
  statusLabel: string;
  metaLabel: string;
}

const badgeVariant: Record<MyBooking['status'], 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'> = {
  pending: 'pending',
  confirmed: 'confirmed',
  active: 'active',
  completed: 'completed',
  cancelled: 'cancelled',
};

export function MyBookingItem({ booking, statusLabel, metaLabel }: MyBookingItemProps) {
  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-4 flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl border border-border-default bg-bg-disabled flex items-center justify-center shrink-0">
        <Car size={22} className="text-text-muted" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-base truncate">{booking.carName}</p>
        <p className="text-sm text-text-muted">{booking.dates}</p>
        <p className="text-xs text-text-muted mt-0.5">{metaLabel}</p>
      </div>

      <Badge variant={badgeVariant[booking.status]} size="sm" label={statusLabel} className="min-w-0 shrink-0" />
    </div>
  );
}
