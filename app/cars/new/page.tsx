import { PrivateRoute } from '@/components/layout/PrivateRoute';

export default function CarFormPage() {
  return (
    <PrivateRoute>
      <div>CarFormPage (new)</div>
    </PrivateRoute>
  );
}
