'use client';

import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Mail, Lock, Eye } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 flex flex-col gap-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTab('login')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'login'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Войти
          </button>
          <button
            onClick={() => setTab('register')}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              tab === 'register'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Зарегистрироваться
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          {tab === 'register' && (
            <>
              <Input
                label="Имя"
                type="text"
                placeholder="Иван"
                value={firstName}
                onChange={setFirstName}
              />
              <Input
                label="Фамилия"
                type="text"
                placeholder="Иванов"
                value={lastName}
                onChange={setLastName}
              />
            </>
          )}

          <Input
            label="Email"
            type="email"
            leadingIcon={<Mail size={16} />}
            placeholder="user@example.com"
            value={email}
            onChange={setEmail}
            required
          />

          <Input
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            leadingIcon={<Lock size={16} />}
            trailingIcon={
              <button onClick={() => setShowPassword(!showPassword)} type="button">
                <Eye size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            }
            value={password}
            onChange={setPassword}
            required
          />

          {tab === 'register' && (
            <Input
              label="Подтверждение пароля"
              type={showConfirmPassword ? 'text' : 'password'}
              leadingIcon={<Lock size={16} />}
              trailingIcon={
                <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                  <Eye size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              }
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />
          )}
        </div>

        {/* Submit */}
        <Button className="w-full">{tab === 'login' ? 'Войти' : 'Зарегистрироваться'}</Button>

        {/* Switch link */}
        <p className="text-center text-sm text-gray-500">
          {tab === 'login' ? (
            <>
              Нет аккаунта?{' '}
              <button onClick={() => setTab('register')} className="text-blue-500 hover:underline">
                Зарегистрируйтесь
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{' '}
              <button onClick={() => setTab('login')} className="text-blue-500 hover:underline">
                Войти
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}




// import { PublicRoute } from '@/components/layout/PublicRoute';

// export default function LoginPage() {
//   return (
//     <PublicRoute>
//       <div>LoginPage</div>
//     </PublicRoute>
//   );
// }
