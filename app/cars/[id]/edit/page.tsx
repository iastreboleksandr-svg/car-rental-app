import { CarForm } from '@/components/cars/CarForm';

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
    <div className="min-h-screen bg-bg-page">
      <main className="max-w-lg mx-auto px-4 py-6">
        <CarForm initialData={MOCK_CAR} mode="edit" />
      </main>
    </div>
  );
}