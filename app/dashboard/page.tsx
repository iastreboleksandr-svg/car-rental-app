'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardCarCard } from '@/components/dashboard/DashboardCarCard';

export default function DashboardPage() {
  const [cars, setCars] = useState([
    { id: 1, name: 'Toyota Camry 2021', status: 'active' as const, price: 50, bookings: 3 },
    { id: 2, name: 'Honda Civic 2020', status: 'inactive' as const, price: 35, bookings: 0 },
  ]);

  const toggleStatus = (id: number) => {
    setCars((prev) =>
      prev.map((car) =>
        car.id === id
          ? { ...car, status: car.status === 'active' ? 'inactive' : 'active' }
          : car
      )
    );
  };

  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center">
      <div className="bg-bg-card rounded-2xl border border-border-default shadow-sm w-full max-w-lg p-6 flex flex-col gap-6">

        <DashboardHeader />

        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold text-brand tracking-widest uppercase bg-brand-subtle border border-brand-subtle self-start px-3 py-1 rounded-full">
            Мои машины
          </p>

          {cars.map((car) => (
            <DashboardCarCard
              key={car.id}
              {...car}
              onToggleStatus={toggleStatus}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
