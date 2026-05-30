'use client';

import { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Mail, Lock, Bell, Trash2 } from 'lucide-react';
import { Section } from '@/components/common/Section';

export function SettingsForm() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col gap-4">

      {/* Email */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <Section title="Email">
          <Input
            label="Новый email"
            type="email"
            leadingIcon={<Mail size={16} />}
            placeholder="new@example.com"
            value={email}
            onChange={setEmail}
          />
          <Button className="w-full mt-4">Сменить email</Button>
        </Section>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <Section title="Пароль">
          <div className="flex flex-col gap-3">
            <Input
              label="Текущий пароль"
              type="password"
              leadingIcon={<Lock size={16} />}
              placeholder="••••••••"
              value={currentPassword}
              onChange={setCurrentPassword}
            />
            <Input
              label="Новый пароль"
              type="password"
              leadingIcon={<Lock size={16} />}
              placeholder="••••••••"
              value={newPassword}
              onChange={setNewPassword}
            />
          </div>
          <Button className="w-full mt-4">Сменить пароль</Button>
        </Section>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <Section title="Уведомления">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-gray-400" />
              <p className="text-sm text-gray-700">Push-уведомления</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full transition-colors ${
                notifications ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${
                notifications ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </Section>
      </div>

      {/* Delete account */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <Section title="Опасная зона">
          <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 border border-red-200 hover:border-red-400 rounded-xl px-4 py-2.5 transition-colors w-full justify-center">
            <Trash2 size={15} />
            Удалить аккаунт
          </button>
        </Section>
      </div>

    </div>
  );
}