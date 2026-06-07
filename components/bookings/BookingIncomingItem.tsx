'use client';

import { Car, Check, X } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import type { IncomingBooking } from '@/hooks/useIncomingBookingsPage';

interface BookingIncomingItemProps {
  booking: IncomingBooking;
  statusLabel: string;
  daysLabel: string;
  confirmLabel: string;
  declineLabel: string;
  onConfirm: (id: number) => void;
  onDecline: (id: number) => void;
}

const badgeVariant: Record<IncomingBooking['status'], 'pending' | 'confirmed' | 'cancelled'> = {
  pending: 'pending',
  confirmed: 'confirmed',
  declined: 'cancelled',
};

export function BookingIncomingItem({
  booking,
  statusLabel,
  daysLabel,
  confirmLabel,
  declineLabel,
  onConfirm,
  onDecline,
}: BookingIncomingItemProps) {
  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-4 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl border border-border-default bg-bg-disabled flex items-center justify-center shrink-0">
          <Car size={22} className="text-text-muted" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-base truncate">{booking.carName}</p>
          <p className="text-sm text-text-muted">{booking.dates}</p>
          <p className="text-xs text-text-muted mt-0.5">
            {booking.renterFirstName} {booking.renterLastName}
          </p>
        </div>

        <Badge variant={badgeVariant[booking.status]} size="sm" label={statusLabel} className="min-w-0 shrink-0" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-text-base">${booking.total}</p>
          <p className="text-xs text-text-muted">{daysLabel}</p>
        </div>

        {booking.status === 'pending' && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" leftIcon={<X size={14} />} onClick={() => onDecline(booking.id)}>
              {declineLabel}
            </Button>
            <Button size="sm" leftIcon={<Check size={14} />} onClick={() => onConfirm(booking.id)}>
              {confirmLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
