import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function SettingsPage() {
  return (
    <PrivateRoute>
      <div>SettingsPage</div>
    </PrivateRoute>
  );
}
