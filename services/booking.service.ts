import { apiFetch } from '@/lib/apiFetch';
import type { Booking, BookingRaw, CreateBookingDto } from '@/types/booking';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await apiFetch(path, options);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function normalize(raw: BookingRaw): Booking {
  return {
    id: raw.id,
    carId: raw.carId,
    renterId: raw.renterId,
    startAt: raw.startAt,
    endAt: raw.endAt,
    totalPrice: Number(raw.totalPrice),
    depositAmount: Number(raw.depositAmount),
    status: raw.bookingStatus,
    createdAt: raw.createdAt,
    car: raw.car,
    renter: raw.renter,
  };
}

export const bookingService = {
  create: (dto: CreateBookingDto): Promise<Booking> =>
    request<BookingRaw>('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    }).then(normalize),

  getMy: (): Promise<Booking[]> =>
    request<BookingRaw[]>('/bookings/my').then((list) => list.map(normalize)),

  getIncoming: (): Promise<Booking[]> =>
    request<BookingRaw[]>('/bookings/incoming').then((list) => list.map(normalize)),

  confirm: (id: string): Promise<Booking> =>
    request<BookingRaw>(`/bookings/${id}/confirm`, { method: 'PATCH' }).then(normalize),

  cancel: (id: string): Promise<Booking> =>
    request<BookingRaw>(`/bookings/${id}/cancel`, { method: 'PATCH' }).then(normalize),

  complete: (id: string): Promise<Booking> =>
    request<BookingRaw>(`/bookings/${id}/complete`, { method: 'PATCH' }).then(normalize),
};
