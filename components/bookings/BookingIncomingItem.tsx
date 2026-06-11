'use client';

import { Car, Check, X, Flag } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { formatBookingDates, bookingCarName, bookingCarPhoto } from '@/lib/formatBookingDates';
import type { Booking, BookingStatus } from '@/types/booking';

interface BookingIncomingItemProps {
  booking: Booking;
  statusLabel: string;
  totalLabel: string;
  confirmLabel: string;
  declineLabel: string;
  completeLabel: string;
  onConfirm: (id: string) => void;
  onDecline: (id: string) => void;
  onComplete: (id: string) => void;
  disabled: boolean;
}

const badgeVariant: Record<BookingStatus, 'pending' | 'confirmed' | 'completed' | 'cancelled'> = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export function BookingIncomingItem({
  booking,
  statusLabel,
  totalLabel,
  confirmLabel,
  declineLabel,
  completeLabel,
  onConfirm,
  onDecline,
  onComplete,
  disabled,
}: BookingIncomingItemProps) {
  const photo = bookingCarPhoto(booking.car);
  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-4 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl border border-border-default bg-bg-disabled flex items-center justify-center shrink-0 overflow-hidden">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={bookingCarName(booking.car)} className="w-full h-full object-cover" />
          ) : (
            <Car size={22} className="text-text-muted" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-base truncate">{bookingCarName(booking.car)}</p>
          <p className="text-sm text-text-muted">{formatBookingDates(booking.startAt, booking.endAt)}</p>
          <p className="text-xs text-text-muted mt-0.5 truncate">{booking.renter?.email ?? '—'}</p>
        </div>

        <Badge variant={badgeVariant[booking.status]} size="sm" label={statusLabel} className="min-w-0 shrink-0" />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-text-base">{totalLabel}</p>

        {booking.status === 'PENDING' && (
          <div className="flex gap-2">
            <Button variant="danger-outline" size="sm" leftIcon={<X size={14} />} onClick={() => onDecline(booking.id)} disabled={disabled}>
              {declineLabel}
            </Button>
            <Button size="sm" leftIcon={<Check size={14} />} onClick={() => onConfirm(booking.id)} disabled={disabled}>
              {confirmLabel}
            </Button>
          </div>
        )}

        {booking.status === 'CONFIRMED' && (
          <Button size="sm" leftIcon={<Flag size={14} />} onClick={() => onComplete(booking.id)} disabled={disabled}>
            {completeLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
