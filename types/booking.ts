import type { Car } from './car';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface BookedDate {
  startAt: string;
  endAt: string;
  bookingStatus: 'PENDING' | 'CONFIRMED';
}

export interface AvailabilitySlot {
  dateFrom: string;
  dateTo: string;
  periodType: 'available' | 'blocked';
}

export interface BookedDatesResponse {
  bookings: BookedDate[];
  slots: AvailabilitySlot[];
}

export interface CreateBookingDto {
  carId: string;
  startAt: string;
  endAt: string;
  note?: string;
}

export interface BookingRenter {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
}

export interface BookingOwner {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
}

export interface BookingRawCar {
  id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number | string;
  deposit: number | string;
  address: string;
  photos?: { id: string; carPhotoUrl: string }[];
  owner?: BookingOwner | null;
}

export interface BookingRaw {
  id: string;
  carId: string;
  renterId: string;
  startAt: string;
  endAt: string;
  totalPrice: number | string;
  depositAmount: number | string;
  bookingStatus: BookingStatus;
  createdAt: string;
  updatedAt: string;
  car?: BookingRawCar | Car;
  renter?: BookingRenter;
}

export interface Booking {
  id: string;
  carId: string;
  renterId: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  depositAmount: number;
  status: BookingStatus;
  createdAt: string;
  car?: BookingRawCar | Car;
  renter?: BookingRenter;
}

export interface BookingStatsCounts {
  pending: number;
  confirmed: number;
  cancelled: number;
}

export interface BookingStats {
  myBookings: BookingStatsCounts;
  incoming: BookingStatsCounts;
}
