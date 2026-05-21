import { create } from "zustand";
import { persist } from "zustand/middleware";
import Car from "@/lib/types/car";
import mockCars from "@/lib/mocks/cars";

type CarStore = {
  cars: Car[];
  addCar: (car: Car) => void;
  updateCar: (id: string, data: Partial<Car>) => void;
  deleteCar: (id: string) => void;
};

export const useCarStore = create<CarStore>()(
  persist(
    (set) => ({
      cars: mockCars,
      addCar: (car) => set((state) => ({ cars: [...state.cars, car] })),
      updateCar: (id, data) =>
        set((state) => ({
          cars: state.cars.map((c) => (c.id === id ? { ...c, ...data } : c)),
        })),
      deleteCar: (id) =>
        set((state) => ({ cars: state.cars.filter((c) => c.id !== id) })),
    }),
    { name: "cars" },
  ),
);
