'use client';

import { useState } from 'react';

export type MyBookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
export type MyBookingsTab = 'all' | 'active' | 'completed' | 'cancelled';

export interface MyBooking {
  id: number;
  carName: string;
  dates: string;
  days: number;
  total: number;
  status: MyBookingStatus;
}

const MOCK_BOOKINGS: MyBooking[] = [
  { id: 1, carName: 'BMW 3 Series 2022', dates: '10.06 - 14.06', days: 4, total: 260, status: 'confirmed' },
  { id: 2, carName: 'Volkswagen Golf 2023', dates: '20.06 - 22.06', days: 2, total: 90, status: 'pending' },
  { id: 3, carName: 'Mercedes C-Class 2021', dates: '01.05 - 03.05', days: 2, total: 160, status: 'completed' },
  { id: 4, carName: 'Honda Civic 2020', dates: '12.04 - 13.04', days: 1, total: 35, status: 'cancelled' },
];

const ACTIVE_STATUSES: MyBookingStatus[] = ['pending', 'confirmed', 'active'];

export function useMyBookingsPage() {
  const [activeTab, setActiveTab] = useState<MyBookingsTab>('all');

  const bookings = MOCK_BOOKINGS.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ACTIVE_STATUSES.includes(b.status);
    return b.status === activeTab;
  });

  return { bookings, activeTab, setActiveTab };
}
