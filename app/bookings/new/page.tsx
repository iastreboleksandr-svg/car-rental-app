"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useCarStore } from "@/lib/store/carStore";
import { useBookingStore } from "@/lib/store/bookingStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BookingNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");

  const user = useAuthStore((state) => state.user);
  const cars = useCarStore((state) => state.cars);
  const addBooking = useBookingStore((state) => state.addBooking);

  const car = cars.find((c) => c.id === carId);

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  if (!car) {
    return <div>Машина не найдена</div>;
  }

  const days =
    startAt && endAt
      ? Math.max(
          1,
          Math.ceil(
            (new Date(endAt).getTime() - new Date(startAt).getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
      : 0;

  const totalPrice = days * car.pricePerDay;

  function handleSubmit() {
    if (!startAt || !endAt) {
      setError("Выберите даты аренды");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(startAt) < today) {
      setError("Дата начала не может быть в прошлом");
      return;
    }

    if (new Date(startAt) > new Date(endAt)) {
      setError("Дата окончания не может быть раньше даты начала");
      return;
    }

    const newBooking = {
      id: crypto.randomUUID(),
      carId: car!.id,
      renterId: user!.id,
      startAt,
      endAt,
      totalPrice,
      depositAmount: car!.deposit,
      status: 0,
      createdAt: new Date().toISOString(),
    };

    addBooking(newBooking);
    router.push(`/bookings/${newBooking.id}/confirmation`);
  }

  return (
    <div>
      <h1>Оформление брони</h1>

      <h2>{car.brand} {car.model} ({car.year})</h2>
      <p>{car.pricePerDay} € / день</p>
      <p>Депозит: {car.deposit} €</p>

      <div>
        <label>Дата начала</label>
        <input
          type="date"
          value={startAt}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setStartAt(e.target.value)}
        />
      </div>

      <div>
        <label>Дата окончания</label>
        <input
          type="date"
          value={endAt}
          min={startAt || new Date().toISOString().split("T")[0]}
          onChange={(e) => setEndAt(e.target.value)}
        />
      </div>

      {days > 0 && (
        <div>
          <p>{days} дней × {car.pricePerDay} € = {totalPrice} €</p>
          <p>Депозит: {car.deposit} €</p>
          <p>Итого: {totalPrice + car.deposit} €</p>
          <p>Оплата: Наличными при получении</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit}>Подтвердить бронирование</button>
      <button onClick={() => router.back()}>Назад</button>
    </div>
  );
}