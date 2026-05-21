"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="flex gap-4">
      <Link href="/cars">Машины</Link>
      {user ? (
        <>
          <Link href="/cars?owner=me">Мои машины</Link>
          <Link href="/bookings">Мои бронирования</Link>
          <Link href="/profile">Мой профиль</Link>
          <Link href="/cars/new">Добавить машину</Link>
          <Link href="/settings">Настройки</Link>
          <Link href="/auth/logout">Выйти</Link>
        </>
      ) : (
        <>
          <Link href="/auth/login">Войти</Link>
          <Link href="/auth/register">Регистрация</Link>
        </>
      )}
    </nav>
  );
}
