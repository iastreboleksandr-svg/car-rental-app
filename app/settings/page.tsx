"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) {
    return <div>Вы не авторизованы</div>;
  }

  function handleDeleteAccount() {
    // TODO: DELETE /user/me
    // useAuthStore.getState().logout()
    router.push("/login");
  }

  return (
    <div>
      <h1>Настройки</h1>

      {/* Смена пароля */}
      <section>
        <h2>Безопасность</h2>
        <button onClick={() => router.push("/settings/change-password")}>
          Сменить пароль
        </button>
      </section>

      {/* Удаление аккаунта */}
      <section>
        <h2>Удаление аккаунта</h2>
        <p>Это действие необратимо. Все данные будут удалены.</p>

        {!showDeleteConfirm ? (
          <button onClick={() => setShowDeleteConfirm(true)}>
            Удалить аккаунт
          </button>
        ) : (
          <div>
            <p>Вы уверены? Это нельзя отменить.</p>
            <button onClick={() => setShowDeleteConfirm(false)}>Отмена</button>
            <button onClick={handleDeleteAccount}>Да, удалить</button>
          </div>
        )}
      </section>
    </div>
  );
}
