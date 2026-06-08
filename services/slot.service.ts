import { apiFetch } from '@/lib/apiFetch';
import type { Slot, CreateSlotDto } from '@/types/slot';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await apiFetch(path, options);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { message?: string })?.message ?? `Request failed: ${res.status}`);
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export const slotService = {
  getAll: async (carId: string): Promise<Slot[]> => {
    const data = await request<Slot[] | { slots: Slot[] } | null>(`/cars/${carId}/slots`);
    if (Array.isArray(data)) return data;
    if (data && Array.isArray((data as { slots?: Slot[] }).slots)) {
      return (data as { slots: Slot[] }).slots;
    }
    return [];
  },

  create: (carId: string, dto: CreateSlotDto): Promise<Slot> =>
    request<Slot>(`/cars/${carId}/slots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    }),

  remove: (carId: string, slotId: string): Promise<null> =>
    request<null>(`/cars/${carId}/slots/${slotId}`, {
      method: 'DELETE',
    }),
};
