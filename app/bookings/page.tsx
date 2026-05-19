import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <div>MyBookingsPage</div>
    </PrivateRoute>
  );
}
