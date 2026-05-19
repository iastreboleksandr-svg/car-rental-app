import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div>DashboardPage</div>
    </PrivateRoute>
  );
}
