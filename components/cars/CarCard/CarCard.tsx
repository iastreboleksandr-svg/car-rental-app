import Car from "@/lib/types/car";
import { FUEL_TYPE, TRANSMISSION } from "@/lib/constants/car";
import Link from "next/link";
import styles from "./CarCard.module.css";

type CarCardProps = {
  car: Car;
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.id}`}>
    <div className={styles.card}>
      {car.carPhotoUrl && (
        <img
          src={car.carPhotoUrl}
          alt={`${car.brand} ${car.model}`}
          width={300}
          height={200}
        />
      )}
      <h2>
        {car.brand} {car.model} ({car.year})
      </h2>
      <p>
        {car.seats} мест · {FUEL_TYPE[car.fuelType]} ·{" "}
        {TRANSMISSION[car.transmission]}
      </p>
      <p>{car.description}</p>
      <p>{car.address}</p>
      <p>{car.pricePerDay} $ / день</p>
      <p>Депозит: {car.deposit} $</p>
    </div>
    </Link>
  );
}
