import type { Car, CreateCarDto } from '@/types/car';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface CarFilters {
  date_from?: string;
  date_to?: string;
  fuel_type?: string;
  transmission?: string;
  price_max?: number;
  lat?: number;
  lng?: number;
  radius?: number;
}

export const carService = {
  getAll: (filters?: CarFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== '') params.set(key, String(val));
      });
    }
    const qs = params.toString();
    return request<{ cars: Car[] }>(`/cars${qs ? `?${qs}` : ''}`).then((res) => res.cars);
  },

  getMyCars: (token: string) =>
    request<{ cars: Car[] }>('/cars/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.cars),

  getById: (id: string, token: string) =>
    request<Car>(`/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  create: (dto: CreateCarDto, token: string) =>
    request<Car>('/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    }),
};
