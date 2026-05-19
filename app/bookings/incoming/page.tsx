import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function IncomingBookingsPage() {
  return (
    <PrivateRoute>
      <div>IncomingBookingsPage</div>
    </PrivateRoute>
  );
}
