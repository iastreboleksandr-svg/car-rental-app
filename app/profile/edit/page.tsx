"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "Введите имя"),
  lastName: z.string().min(1, "Введите фамилию"),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileEditPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });
    }
  }, [user, reset]);

  if (!user) {
    return <div>Вы не авторизованы</div>;
  }

  function onSubmit(data: ProfileFormValues) {
    // TODO: updateUser в сторе
    console.log(data);
    router.push("/profile");
  }

  return (
    <div>
      <h1>Редактировать профиль</h1>

      <div>
        <label>Имя</label>
        <input {...register("firstName")} />
        {errors.firstName && (
          <p style={{ color: "red" }}>{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label>Фамилия</label>
        <input {...register("lastName")} />
        {errors.lastName && (
          <p style={{ color: "red" }}>{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label>Телефон</label>
        <input {...register("phone")} />
      </div>

      <button onClick={() => router.back()}>Отмена</button>
      <button onClick={handleSubmit(onSubmit)}>Сохранить</button>
    </div>
  );
}
