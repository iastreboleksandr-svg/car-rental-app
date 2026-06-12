export function formatBookingDates(startAt: string, endAt: string): string {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return `${fmt(startAt)} — ${fmt(endAt)}`;
}

export function bookingCarName(car: { brand: string; model: string; year: number } | undefined): string {
  if (!car) return '—';
  return `${car.brand} ${car.model} ${car.year}`;
}

export function bookingCarPhoto(
  car: { photos?: { carPhotoUrl?: string; url?: string }[] } | undefined,
): string | null {
  const first = car?.photos?.[0];
  return first?.carPhotoUrl ?? first?.url ?? null;
}

interface OwnerContact {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
}

export function bookingOwner(car: unknown): OwnerContact | null {
  const owner = (car as { owner?: OwnerContact | null })?.owner;
  return owner ?? null;
}
