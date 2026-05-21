"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useState } from "react";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Введите текущий пароль"),
    newPassword: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  if (!user) {
    return <div>Вы не авторизованы</div>;
  }

  function onSubmit(data: ChangePasswordValues) {
    // TODO: PATCH /user/me с новым паролем
    console.log(data);
    setSaved(true);
    reset();
  }

  return (
    <div>
      <h1>Смена пароля</h1>

      <div>
        <label>Текущий пароль</label>
        <input type="password" {...register("currentPassword")} />
        {errors.currentPassword && (
          <p style={{ color: "red" }}>{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label>Новый пароль</label>
        <input type="password" {...register("newPassword")} />
        {errors.newPassword && (
          <p style={{ color: "red" }}>{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label>Подтвердите новый пароль</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}
      </div>

      {saved && <p style={{ color: "green" }}>Пароль успешно изменён!</p>}

      <button onClick={() => router.back()}>Отмена</button>
      <button onClick={handleSubmit(onSubmit)}>Сохранить</button>
    </div>
  );
}