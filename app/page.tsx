"use client";

import { useState } from 'react';
import { ArrowRight, Mail, Plus } from 'lucide-react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Select from '@/components/atoms/Select';
import Checkbox from '@/components/atoms/Checkbox';
import RadioButton from '@/components/atoms/RadioButton';
import Toggle from '@/components/atoms/Toggle';
import Badge from '@/components/atoms/Badge';
import Avatar from '@/components/atoms/Avatar';
import Spinner from '@/components/atoms/Spinner';
import StarRating from '@/components/atoms/StarRating';
import { redirect } from 'next/navigation';
import router from 'next/router';

export default function HomePage() {

  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [fuel, setFuel] = useState<string | null>(null);
  const [petrol, setPetrol] = useState(false);
  const [diesel, setDiesel] = useState(false);
  const [electric, setElectric] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [payment, setPayment] = useState('');
  const [available, setAvailable] = useState(false);
  // const [rating, setRating] = useState(0);

  return (
    <main className="bg-zinc-50 min-h-screen">
      <section className="p-20">
        <h1 className="text-5xl font-bold">
          Car Sharing Marketplace
        </h1>

        <p className="text-zinc-500 mt-4">
          Rent cars directly from owners
        </p>
      </section>

      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col gap-6 w-80">

        <Avatar
          firstName="Анна"
          lastName="Петрова"
          size="md"
          onClick={() => router.push('/profile')}
        />

        <Avatar src="/ava.png" firstName="Анна" lastName="Петрова" size="md" />

        {/* <Avatar src={user.photo} firstName={user.firstName} lastName={user.lastName} size="lg" onClick={() => openPhotoUpload()} /> */}
        {/* <Avatar src={owner.photo} firstName={owner.firstName} lastName={owner.lastName} size="md" /> */}
        {/* <Avatar src={renter.photo} firstName={renter.firstName} lastName={renter.lastName} size="sm" /> */}
        {/* <Avatar src={user.photo} firstName={user.firstName} lastName={user.lastName} size="sm" onClick={() => router.push("/profile")} /> */}
        {/* // Обычный read-only с отзывами */}

        <StarRating value={4.5} showValue totalCount={1280} />

        {/* // Интерактивный 
        <StarRating value={rating} onChange={setRating} size="lg" showValue />

        // Полностью read-only принудительно
        <StarRating value={3} readonly size="sm" /> */}

        <Input
          label="Email"
          type="email"
          leadingIcon={<Mail size={16} />}
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          required
        />

        {/* <Input
          label="Пароль"
          type="password"
          leadingIcon={<Lock size={16} />}
          value={password}
          onChange={setPassword}
          required
        /> 
                
            <Input
          label="Пароль"
          type="password"
          leadingIcon={<LockIcon />}
          trailingIcon={<EyeIcon />}
          error="Пароль должен быть не менее 8 символов"
          value={password}
          onChange={setPassword}
        />

            <Input
          label="Телефон"
          type="tel"
          hint="Будет виден владельцу после подтверждения брони"
          placeholder="+7 (999) 000-00-00"
        />
        */}

        <Button variant="primary" type="submit">
          Войти
        </Button>

        <RadioButton
          label="Наличными при получении"
          value="cash"
          checked={payment === 'cash'}
          onChange={setPayment}
          name="payment"
        />

        <Toggle
          label="Машина доступна"
          labelPosition="right"
          checked={available}
          onChange={setAvailable}
        />

        <Button
          variant="secondary"
          size="lg"
          leftIcon={<Plus size={18} />}
          rightIcon={<ArrowRight size={18} />}
          className="gap-4 w-full"
        >
          Добавить машину
        </Button>

        {/* // Primary
        <Button variant="primary" size="md" onClick={() => {}}>
          Подтвердить бронирование
        </Button> 
        
        // Loading
        <Button variant="primary" loading>
          Сохраняем...
        </Button>
        
        // Danger + small
        <Button variant="danger" size="sm" onClick={handleCancel}>
           Отменить
        </Button>
        
        // Ghost
       <Button variant="ghost" size="lg">
          Назад
       </Button> */}


        {/* <Spinner size="lg" color="primary" /> */}
        <button className="text-indigo-500">
          <Spinner size="sm" /> Загрузка...
        </button>


        <div className="flex flex-col gap-3 items-start">
          <Badge variant="pending" />
          <Badge variant="confirmed" />
          <Badge variant="cancelled" />
          <Badge variant="inactive" />
          <Badge variant="rented" />
        </div>


        <Textarea
          label="Описание"
          placeholder="Расскажите о машине..."
          maxLength={500}
          showCount
          value={description}
          onChange={setDescription}
          required
        />

{/* // Текст отзыва
        <Textarea
          label="Ваш отзыв"
          placeholder="Поделитесь впечатлениями..."
          rows={6}
          maxLength={300}
          showCount
          value={review}
          onChange={setReview}
        /> 
        
        // С ошибкой
          <Textarea
            label="Описание"
            error="Описание обязательно"
            value={description}
            onChange={setDescription}
          />
        */}

        <Select
          label="Тип топлива"
          placeholder="Выберите топливо"
          options={[
            { value: 'petrol', label: 'Бензин' },
            { value: 'diesel', label: 'Дизель' },
            { value: 'electric', label: 'Электро' },
            { value: 'hybrid', label: 'Гибрид' },
          ]}
          value={fuel}
          onChange={setFuel}
          required
        />

        <Checkbox label="Бензин" checked={petrol} onChange={setPetrol} />
        <Checkbox label="Дизель" checked={diesel} onChange={setDiesel} />
        <Checkbox label="Электро" checked={electric} onChange={setElectric} />
        <Checkbox label="Гибрид" checked={hybrid} onChange={setHybrid} />

      {/* 
        Indeterminate
      <Checkbox label="Выбрать все" indeterminate />

      {/* Disabled 
      <Checkbox label="Электро" disabled /> */}

      </div>
    </div>
    </main>

  );
}



    
  

