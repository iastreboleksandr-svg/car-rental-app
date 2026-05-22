
import { BookingsList } from '@/components/bookings/BookingsList';

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <BookingsList />
        </div>
      </main>
    </div>
  );
}






