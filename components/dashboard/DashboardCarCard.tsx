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

export function DashboardCarCard({ id, name, status, price, bookings, onToggleStatus }: DashboardCarCardProps) {
  const router = useRouter();

  return (
    <div className="border border-[#e4eaf0] hover:border-[#d4f5dc] hover:shadow-[0_4px_24px_rgba(72,201,100,0.1)] rounded-xl p-4 flex flex-col gap-4 transition-all">

      {/* Car info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[#f0fdf3] rounded-xl flex items-center justify-center text-[#48C964] flex-shrink-0">
          <Car size={28} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-[#1a2030]">{name}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
              status === 'active'
                ? 'bg-[#f0fdf3] text-[#32a84d] border-[#d4f5dc]'
                : 'bg-[#f4f7f9] text-[#8a97a8] border-[#e4eaf0]'
            }`}>
              {status === 'active' ? 'Активна' : 'Неактивна'}
            </span>
            <span className="text-xs text-[#1a2030] font-semibold">
              ${price}/день
            </span>
            {bookings > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#f0fdf3] text-[#48C964] border border-[#d4f5dc] font-medium">
                {bookings} брони
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/cars/${id}/edit`)}
          className="flex-1 flex items-center justify-center gap-1.5 border border-[#e4eaf0] rounded-lg py-1.5 text-sm text-[#3d4a5c] hover:border-[#48C964] hover:text-[#48C964] hover:bg-[#f0fdf3] transition-all"
        >
          <Pencil size={14} />
          Редактировать
        </button>
        <button
          onClick={() => router.push(`/cars/${id}/slots`)}
          className="flex-1 flex items-center justify-center gap-1.5 border border-[#e4eaf0] rounded-lg py-1.5 text-sm text-[#3d4a5c] hover:border-[#48C964] hover:text-[#48C964] hover:bg-[#f0fdf3] transition-all"
        >
          <Calendar size={14} />
          Доступность
        </button>
        <button
          onClick={() => onToggleStatus(id)}
          className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition-colors ${
            status === 'active'
              ? 'border border-[#e4eaf0] text-[#3d4a5c] hover:bg-[#f4f7f9]'
              : 'bg-[#48C964] text-white hover:bg-[#32a84d]'
          }`}
        >
          {status === 'active' ? 'Снять' : 'Опубликовать'}
        </button>
      </div>

    </div>
  );
}