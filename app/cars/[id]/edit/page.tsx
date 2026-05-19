import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function CarEditPage() {
  return (
    <PrivateRoute>
      <div>CarFormPage (edit)</div>
    </PrivateRoute>
  );
}
