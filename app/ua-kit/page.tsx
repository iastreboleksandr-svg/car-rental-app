'use client';

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
import { useRouter } from 'next/navigation';

export default function UaKitPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [fuel, setFuel] = useState<string | null>(null);
  const [petrol, setPetrol] = useState(false);
  const [diesel, setDiesel] = useState(false);
  const [electric, setElectric] = useState(false);
  const [hybrid, setHybrid] = useState(false);
  const [payment, setPayment] = useState('');
  const [available, setAvailable] = useState(false);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col gap-6 w-80">

        <Avatar
          firstName="Анна"
          lastName="Петрова"
          size="md"
          onClick={() => router.push('/profile')}
        />

        <Avatar src="/ava.png" firstName="Анна" lastName="Петрова" size="md" />

        <StarRating value={4.5} showValue totalCount={1280} />

        <Input
          label="Email"
          type="email"
          leadingIcon={<Mail size={16} />}
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          required
        />

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

      </div>
    </div>
  );
}
