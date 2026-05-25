import type { Car, CarSearchItem, CarDetail, CreateCarDto } from '@/types/car';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function normalizeSearchItem(item: CarSearchItem): Car {
  return {
    ...item,
    status: 'active',
  };
}

function normalizeDetail(item: CarDetail): Car {
  return {
    id: item.id,
    ownerId: item.ownerId,
    brand: item.brand,
    model: item.model,
    year: item.year,
    fuelType: item.fuelType,
    transmission: item.transmission,
    seats: item.seats,
    description: item.description,
    pricePerDay: Number(item.pricePerDay),
    deposit: Number(item.deposit),
    status: item.carStatus,
    lat: Number(item.lat),
    lng: Number(item.lng),
    address: item.address,
    createdAt: item.createdAt,
  };
}

export interface CarFilters {
  date_from?: string;
  date_to?: string;
  fuel_type?: string[];
  transmission?: string;
  price_max?: number;
  lat?: number;
  lng?: number;
  radius?: number;
}

export const carService = {
  getAll: (filters?: CarFilters): Promise<Car[]> => {
    const params = new URLSearchParams();
    if (filters) {
      const { fuel_type, ...rest } = filters;
      Object.entries(rest).forEach(([key, val]) => {
        if (val !== undefined && val !== '') params.set(key, String(val));
      });
      fuel_type?.forEach((v) => params.append('fuel_type', v));
    }
    const qs = params.toString();
    return request<{ cars: CarSearchItem[]; total: number }>(`/cars${qs ? `?${qs}` : ''}`)
      .then((res) => res.cars.map(normalizeSearchItem));
  },

  getById: (id: string, token?: string): Promise<Car> =>
    request<CarDetail>(`/cars/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }).then(normalizeDetail),

  create: (dto: CreateCarDto, token: string): Promise<Car> =>
    request<CarDetail>('/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dto),
    }).then(normalizeDetail),
};
