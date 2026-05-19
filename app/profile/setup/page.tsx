import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function ProfileSetupPage() {
  return (
    <PrivateRoute>
      <div>ProfileSetupPage</div>
    </PrivateRoute>
  );
}
