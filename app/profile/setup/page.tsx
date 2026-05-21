'use client';

import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Camera, Phone } from 'lucide-react';
import { useProfileSetupPage } from '@/hooks/useProfileSetupPage';

export default function ProfileSetupPage() {
  const {
    firstName, setFirstName,
    lastName, setLastName,
    phone, setPhone,
    avatar,
    fileInputRef,
    openFilePicker,
    handleAvatarChange,
    handleContinue,
    handleSkip,
  } = useProfileSetupPage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 flex flex-col gap-6">
        <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
          Шаг 1 из 1 — Заполни профиль
        </p>

        {/* Аватар */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={openFilePicker}
            className="w-24 h-24 rounded-full border-2 border-dashed border-blue-300 bg-blue-50 flex flex-col items-center justify-center text-blue-400 hover:bg-blue-100 transition-colors"
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <>
                <Camera size={24} />
                <span className="text-xs mt-1">Фото</span>
              </>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <hr className="border-gray-100" />

        {/* Поля */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Input
              label="Имя"
              type="text"
              placeholder="Иван"
              value={firstName}
              onChange={setFirstName}
              required
            />
            <Input
              label="Фамилия"
              type="text"
              placeholder="Петров"
              value={lastName}
              onChange={setLastName}
              required
            />
          </div>

          <Input
            label="Телефон (необязательно)"
            type="tel"
            leadingIcon={<Phone size={16} />}
            placeholder="+380..."
            value={phone}
            onChange={setPhone}
          />
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleContinue}>
            Продолжить
          </Button>
          <button onClick={handleSkip} className="text-sm text-gray-400 hover:text-gray-600 text-center">
            Пропустить
          </button>
        </div>
      </div>
    </div>
  );
}
