export type SlotType = 'available' | 'blocked' | 'booked';

export interface Slot {
  id: string;
  carId: string;
  dateFrom: string;
  dateTo: string;
  periodType: SlotType;
  createdAt?: string;
}

export interface CreateSlotDto {
  dateFrom: string;
  dateTo: string;
  type: 'available' | 'blocked';
}
