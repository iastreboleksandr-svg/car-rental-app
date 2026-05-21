export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';
export type Transmission = 'manual' | 'automatic';
export type CarStatus = 'active' | 'inactive' | 'rented';

export interface Car {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats?: number;
  description?: string;
  pricePerDay: number;
  deposit: number;
  status: CarStatus;
  lat: number;
  lng: number;
  address: string;
  mainPhoto?: string | null;
  averageRating?: number | null;
  createdAt: string;
}

export interface CreateCarDto {
  brand: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: Transmission;
  description?: string;
  pricePerDay: number;
  deposit: number;
  lat: number;
  lng: number;
  address: string;
}
