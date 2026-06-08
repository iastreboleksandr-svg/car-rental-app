'use client';

import { useProfilePage } from '@/hooks/useProfilePage';

export default function ProfilePage() {
  const { profile, loading, error } = useProfilePage();

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Профиль не найден</p>;
  }

  return (
    <div>
      <h1>Профиль</h1>
      <p>ID: {profile.id}</p>
      <p>Email: {profile.email}</p>
      <p>Имя: {profile.firstName ?? '—'}</p>
      <p>Фамилия: {profile.lastName ?? '—'}</p>
      <p>Телефон: {profile.phone ?? '—'}</p>
      <p>Аватар: {profile.avatarUrl ?? '—'}</p>
      <p>Заблокирован: {profile.isBlocked ? 'да' : 'нет'}</p>
      <p>Создан: {profile.createdAt}</p>
    </div>
  );
}
