"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useCarStore } from "@/lib/store/carStore";
import CarsList from "@/components/cars/CarsList";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CarsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOwnerView = searchParams.get("owner") === "me";

  const user = useAuthStore((state) => state.user);
  const cars = useCarStore((state) => state.cars);

  useEffect(() => {
    if (isOwnerView && !user) {
      router.push("/auth/login");
    }
  }, [isOwnerView, user, router]);

  const filteredCars = isOwnerView
    ? cars.filter((car) => car.ownerId === user?.id)
    : cars;

  return (
    <div>
      {isOwnerView ? (
        <>
          <h1>Мои машины</h1>
          <Link href="/cars/new">Добавить машину</Link>
          {filteredCars.length === 0 && <p>У вас пока нет машин</p>}
        </>
      ) : (
        <h1>Все машины</h1>
      )}

      <CarsList cars={filteredCars} isOwnerView={isOwnerView} />
    </div>
  );
}
