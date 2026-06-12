import type { BookingStatsCounts } from '@/types/booking';
import type { ToggleState } from '@/store/settings.store';

interface StatusBadgesProps {
  newCounts?: BookingStatsCounts;
  toggles: ToggleState;
}

const dot = 'flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none text-white';

export function StatusBadges({ newCounts, toggles }: StatusBadgesProps) {
  const items: { key: keyof BookingStatsCounts; newValue: number; enabled: boolean; className: string }[] = [
    { key: 'pending', newValue: newCounts?.pending ?? 0, enabled: toggles.pending, className: 'bg-amber-500' },
    { key: 'confirmed', newValue: newCounts?.confirmed ?? 0, enabled: toggles.confirmed, className: 'bg-brand' },
    { key: 'cancelled', newValue: newCounts?.cancelled ?? 0, enabled: toggles.cancelled, className: 'bg-gray-400' },
  ];

  const visible = items.filter((i) => i.enabled && i.newValue > 0);
  if (visible.length === 0) return null;

  return (
    <span className="flex items-center gap-1">
      {visible.map((i) => (
        <span
          key={i.key}
          className={`${dot} ${i.className} ring-2 ring-offset-1 ring-current animate-pulse`}
        >
          +{i.newValue > 99 ? '99+' : i.newValue}
        </span>
      ))}
    </span>
  );
}
