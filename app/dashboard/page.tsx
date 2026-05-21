'use client';

import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';
import { Car, Pencil, Calendar } from 'lucide-react';
import { useDashboardPage } from '@/hooks/useDashboardPage';

export default function DashboardPage() {
  const { cars, isLoading, goToEdit, goToSlots, goToNewCar } = useDashboardPage();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-6 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            <Button className="text-sm" onClick={goToNewCar}>
              + Добавить машину
            </Button>
          </div>
        </div>

        {/* Cars list */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Мои машины
          </p>

          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Spinner size="sm" /> Загрузка...
            </div>
          )}

          {!isLoading && cars.length === 0 && (
            <p className="text-sm text-gray-400">У вас пока нет машин</p>
          )}

          {cars.map((car) => (
            <div key={car.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4">

              {/* Car info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                  <Car size={28} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">{car.brand} {car.model} {car.year}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      car.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : car.status === 'rented'
                        ? 'bg-orange-100 text-orange-500'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {car.status}
                    </span>
                    <span className="text-xs text-gray-600 font-medium">
                      ${car.pricePerDay}/день
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => goToEdit(car.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Pencil size={14} />
                  Редактировать
                </button>
                <button
                  onClick={() => goToSlots(car.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Calendar size={14} />
                  Доступность
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
