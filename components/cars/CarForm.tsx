'use client';

import { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FUEL_TYPES = ['Бензин', 'Дизель', 'Электро', 'Гибрид'];
const TRANSMISSION_TYPES = ['Автомат', 'Механика'];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i));

interface CarFormData {
  photo?: string;
  make?: string;
  model?: string;
  year?: string;
  fuel?: string;
  transmission?: string;
  pricePerDay?: string;
  deposit?: string;
  description?: string;
  address?: string;
}

interface CarFormProps {
  initialData?: CarFormData;
  mode?: 'new' | 'edit';
}

export function CarForm({ initialData, mode = 'new' }: CarFormProps) {
  const router = useRouter();

  const [photo, setPhoto] = useState<string | null>(initialData?.photo ?? null);
  const [make, setMake] = useState(initialData?.make ?? '');
  const [model, setModel] = useState(initialData?.model ?? '');
  const [year, setYear] = useState(initialData?.year ?? '');
  const [fuel, setFuel] = useState(initialData?.fuel ?? '');
  const [transmission, setTransmission] = useState(initialData?.transmission ?? '');
  const [pricePerDay, setPricePerDay] = useState(initialData?.pricePerDay ?? '');
  const [deposit, setDeposit] = useState(initialData?.deposit ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [address, setAddress] = useState(initialData?.address ?? '');

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    router.push('/dashboard');
  };

  const selectClass = 'w-full rounded-xl border border-border-default px-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-border-focus transition-colors bg-bg-card';

  return (
    <div className="flex flex-col gap-4">

      {/* Photo */}
      <div className="bg-bg-card rounded-2xl shadow-sm p-5">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">Фото</p>
        <label className="w-full h-40 rounded-xl border-2 border-dashed border-border-focus bg-brand-subtle flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-brand-subtle/70 transition-colors">
          {photo ? (
            <img src={photo} alt="Car" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <>
              <Camera size={24} className="text-brand" />
              <span className="text-sm text-brand">Загрузить фото</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </label>
      </div>

      {/* Main info */}
      <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Основное</p>

        <Input label="Марка" type="text" placeholder="Mercedes-Benz" value={make} onChange={setMake} required />
        <Input label="Модель" type="text" placeholder="S-Class" value={model} onChange={setModel} required />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="year" className="text-sm text-text-secondary">Год выпуска</label>
          <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
            <option value="">Выберите год</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="fuel" className="text-sm text-text-secondary">Тип топлива</label>
          <select id="fuel" value={fuel} onChange={(e) => setFuel(e.target.value)} className={selectClass}>
            <option value="">Выберите тип</option>
            {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="transmission" className="text-sm text-text-secondary">Коробка передач</label>
          <select id="transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)} className={selectClass}>
            <option value="">Выберите КПП</option>
            {TRANSMISSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Цена</p>
        <div className="flex gap-3">
          <Input label="Цена за день ($)" type="number" placeholder="50" value={pricePerDay} onChange={setPricePerDay} required />
          <Input label="Депозит ($)" type="number" placeholder="200" value={deposit} onChange={setDeposit} required />
        </div>
      </div>

      {/* Description */}
      <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Описание</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Расскажите об автомобиле..."
          rows={4}
          className="w-full rounded-xl border border-border-default px-3 py-2.5 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-border-focus transition-colors resize-none bg-bg-card"
        />
        <Input label="Адрес" type="text" placeholder="Киев, ул. Крещатик 1" value={address} onChange={setAddress} />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSubmit}>
          {mode === 'edit' ? 'Сохранить изменения' : 'Опубликовать'}
        </Button>
        <button
          onClick={() => router.back()}
          className="text-sm text-text-muted hover:text-text-secondary transition-colors text-center"
        >
          Отмена
        </button>
      </div>

    </div>
  );
}