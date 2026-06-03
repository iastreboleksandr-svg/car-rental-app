// Availability slot types for /cars/:id/slots
// Note: the API request body uses `type`, while the response uses `periodType`.

export type SlotType = 'available' | 'blocked' | 'booked';

// Shape returned by GET / POST /cars/:carId/slots
export interface Slot {
  id: string;
  carId: string;
  dateFrom: string; // ISO datetime, e.g. "2025-06-22T00:00:00.000Z"
  dateTo: string; // ISO datetime
  periodType: SlotType;
  createdAt?: string;
}

// Body for POST /cars/:carId/slots
export interface CreateSlotDto {
  dateFrom: string; // "YYYY-MM-DD"
  dateTo: string; // "YYYY-MM-DD"
  type: 'available' | 'blocked';
}
