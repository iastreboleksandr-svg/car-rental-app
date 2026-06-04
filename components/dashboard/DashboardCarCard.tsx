import { Car, Pencil, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DashboardCarCardProps {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  price: number;
  bookings: number;
  onToggleStatus: (id: number) => void;
}

export function DashboardCarCard({ id, name, status, price, bookings, onToggleStatus }:
  DashboardCarCardProps) {
  const router = useRouter();

  return (
    <div className="border border-border-default hover:border-brand hover:shadow-sm rounded-xl p-4 flex flex-col gap-4 transition-all">

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-brand-subtle rounded-xl flex items-center justify-center text-brand shrink-0">
          <Car size={28} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-text-base">{name}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
              status === 'active'
                ? 'bg-brand-subtle text-brand border-brand-subtle'
                : 'bg-bg-disabled text-text-muted border-border-default'
            }`}>
              {status === 'active' ? 'Активна' : 'Неактивна'}
            </span>
            <span className="text-xs text-text-base font-semibold">
              ${price}/день
            </span>
            {bookings > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-subtle text-brand border border-brand-subtle font-medium">
                {bookings} брони
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/cars/${id}/edit`)}
          className="flex-1 flex items-center justify-center gap-1.5 border border-border-default rounded-lg py-1.5 text-sm text-text-secondary hover:border-brand hover:text-brand hover:bg-brand-subtle transition-all"
        >
          <Pencil size={14} />
          Редактировать
        </button>
        <button
          onClick={() => router.push(`/cars/${id}/slots`)}
          className="flex-1 flex items-center justify-center gap-1.5 border border-border-default rounded-lg py-1.5 text-sm text-text-secondary hover:border-brand hover:text-brand hover:bg-brand-subtle transition-all"
        >
          <Calendar size={14} />
          Доступность
        </button>
        <button
          onClick={() => onToggleStatus(id)}
          className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition-colors ${
            status === 'active'
              ? 'border border-border-default text-text-secondary hover:bg-bg-disabled'
              : 'bg-brand text-text-inverse hover:bg-brand-hover'
          }`}
        >
          {status === 'active' ? 'Снять' : 'Опубликовать'}
        </button>
      </div>

    </div>
  );
}