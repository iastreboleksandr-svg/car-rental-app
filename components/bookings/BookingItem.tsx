import { Car } from 'lucide-react';

interface BookingItemProps {
  id: number;
  dates: string;
  total: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  onCancel?: (id: number) => void;
}

const statusConfig = {
  CONFIRMED: { label: 'CONFIRMED', className: 'text-green-600 bg-green-50' },
  PENDING: { label: 'PENDING', className: 'text-orange-500 bg-orange-50' },
  CANCELLED: { label: 'CANCELLED', className: 'text-gray-400 bg-transparent' },
};

export function BookingItem({ id, dates, total, status, onCancel }: BookingItemProps) {
  const { label, className } = statusConfig[status];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
          <Car size={22} className="text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="h-2.5 w-40 bg-gray-200 rounded mb-1.5" />
          <p className="text-sm text-gray-500">{dates}</p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
          {label}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-800">${total}</p>
        {status === 'PENDING' && onCancel && (
          <button
            onClick={() => onCancel(id)}
            className="text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 rounded-lg px-3 py-1.5 transition-colors"
          >
            Отменить
          </button>
        )}
      </div>
    </div>
  );
}