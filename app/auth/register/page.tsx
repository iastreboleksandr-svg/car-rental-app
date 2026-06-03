"use client";

import { useRouter } from "next/navigation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/lib/store/authStore";

const registerSchema = z.object({
  email: z.string().email("Неверный email"),
  password: z.string().min(6, "Минимум 6 символов"),
  firstName: z.string().min(1, "Введите имя"),
  lastName: z.string().min(1, "Введите фамилию"),
  phone: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, users } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(data: RegisterFormValues) {
    const userExists = users.find((u) => u.email === data.email);

    if (userExists) {
      setError("email", { message: "Пользователь с таким email уже зарегистрирован" });
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      avatarUrl: undefined,
      isVerified: false,
      status: 1,
      createdAt: new Date().toISOString(),
    };

    registerUser(newUser);
    router.push("/profile");
  }

  return (
    <div>
      <h1>Регистрация</h1>
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" {...register("password")} />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>
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
      <button onClick={handleSubmit(onSubmit)}>Зарегистрироваться</button>
    </div>
  );
}