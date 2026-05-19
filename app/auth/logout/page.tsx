"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/auth/login");
  }, []);

  return (
    <div>
      <h1>Выход</h1>
      <p>Вы успешно вышли из системы.</p>
    </div>
  );
}
