'use client';

import Button from '@/components/atoms/Button';
import { Car, Pencil, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [cars, setCars] = useState([
    { id: 1, name: 'Toyota Camry 2021', status: 'active', price: 50, bookings: 3 },
    { id: 2, name: 'Honda Civic 2020', status: 'inactive', price: 35, bookings: 0 },
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-6 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            <Button className="text-sm" onClick={() => router.push('/cars/new')}>
              + Добавить машину
            </Button>
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
              ОВ
            </div>
          </div>
        </div>

        {/* Cars list */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Мои машины
          </p>

          {cars.map((car) => (
            <div key={car.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">

              {/* Car info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                  <Car size={28} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">{car.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      car.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {car.status}
                    </span>
                    <span className="text-xs text-gray-600 font-medium">
                      ${car.price}/день
                    </span>
                    {car.bookings > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-500 font-medium">
                        {car.bookings} брони
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/cars/${car.id}/edit`)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Pencil size={14} />
                  Редактировать
                </button>
                <button
                  onClick={() => router.push(`/cars/${car.id}/slots`)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Calendar size={14} />
                  Доступность
                </button>
                <button
                  onClick={() => toggleStatus(car.id)}
                  className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition-colors ${
                    car.status === 'active'
                      ? 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      : 'bg-blue-100 text-blue-500 hover:bg-blue-200'
                  }`}
                >
                  {car.status === 'active' ? 'Снять' : 'Опубликовать'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}


// import { PrivateRoute } from '@/components/layout/PrivateRoute';

// export default function DashboardPage() {
//   return (
//     <PrivateRoute>
//       <div>DashboardPage</div>
//     </PrivateRoute>
//   );
// }
