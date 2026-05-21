"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useCarStore } from "@/lib/store/carStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const carSchema = z.object({
  brand: z.string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов"),
  model: z.string().min(1, "Введите модель").max(50, "Максимум 50 символов"),
  year: z.coerce
    .number()
    .min(1990, "Год не может быть раньше 1990")
    .max(2026, "Год не может быть позже 2026"),
  fuelType: z.coerce.number(),
  transmission: z.coerce.number(),
  seats: z.coerce.number().min(1, "Минимум 1 место").max(9, "Максимум 9 мест"),
  pricePerDay: z.coerce
    .number()
    .min(1, "Цена должна быть больше 0")
    .max(10000, "Максимум 10 000 €"),
  deposit: z.coerce
    .number()
    .min(0, "Депозит не может быть отрицательным")
    .max(50000, "Максимум 50 000 €"),
  description: z.string().max(500, "Максимум 500 символов").optional(),
  address: z.string().max(200, "Максимум 200 символов").optional(),
});

type CarFormValues = z.infer<typeof carSchema>;

export default function NewCarPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const addCar = useCarStore((state) => state.addCar);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      fuelType: 1,
      transmission: 1,
      seats: 5,
      deposit: 0,
    },
  });

  if (!user) {
    return <div>Вы не авторизованы</div>;
  }

  function onSubmit(data: CarFormValues) {
    const newCar = {
      id: crypto.randomUUID(),
      ownerId: user!.id,
      ...data,
      status: 1,
      createdAt: new Date().toISOString(),
    };

    addCar(newCar);
    router.push(`/cars/${newCar.id}`);
  }

  return (
    <div>
      <h1>Добавить машину</h1>

      <div>
        <label>Марка</label>
        <input {...register("brand")} />
        {errors.brand && <p style={{ color: "red" }}>{errors.brand.message}</p>}
      </div>

      <div>
        <label>Модель</label>
        <input {...register("model")} />
        {errors.model && <p style={{ color: "red" }}>{errors.model.message}</p>}
      </div>

      <div>
        <label>Год выпуска</label>
        <input type="number" {...register("year")} />
        {errors.year && <p style={{ color: "red" }}>{errors.year.message}</p>}
      </div>

      <div>
        <label>Тип топлива</label>
        <select {...register("fuelType")}>
          <option value={1}>Бензин</option>
          <option value={2}>Дизель</option>
          <option value={3}>Электро</option>
          <option value={4}>Гибрид</option>
        </select>
      </div>

      <div>
        <label>Коробка передач</label>
        <select {...register("transmission")}>
          <option value={1}>Механика</option>
          <option value={2}>Автомат</option>
        </select>
      </div>

      <div>
        <label>Количество мест</label>
        <input type="number" {...register("seats")} />
        {errors.seats && <p style={{ color: "red" }}>{errors.seats.message}</p>}
      </div>

      <div>
        <label>Цена за день (€)</label>
        <input type="number" {...register("pricePerDay")} />
        {errors.pricePerDay && (
          <p style={{ color: "red" }}>{errors.pricePerDay.message}</p>
        )}
      </div>

      <div>
        <label>Депозит (€)</label>
        <input type="number" {...register("deposit")} />
        {errors.deposit && (
          <p style={{ color: "red" }}>{errors.deposit.message}</p>
        )}
      </div>

      <div>
        <label>Описание</label>
        <textarea {...register("description")} />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}
      </div>

      <div>
        <label>Адрес</label>
        <input {...register("address")} />
        {errors.address && (
          <p style={{ color: "red" }}>{errors.address.message}</p>
        )}
      </div>

      <button onClick={handleSubmit(onSubmit)}>Добавить машину</button>
    </div>
  );
}
