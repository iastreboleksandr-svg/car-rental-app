import { CarForm } from '@/components/cars/CarForm';

export default function NewCarPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-lg mx-auto px-4 py-6">
        <CarForm />
      </main>
    </div>
  );
}