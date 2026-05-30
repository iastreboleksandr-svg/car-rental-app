import { CarForm } from '@/components/cars/CarForm';

// Моковые данные — в реальности придут с API по id из params
const MOCK_CAR = {
  make: 'Mercedes-Benz',
  model: 'S-Class',
  year: '2024',
  fuel: 'Бензин',
  transmission: 'Автомат',
  pricePerDay: '50',
  deposit: '200',
  description: 'Флагманский седан Mercedes-Benz S-Class.',
  address: 'Киев, ул. Крещатик 1',
};

export default function CarEditPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-lg mx-auto px-4 py-6">
        <CarForm initialData={MOCK_CAR} mode="edit" />
      </main>
    </div>
  );
}