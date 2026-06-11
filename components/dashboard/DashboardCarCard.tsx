import { Car as CarIcon, Pencil, Calendar } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import Toggle from '@/components/atoms/Toggle';
import type { Car } from '@/types/car';

interface DashboardCarCardProps {
  car: Car;
  statusLabel: string;
  editLabel: string;
  availabilityLabel: string;
  publishedLabel: string;
  onEdit: (id: string) => void;
  onSlots: (id: string) => void;
  onToggleStatus: (id: string, status: Car['status']) => void;
  toggling: boolean;
}

export function DashboardCarCard({
  car,
  statusLabel,
  editLabel,
  availabilityLabel,
  publishedLabel,
  onEdit,
  onSlots,
  onToggleStatus,
  toggling,
}: DashboardCarCardProps) {
  return (
    <div className="border border-border-default hover:border-brand-subtle hover:shadow-[0_4px_24px_rgba(72,201,100,0.1)] rounded-xl p-4 flex flex-col gap-4 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-brand-subtle rounded-xl flex items-center justify-center text-brand shrink-0 overflow-hidden">
          {car.mainPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={car.mainPhoto} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
          ) : (
            <CarIcon size={24} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-base">{car.brand} {car.model} · {car.year}</p>
          <p className="text-xs text-text-muted truncate mt-0.5">{car.address}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant={car.status} size="sm" label={statusLabel} className="min-w-0" />
            <span className="text-xs text-text-base font-semibold">${car.pricePerDay}/день</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-default pt-3">
        <span className="text-sm text-text-secondary">{publishedLabel}</span>
        <Toggle
          checked={car.status === 'active'}
          onChange={() => onToggleStatus(car.id, car.status)}
          disabled={toggling || car.status === 'rented'}
        />
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
