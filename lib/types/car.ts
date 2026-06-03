type Car = {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  fuelType: number;
  transmission: number;
  seats: number;
  description?: string;
  carPhotoUrl?: string;
  pricePerDay: number;
  deposit: number;
  status: number;
  lat?: number;
  lng?: number;
  address?: string;
  createdAt: string;
};

export default Car;
