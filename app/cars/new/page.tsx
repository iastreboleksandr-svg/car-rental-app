import { PrivateRoute } from '@/components/layout/PrivateRoute';
import { CarForm } from '@/components/cars/CarForm';

export default function CarNewPage() {
  return (
    <PrivateRoute>
      <CarForm mode="create" />
    </PrivateRoute>
  );
}
