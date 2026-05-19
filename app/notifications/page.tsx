import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function NotificationsPage() {
  return (
    <PrivateRoute>
      <div>NotificationsPage</div>
    </PrivateRoute>
  );
}
