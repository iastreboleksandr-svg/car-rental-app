import { Car } from 'lucide-react';

interface BookingItemProps {
  id: number;
  carName: string;
  dates: string;
  total: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
  onCancel?: (id: number) => void;
}

const statusConfig = {
  CONFIRMED: { label: 'Подтверждена', className: 'text-brand bg-brand-subtle' },
  PENDING: { label: 'Ожидает', className: 'text-status-warning bg-bg-warning' },
  CANCELLED: { label: 'Отменена', className: 'text-text-muted bg-bg-disabled' },
  COMPLETED: { label: 'Завершена', className: 'text-text-muted bg-bg-disabled' },
};

export function BookingItem({ id, carName, dates, total, status, onCancel }: BookingItemProps) {
  const { label, className } = statusConfig[status];

  return (
    <div className="bg-bg-card rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl border border-border-default bg-bg-disabled flex items-center justify-center shrink-0">
          <Car size={22} className="text-text-muted" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-text-base">{carName}</p>
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
            className="text-xs text-text-error hover:text-error-hover border border-border-error hover:border-error-hover rounded-lg px-3 py-1.5 transition-colors"
          >
            Отменить
          </button>
        )}
      </div>
    </div>
  );
}