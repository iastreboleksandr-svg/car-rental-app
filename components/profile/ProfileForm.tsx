'use client';

import { useState, useRef } from 'react';
import { Camera, Phone, Mail, User, Edit2, Check, X } from 'lucide-react';
import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { useAuthStore } from '@/store/auth.store'; 

// ─── Типы ────────────────────────────────────────────────────────────────────

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

// ─── Компонент страницы ───────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useAuthStore();

  // Состояние: режим редактирования вкл/выкл
  const [isEditing, setIsEditing] = useState(false);

  // Состояние формы — инициализируем данными из store
  const [form, setForm] = useState<ProfileFormData>({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: user?.phone ?? '',
  });

  // Резервная копия — нужна чтобы при отмене восстановить старые данные
  const [backup, setBackup] = useState<ProfileFormData>(form);

  // Аватар хранится как base64 строка (или null если не загружен)
  const [avatar, setAvatar] = useState<string | null>(user?.avatarUrl ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Обработчики ─────────────────────────────────────────────────────────────

  // Когда пользователь нажимает "Редактировать" — сохраняем резервную копию
  const handleEditStart = () => {
    setBackup(form);
    setIsEditing(true);
  };

  // Отмена — восстанавливаем данные из резервной копии
  const handleCancel = () => {
    setForm(backup);
    setIsEditing(false);
  };

  // Сохранение — здесь в будущем будет API вызов
  const handleSave = () => {
    // TODO: вызов API для сохранения
    setIsEditing(false);
  };

  // Загрузка аватара — читаем файл как base64
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Универсальный обработчик изменения полей формы
  // Принимает название поля (keyof ProfileFormData) и новое значение
  const handleFieldChange = (field: keyof ProfileFormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // ── Рендер ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        {/* ── Карточка профиля ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          {/* Заголовок карточки */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-semibold text-gray-900">Мой профиль</h1>

            {/* Кнопка редактирования / отмены */}
            {!isEditing ? (
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Edit2 size={14} />}
                onClick={handleEditStart}
              >
                Редактировать
              </Button>
            ) : (
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={14} />
                Отмена
              </button>
            )}
          </div>

          {/* Аватар */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {/* Круглое фото или плейсхолдер */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Фото профиля"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // Если фото нет — показываем инициалы
                  <div className="w-full h-full flex items-center justify-center bg-[#48C964]/10">
                    <span className="text-2xl font-semibold text-[#48C964]">
                      {/* Берём первые буквы имени и фамилии */}
                      {(form.firstName[0] ?? '?').toUpperCase()}
                      {(form.lastName[0] ?? '').toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Кнопка смены фото — видна только в режиме редактирования */}
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#48C964] text-white flex items-center justify-center shadow-md hover:bg-[#32a84d] transition-colors"
                  aria-label="Изменить фото"
                >
                  <Camera size={13} />
                </button>
              )}
            </div>

            {/* Скрытый input для загрузки файла */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            {/* Имя под аватаром (только в режиме просмотра) */}
            {!isEditing && (
              <p className="mt-3 text-base font-semibold text-gray-900">
                {form.firstName} {form.lastName}
              </p>
            )}
          </div>

          <hr className="border-gray-100 mb-6" />

          {/* ── Поля данных ── */}
          {isEditing ? (
            // Режим редактирования — показываем Input компоненты
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <Input
                  label="Имя"
                  value={form.firstName}
                  onChange={handleFieldChange('firstName')}
                  placeholder="Иван"
                  required
                />
                <Input
                  label="Фамилия"
                  value={form.lastName}
                  onChange={handleFieldChange('lastName')}
                  placeholder="Петров"
                  required
                />
              </div>
              <Input
                label="Телефон"
                type="tel"
                leadingIcon={<Phone size={16} />}
                value={form.phone}
                onChange={handleFieldChange('phone')}
                placeholder="+380..."
              />
            </div>
          ) : (
            // Режим просмотра — показываем статичные строки
            <div className="flex flex-col gap-3">
              <InfoRow icon={<User size={16} />} label="Имя" value={`${form.firstName} ${form.lastName}`} />
              <InfoRow icon={<Mail size={16} />} label="Email" value={user?.email ?? '—'} />
              <InfoRow icon={<Phone size={16} />} label="Телефон" value={form.phone || '—'} />
            </div>
          )}

          {/* Кнопка сохранения — только в режиме редактирования */}
          {isEditing && (
            <div className="mt-6">
              <Button
                className="w-full"
                leftIcon={<Check size={16} />}
                onClick={handleSave}
              >
                Сохранить
              </Button>
            </div>
          )}
        </div>

        {/* ── Карточка роли ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Аккаунт
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Роль</span>
            {/* Бейдж роли */}
            <span className={`
              text-xs font-semibold px-3 py-1 rounded-full
              ${user?.role === 'owner'
                ? 'bg-[#48C964]/10 text-[#2a9043]'
                : 'bg-blue-50 text-blue-700'}
            `}>
              {user?.role === 'owner' ? 'Владелец' : 'Арендатор'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Вспомогательный компонент ────────────────────────────────────────────────

// InfoRow — одна строка в режиме просмотра: иконка + лейбл + значение
// Выносим в отдельный компонент чтобы не дублировать разметку 3 раза
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      {/* Иконка в кружке */}
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm text-gray-900 font-medium truncate">{value}</p>
      </div>
    </div>
  );
}