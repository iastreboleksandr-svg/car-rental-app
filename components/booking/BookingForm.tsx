"use client";


import { mockBookings } from "@/lib/mocks/bookings";
import { mockCurrentUser } from "@/lib/mocks/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const today = new Date().toISOString().split("T")[0];

const bookingSchema = z
  .object({
    startAt: z
      .string()
      .min(1, "Выберите дату начала")
      .refine((date) => date >= today, "Дата начала не может быть в прошлом"),
    endAt: z
      .string()
      .min(1, "Выберите дату конца")
      .refine((date) => date >= today, "Дата конца не может быть в прошлом"),
  })
  .refine((data) => data.endAt >= data.startAt, {
    message: "Дата конца должна быть не раньше даты начала",
    path: ["endAt"],
  });

type BookingFormValues = z.infer<typeof bookingSchema>;

type BookingFormProps = {
  carId: string;
  pricePerDay: number;
};

export default function BookingForm({ carId, pricePerDay }: BookingFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });;

  function onSubmit(data: BookingFormValues) {
    const days = Math.ceil(
      (new Date(data.endAt).getTime() - new Date(data.startAt).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const booking = {
      id: String(mockBookings.length + 1),
      carId,
      renterId: mockCurrentUser.id,
      startAt: data.startAt,
      endAt: data.endAt,
      totalPrice: days * pricePerDay,
      depositAmount: 0,
      status: 0,
      createdAt: new Date().toISOString(),
    };

    mockBookings.push(booking);
    alert(`Бронирование создано! ${data.startAt} — ${data.endAt}, итого: ${days * pricePerDay} $`);

    router.push(`/bookings/${booking.id}`);
  }

  return (
    <div>
      <div>
        <label>Дата начала</label>
        <input
          type="date"
          {...register("startAt", { required: "Выберите дату начала" })}
        />
        {errors.startAt && <p>{errors.startAt.message}</p>}
      </div>
      <div>
        <label>Дата конца</label>
        <input
          type="date"
          {...register("endAt", { required: "Выберите дату конца" })}
        />
        {errors.endAt && <p>{errors.endAt.message}</p>}
      </div>
      <button onClick={handleSubmit(onSubmit)}>Забронировать</button>
    </div>
  );
}
