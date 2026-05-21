"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [avatar, setAvatar] = useState<string | null>(user?.avatarUrl || null);
  const router = useRouter();

  if (!user) {
    return <div>Вы не авторизованы</div>;
  }

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  }

  return (
    <div>
      <h1>Мой профиль</h1>

      {avatar && <img src={avatar} alt="avatar" width={100} height={100} />}
      <div>
        <label>Аватар</label>
        <input type="file" accept="image/*" onChange={handleAvatar} />
      </div>

      <p>{user.email}</p>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      {user.phone && <p>{user.phone}</p>}

      <button onClick={() => router.push("/profile/edit")}>
        Редактировать
      </button>
    </div>
  );
}