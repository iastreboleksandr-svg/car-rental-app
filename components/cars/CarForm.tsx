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

// Интерфейс начальных данных — все поля необязательные
// потому что при создании новой машины данных нет
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
  initialData?: CarFormData;  // если не передан — форма пустая (режим создания)
  mode?: 'new' | 'edit';      // влияет на текст кнопки и редирект
}

export function CarForm({ initialData, mode = 'new' }: CarFormProps) {
  const router = useRouter();

  // Инициализируем состояние из initialData если есть, иначе пустая строка
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
    // TODO: API вызов
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Photo */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Фото</p>
        <label className="w-full h-40 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors">
          {photo ? (
            <img src={photo} alt="Car" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <>
              <Camera size={24} className="text-blue-400" />
              <span className="text-sm text-blue-400">Загрузить фото</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </label>
      </div>

      {/* Main info */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Основное</p>

        <Input label="Марка" type="text" placeholder="Mercedes-Benz" value={make} onChange={setMake} required />
        <Input label="Модель" type="text" placeholder="S-Class" value={model} onChange={setModel} required />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-600">Год выпуска</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#48C964]/20 focus:border-[#48C964] transition-colors"
          >
            <option value="">Выберите год</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-600">Тип топлива</label>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#48C964]/20 focus:border-[#48C964] transition-colors"
          >
            <option value="">Выберите тип</option>
            {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-600">Коробка передач</label>
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#48C964]/20 focus:border-[#48C964] transition-colors"
          >
            <option value="">Выберите КПП</option>
            {TRANSMISSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Цена</p>
        <div className="flex gap-3">
          <Input label="Цена за день ($)" type="number" placeholder="50" value={pricePerDay} onChange={setPricePerDay} required />
          <Input label="Депозит ($)" type="number" placeholder="200" value={deposit} onChange={setDeposit} required />
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Описание</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Расскажите об автомобиле..."
          rows={4}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#48C964]/20 focus:border-[#48C964] transition-colors resize-none"
        />
        <Input label="Адрес" type="text" placeholder="Киев, ул. Крещатик 1" value={address} onChange={setAddress} />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {/* Текст кнопки зависит от режима */}
        <Button className="w-full" onClick={handleSubmit}>
          {mode === 'edit' ? 'Сохранить изменения' : 'Опубликовать'}
        </Button>
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors text-center"
        >
          Отмена
        </button>
      </div>

    </div>
  );
}