import { Car as CarIcon, Pencil, Calendar } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import type { Car } from '@/types/car';

interface DashboardCarCardProps {
  car: Car;
  statusLabel: string;
  editLabel: string;
  availabilityLabel: string;
  onEdit: (id: string) => void;
  onSlots: (id: string) => void;
}

export function DashboardCarCard({
  car,
  statusLabel,
  editLabel,
  availabilityLabel,
  onEdit,
  onSlots,
}: DashboardCarCardProps) {
  return (
    <div className="border border-[#e4eaf0] hover:border-[#d4f5dc] hover:shadow-[0_4px_24px_rgba(72,201,100,0.1)] rounded-xl p-4 flex flex-col gap-4 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-[#f0fdf3] rounded-xl flex items-center justify-center text-[#48C964] shrink-0">
          <CarIcon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1a2030]">{car.brand} {car.model} · {car.year}</p>
          <p className="text-xs text-gray-400 truncate mt-0.5">{car.address}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant={car.status} size="sm" label={statusLabel} className="min-w-0" />
            <span className="text-xs text-[#1a2030] font-semibold">${car.pricePerDay}/день</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" size="sm" className="flex-1" leftIcon={<Pencil size={13} />} onClick={() => onEdit(car.id)}>
          {editLabel}
        </Button>
        <Button variant="secondary" size="sm" className="flex-1" leftIcon={<Calendar size={13} />} onClick={() => onSlots(car.id)}>
          {availabilityLabel}
        </Button>
      </div>
    </div>
  );
}
