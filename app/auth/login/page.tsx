"use client";

import { mockUsers } from "@/lib/mocks/users";
import { useAuthStore } from "@/lib/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email("Неверный email"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormValues) {
    const user = mockUsers.find((user) => user.email === data.email);

    if (!user) {
      setError("email", { message: "Пользователь не найден" });
      return;
    }

    if (user.password !== data.password) {
      setError("password", { message: "Неверный пароль" });
      return;
    }

    console.log("Логиним пользователя:", user); // ← добавь это
    
    login(user);
    router.push("/profile");
  }

  return (
    <div>
      <h1>Войти</h1>
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>
      <div>
        <label>Пароль</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>
      <button onClick={handleSubmit(onSubmit)}>Войти</button>
    </div>
  );
}
