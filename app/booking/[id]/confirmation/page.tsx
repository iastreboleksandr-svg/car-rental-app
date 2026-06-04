
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';

const MOCK_BOOKING = {
  bookingId: '1042',
  car: { name: 'Mercedes-Benz S-Class 2024' },
  dates: { start: '01.06.2025', end: '05.06.2025' },
  total: 400,
  status: 'pending' as const,
};

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-bg-page py-8 px-4">
      <div className="max-w-lg mx-auto">
        <BookingConfirmation {...MOCK_BOOKING} />
      </div>
    </div>
  );
}