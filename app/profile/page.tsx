'use client';

import { PrivateRoute } from '@/components/layout/PrivateRoute';
import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfileForm />
    </PrivateRoute>
  );
}
