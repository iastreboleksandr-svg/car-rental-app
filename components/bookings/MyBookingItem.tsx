import Link from 'next/link';
import { Car, Phone, Mail } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { formatBookingDates, bookingCarName, bookingCarPhoto, bookingOwner } from '@/lib/formatBookingDates';
import type { Booking, BookingStatus } from '@/types/booking';

interface MyBookingItemProps {
  booking: Booking;
  statusLabel: string;
  metaLabel: string;
  cancelLabel: string;
  ownerContactLabel: string;
  onCancel: (id: string) => void;
  cancelling: boolean;
}

const badgeVariant: Record<BookingStatus, 'pending' | 'confirmed' | 'completed' | 'cancelled'> = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export function MyBookingItem({ booking, statusLabel, metaLabel, cancelLabel, ownerContactLabel, onCancel, cancelling }: MyBookingItemProps) {
  const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED';
  const photo = bookingCarPhoto(booking.car);
  const owner = bookingOwner(booking.car);

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm border border-border-default p-4 flex flex-col gap-3">
      <Link href={`/cars/${booking.carId}`} className="flex items-center gap-3 group">
        <div className="w-12 h-12 rounded-xl border border-border-default bg-bg-disabled flex items-center justify-center shrink-0 overflow-hidden">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={bookingCarName(booking.car)} className="w-full h-full object-cover" />
          ) : (
            <Car size={22} className="text-text-muted" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-base truncate group-hover:text-brand transition-colors">{bookingCarName(booking.car)}</p>
          <p className="text-sm text-text-muted">{formatBookingDates(booking.startAt, booking.endAt)}</p>
          <p className="text-xs text-text-muted mt-0.5">{metaLabel}</p>
        </div>

        <Badge variant={badgeVariant[booking.status]} size="sm" label={statusLabel} className="min-w-0 shrink-0" />
      </Link>

      {owner && (owner.phone || owner.email) && (
        <div className="border-t border-border-default pt-3 flex flex-col gap-1">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{ownerContactLabel}</p>
          {owner.phone && (
            <a href={`tel:${owner.phone}`} className="text-sm text-brand flex items-center gap-1.5 hover:underline">
              <Phone size={13} className="shrink-0" />
              {owner.phone}
            </a>
          )}
          <a href={`mailto:${owner.email}`} className="text-sm text-text-secondary flex items-center gap-1.5 hover:underline">
            <Mail size={13} className="shrink-0" />
            {owner.email}
          </a>
        </div>
      )}

      {canCancel && (
        <div className="flex justify-end">
          <Button variant="danger-outline" size="sm" onClick={() => onCancel(booking.id)} disabled={cancelling}>
            {cancelLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
