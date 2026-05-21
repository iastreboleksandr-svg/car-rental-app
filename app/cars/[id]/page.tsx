"use client";

import { FUEL_TYPE, TRANSMISSION } from "@/lib/constants/car";
import { useCarStore } from "@/lib/store/carStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useParams, useRouter } from "next/navigation";

export default function CarDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const cars = useCarStore((state) => state.cars);
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return <div>Машина не найдена</div>;
  }

  const isOwner = user?.id === car.ownerId;

  function handleBooking() {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    router.push(`/bookings/new?carId=${car!.id}`);
  }

  return (
    <div>
      {car.carPhotoUrl && (
        <img
          src={car.carPhotoUrl}
          alt={`${car.brand} ${car.model}`}
          width={600}
          height={400}
        />
      )}
      <h1>
        {car.brand} {car.model} ({car.year})
      </h1>
      <p>
        {car.seats} мест · {FUEL_TYPE[car.fuelType]} ·{" "}
        {TRANSMISSION[car.transmission]}
      </p>
      <p>{car.address}</p>
      <p>{car.description}</p>
      <p>{car.pricePerDay} € / день</p>
      <p>Депозит: {car.deposit} €</p>

      {!isOwner && <button onClick={handleBooking}>Забронировать</button>}

      {isOwner && (
        <button onClick={() => router.push(`/cars/${car.id}/edit`)}>
          Редактировать
        </button>
      )}
    </div>
  );
}
