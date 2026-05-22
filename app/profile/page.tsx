"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "Введите имя"),
  lastName: z.string().min(1, "Введите фамилию"),
  phone: z.string().optional(),
});
// text
type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(user?.avatarUrl || null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormValues>({
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
      setAvatar(user.avatarUrl || null);
    }
  }, [user, reset]);

  if (!user) {
    return <div>Вы не авторизованы</div>;
  }

  function onSubmit(data: ProfileFormValues) {
    // TODO: updateUser в сторе
    setSaved(true);
  }

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  }

  return (
    <div>
      <h1>Мой профиль</h1>
      {avatar && <img src={avatar} alt="avatar" width={100} height={100} />}
      <div>
        <label>Аватар</label>
        <input type="file" accept="image/*" onChange={handleAvatar} />
      </div>

      <p>{user.email}</p>

      <div>
        <label>Имя</label>
        <input {...register("firstName")} />
        {errors.firstName && <p style={{ color: "red" }}>{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Фамилия</label>
        <input {...register("lastName")} />
        {errors.lastName && <p style={{ color: "red" }}>{errors.lastName.message}</p>}
      </div>
      <div>
        <label>Телефон</label>
        <input {...register("phone")} />
      </div>

      <button onClick={handleSubmit(onSubmit)}>Сохранить</button>
      {saved && <p>Профиль обновлён!</p>}
    </div>
  );
}