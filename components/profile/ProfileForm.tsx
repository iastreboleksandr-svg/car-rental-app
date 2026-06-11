'use client';

import { ProfileCard } from './ProfileCard';

export default function ProfileForm() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        <ProfileCard />
      </div>
    </div>
  );
}
