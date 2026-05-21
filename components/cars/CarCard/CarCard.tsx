"use client";

import Car from "@/lib/types/car";
import { FUEL_TYPE, TRANSMISSION } from "@/lib/constants/car";
import { useCarStore } from "@/lib/store/carStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./CarCard.module.css";

type CarCardProps = {
  car: Car;
  isOwnerView?: boolean;
};

export default function CarCard({ car, isOwnerView }: CarCardProps) {
  const deleteCar = useCarStore((state) => state.deleteCar);
  const router = useRouter();

  return (
    <div className={styles.card}>
      <Link href={`/cars/${car.id}`}>
        {car.carPhotoUrl && (
          <img
            src={car.carPhotoUrl}
            alt={`${car.brand} ${car.model}`}
            width={300}
            height={200}
          />
        )}
        <h2>{car.brand} {car.model} ({car.year})</h2>
        <p>{car.seats} мест · {FUEL_TYPE[car.fuelType]} · {TRANSMISSION[car.transmission]}</p>
        <p>{car.description}</p>
        <p>{car.address}</p>
        <p>{car.pricePerDay} € / день</p>
        <p>Депозит: {car.deposit} €</p>
      </Link>

      {/* {isOwnerView && (
        <div>
          <button onClick={() => router.push(`/cars/${car.id}/edit`)}>
            Редактировать
          </button>
          <button onClick={() => deleteCar(car.id)}>
            Удалить
          </button>
        </div>
      )} */}
    </div>
  );
}