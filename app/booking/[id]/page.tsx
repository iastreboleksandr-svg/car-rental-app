import { BookingConfirmation } from '@/components/booking/BookingConfirmation';

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-bg-page">
      <main className="max-w-lg mx-auto px-4 py-6">
        <BookingConfirmation
          bookingId="12345"
          car={{ name: 'Mercedes-Benz S-Class' }}
          dates={{ start: '01.06.2025', end: '05.06.2025' }}
          total={400}
          status="pending"
        />
      </main>
    </div>
  );
}