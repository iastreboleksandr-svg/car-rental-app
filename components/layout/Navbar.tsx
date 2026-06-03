import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4">
      <Link href="/bookings">Мои бронирования</Link>
      <Link href="/cars">Машины</Link>
      <Link href="/auth/login">Войти</Link>
      <Link href="/auth/register">Регистрация</Link>
      <Link href="/profile">Мой профиль</Link>
      <Link href="/auth/logout">Выйти</Link>
    </nav>
  );
}
