import { Car, Calendar, XCircle, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RenterBookingCardProps {
  id: number;
  carName: string;
  status: 'active' | 'completed' | 'cancelled';
  dateFrom: string;
  dateTo: string;
  totalPrice: number;
  canCancel?: boolean;
  canReview?: boolean;
}

export function RenterBookingCard({
  id,
  carName,
  status,
  dateFrom,
  dateTo,
  totalPrice,
  canCancel,
  canReview,
}: RenterBookingCardProps) {
  const router = useRouter();

  const statusConfig = {
    active: { label: 'Активна', className: 'bg-brand-subtle text-brand border-brand-subtle' },
    completed: { label: 'Завершена', className: 'bg-bg-disabled text-text-muted border-border-default' },
    cancelled: { label: 'Отменена', className: 'bg-bg-disabled text-text-muted border-border-default' },
  };

  const { label, className } = statusConfig[status];

  return (
    <div className="border border-border-default hover:border-brand hover:shadow-sm rounded-xl p-4 flex flex-col gap-4 transition-all">

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-brand-subtle rounded-xl flex items-center justify-center text-brand shrink-0">
          <Car size={28} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-text-base">{carName}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${className}`}>
              {label}
            </span>
            <span className="text-xs text-text-base font-semibold">
              ${totalPrice} итого
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
            <Calendar size={12} />
            <span>{dateFrom} — {dateTo}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/booking/${id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 border border-border-default rounded-lg py-1.5 text-sm text-text-secondary hover:border-brand hover:text-brand hover:bg-brand-subtle transition-all"
        >
          Подробнее
        </button>

        {canReview && (
          <button
            onClick={() => router.push(`/reviews?bookingId=${id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-border-default rounded-lg py-1.5 text-sm text-text-secondary hover:border-brand hover:text-brand hover:bg-brand-subtle transition-all"
          >
            <Star size={14} />
            Отзыв
          </button>
        )}

        {canCancel && (
          <button
            onClick={() => router.push(`/booking/${id}/cancel`)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-border-default rounded-lg py-1.5 text-sm text-text-secondary hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <XCircle size={14} />
            Отменить
          </button>
        )}
      </div>

    </div>
  );
}