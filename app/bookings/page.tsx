"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useBookingStore } from "@/lib/store/bookingStore";
import { useCarStore } from "@/lib/store/carStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BookingPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const cars = useCarStore((state) => state.cars);
  const bookings = useBookingStore((state) => state.bookings);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) return null;

  const myBookings = bookings.filter((booking) => booking.renterId === user.id);

  if (myBookings.length === 0) {
    return <div>У вас нет бронирований</div>;
  }

  return (
    <div>
      <h1>Мои бронирования</h1>
      {myBookings.map((booking) => {
        const car = cars.find((c) => c.id === booking.carId);
        return (
          <Link key={booking.id} href={`/bookings/${booking.id}`}>
            <div>
              <h2>{car?.brand} {car?.model}</h2>
              <p>{booking.startAt} — {booking.endAt}</p>
              <p>Итого: {booking.totalPrice} €</p>
              <p>Статус: {booking.status}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}