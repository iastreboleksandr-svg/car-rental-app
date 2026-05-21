'use client';

import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Textarea } from '@/components/atoms/Textarea';
import { RadioButton } from '@/components/atoms/RadioButton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCarNewPage } from '@/hooks/useCarNewPage';

const FUEL_OPTIONS = [
  { value: 'petrol', label: 'Бензин' },
  { value: 'diesel', label: 'Дизель' },
  { value: 'electric', label: 'Электро' },
  { value: 'hybrid', label: 'Гибрид' },
];

export default function CarNewPage() {
  const { form, handleChange, handleSubmit, isPending, error } = useCarNewPage();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-6 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Новая машина
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Brand + Model */}
          <div className="flex gap-3">
            <Input
              label="Марка"
              placeholder="Toyota"
              value={form.brand}
              onChange={(v) => handleChange('brand', v)}
              required
            />
            <Input
              label="Модель"
              placeholder="Camry"
              value={form.model}
              onChange={(v) => handleChange('model', v)}
              required
            />
          </div>

          {/* Year */}
          <Input
            label="Год выпуска"
            type="number"
            value={String(form.year)}
            onChange={(v) => handleChange('year', Number(v))}
            required
          />

          {/* Fuel type */}
          <Select
            label="Тип топлива"
            options={FUEL_OPTIONS}
            value={form.fuelType}
            onChange={(v) => handleChange('fuelType', v as typeof form.fuelType)}
            required
          />

          {/* Transmission */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">Коробка передач</p>
            <div className="flex gap-4">
              <RadioButton
                label="Автомат"
                name="transmission"
                value="automatic"
                checked={form.transmission === 'automatic'}
                onChange={(v) => handleChange('transmission', v as typeof form.transmission)}
              />
              <RadioButton
                label="Механика"
                name="transmission"
                value="manual"
                checked={form.transmission === 'manual'}
                onChange={(v) => handleChange('transmission', v as typeof form.transmission)}
              />
            </div>
          </div>

          {/* Price + Deposit */}
          <div className="flex gap-3">
            <Input
              label="Цена/день ($)"
              type="number"
              value={String(form.pricePerDay)}
              onChange={(v) => handleChange('pricePerDay', Number(v))}
              required
            />
            <Input
              label="Депозит ($)"
              type="number"
              value={String(form.deposit)}
              onChange={(v) => handleChange('deposit', Number(v))}
              required
            />
          </div>

          {/* Address */}
          <Input
            label="Адрес"
            placeholder="ул. Крещатик, 1, Киев"
            value={form.address}
            onChange={(v) => handleChange('address', v)}
            required
          />

          {/* Lat + Lng */}
          <div className="flex gap-3">
            <Input
              label="Широта (lat)"
              type="number"
              value={String(form.lat)}
              onChange={(v) => handleChange('lat', Number(v))}
              required
            />
            <Input
              label="Долгота (lng)"
              type="number"
              value={String(form.lng)}
              onChange={(v) => handleChange('lng', Number(v))}
              required
            />
          </div>

          {/* Description */}
          <Textarea
            label="Описание"
            placeholder="Расскажите о машине..."
            value={form.description ?? ''}
            onChange={(v) => handleChange('description', v)}
            maxLength={500}
            showCount
          />

          {error && (
            <p className="text-sm text-red-500">
              {error instanceof Error ? error.message : 'Что-то пошло не так'}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Сохранение...' : 'Создать машину'}
          </Button>

        </form>
      </div>
    </div>
  );
}
