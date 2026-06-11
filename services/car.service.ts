import type { Car, CarSearchItem, CarDetail, CreateCarDto, UpdateCarDto } from '@/types/car';
import type { BookedDatesResponse } from '@/types/booking';
import { apiFetch } from '@/lib/apiFetch';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await apiFetch(path, options);
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
    photos: item.photos ?? [],
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
  limit?: number;
  offset?: number;
}

export interface CarSearchResult {
  cars: Car[];
  total: number;
}

export const carService = {
  getAll: (filters?: CarFilters): Promise<CarSearchResult> => {
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
      .then((res) => ({ cars: res.cars.map(normalizeSearchItem), total: res.total }));
  },

  getMine: (): Promise<Car[]> =>
    request<CarDetail[]>('/cars/me').then((cars) => cars.map(normalizeDetail)),

  getById: (id: string): Promise<Car> =>
    request<CarDetail>(`/cars/${id}`).then(normalizeDetail),

  getBookedDates: (id: string): Promise<BookedDatesResponse> =>
    request<BookedDatesResponse>(`/cars/${id}/booked-dates`),

  create: (dto: CreateCarDto): Promise<Car> =>
    request<CarDetail>('/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    }).then(normalizeDetail),

  update: (id: string, dto: UpdateCarDto): Promise<Car> =>
    request<CarDetail>(`/cars/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    }).then(normalizeDetail),

  uploadPhotos: (id: string, files: File[]): Promise<unknown> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return request(`/cars/${id}/photos`, {
      method: 'POST',
      body: formData,
    });
  },
};
