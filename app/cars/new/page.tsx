import { CarForm } from '@/components/cars/CarForm';

export default function NewCarPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      <main className="max-w-lg mx-auto px-4 py-6">
        <CarForm />
      </main>
    </div>
  );
}