import { Car } from 'lucide-react';

interface BookingItemProps {
  id: number;
  dates: string;
  total: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  onCancel?: (id: number) => void;
}

const statusConfig = {
  CONFIRMED: { label: 'CONFIRMED', className: 'text-brand bg-brand-subtle' },
  PENDING: { label: 'PENDING', className: 'text-status-warning bg-orange-50' },
  CANCELLED: { label: 'CANCELLED', className: 'text-text-disabled bg-transparent' },
};

export function BookingItem({ id, dates, total, status, onCancel }: BookingItemProps) {
  const { label, className } = statusConfig[status];

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl border border-border-default bg-bg-disabled flex items-center justify-center shrink-0">
          <Car size={22} className="text-text-muted" />
        </div>
        <div className="flex-1">
          <div className="h-2.5 w-40 bg-border-default rounded mb-1.5" />
          <p className="text-sm text-text-muted">{dates}</p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
          {label}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-text-base">${total}</p>
        {status === 'PENDING' && onCancel && (
          <button
            onClick={() => onCancel(id)}
            className="text-xs text-text-error hover:text-red-700 border border-border-error hover:border-red-700 rounded-lg px-3 py-1.5 transition-colors"
          >
            Отменить
          </button>
        )}
      </div>
    </div>
  );
}