import type { Slot, CreateSlotDto } from '@/types/slot';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

// The slots endpoints sometimes respond with an empty body (e.g. DELETE, or an
// empty GET). `res.json()` throws on an empty body, so we read text first.
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { message?: string })?.message ?? `Request failed: ${res.status}`);
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export const slotService = {
  // GET may return an array, a { slots: [...] } envelope, or an empty body.
  getAll: async (carId: string, token: string): Promise<Slot[]> => {
    const data = await request<Slot[] | { slots: Slot[] } | null>(`/cars/${carId}/slots`, {
      headers: authHeader(token),
    });
    if (Array.isArray(data)) return data;
    if (data && Array.isArray((data as { slots?: Slot[] }).slots)) {
      return (data as { slots: Slot[] }).slots;
    }
    return [];
  },

  create: (carId: string, dto: CreateSlotDto, token: string): Promise<Slot> =>
    request<Slot>(`/cars/${carId}/slots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader(token) },
      body: JSON.stringify(dto),
    }),

  remove: (carId: string, slotId: string, token: string): Promise<null> =>
    request<null>(`/cars/${carId}/slots/${slotId}`, {
      method: 'DELETE',
      headers: authHeader(token),
    }),
};
