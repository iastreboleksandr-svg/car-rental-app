"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useBookingStore } from "@/lib/store/bookingStore";
import { useCarStore } from "@/lib/store/carStore";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const bookings = useBookingStore((state) => state.bookings);
  const cars = useCarStore((state) => state.cars);

  const booking = bookings.find((b) => b.id === id);
  const car = cars.find((c) => c.id === booking?.carId);

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  if (!booking || !car) {
    return <div>Бронирование не найдено</div>;
  }

  return (
    <div>
      <h1>Заявка отправлена!</h1>
      <p>Ожидайте подтверждения владельца</p>

      <h2>{car.brand} {car.model} ({car.year})</h2>
      <p>Даты: {booking.startAt} — {booking.endAt}</p>
      <p>Сумма: {booking.totalPrice} €</p>
      <p>Депозит: {booking.depositAmount} €</p>
      <p>Итого: {booking.totalPrice + booking.depositAmount} €</p>
      <p>Оплата: Наличными при получении</p>
      <p>Статус: Ожидает подтверждения</p>

      <Link href="/bookings">Мои бронирования</Link>
      <Link href="/cars">Все машины</Link>
    </div>
  );
}