export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';
export type Transmission = 'manual' | 'automatic';
export type CarStatus = 'active' | 'inactive' | 'rented';

export interface CarPhoto {
  id: string;
  url: string;
}

export interface CarPhotoRaw {
  id: string;
  carId: string;
  carPhotoUrl: string;
  sortOrder: number;
}

export interface Car {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  description?: string | null;
  pricePerDay: number;
  deposit: number;
  status: CarStatus;
  lat: number;
  lng: number;
  address: string;
  mainPhoto?: string | null;
  photos?: CarPhoto[];
  averageRating?: number | null;
  createdAt?: string;
}

export interface CarSearchItem {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  description: string | null;
  pricePerDay: number;
  deposit: number;
  address: string;
  lat: number;
  lng: number;
  mainPhoto: string | null;
  averageRating: number | null;
}

// Raw shape from GET /cars/:id (Prisma Car, carStatus instead of status)
export interface CarDetail {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  description: string | null;
  pricePerDay: number;
  deposit: number;
  carStatus: CarStatus;
  lat: number;
  lng: number;
  address: string;
  photos?: CarPhotoRaw[];
  createdAt: string;
}

export interface CreateCarDto {
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  description?: string;
  pricePerDay: number;
  deposit: number;
  lat: number;
  lng: number;
  address: string;
}

export type UpdateCarDto = Partial<CreateCarDto> & {
  carStatus?: 'active' | 'inactive';
};
