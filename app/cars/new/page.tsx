'use client';

import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Textarea } from '@/components/atoms/Textarea';
import { RadioButton } from '@/components/atoms/RadioButton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCarNewPage } from '@/hooks/useCarNewPage';
import { useTranslations } from 'next-intl';

export default function CarNewPage() {
  const t = useTranslations('car.new');
  const tCommon = useTranslations('common');
  const { form, handleChange, handleSubmit, isPending, error } = useCarNewPage();

  const FUEL_OPTIONS = [
    { value: 'petrol', label: t('fuel.petrol') },
    { value: 'diesel', label: t('fuel.diesel') },
    { value: 'electric', label: t('fuel.electric') },
    { value: 'hybrid', label: t('fuel.hybrid') },
  ];

  return (
    <div className="flex justify-center p-4 py-6">
      <div className="w-full max-w-lg flex flex-col gap-6">

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">{t('title')}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex gap-3">
            <Input label={t('brand')} placeholder="Toyota" value={form.brand} onChange={(v) => handleChange('brand', v)} required />
            <Input label={t('model')} placeholder="Camry" value={form.model} onChange={(v) => handleChange('model', v)} required />
          </div>

          <Input label={t('year')} type="number" value={String(form.year)} onChange={(v) => handleChange('year', Number(v))} required />

          <Select
            label={t('fuelType')}
            options={FUEL_OPTIONS}
            value={form.fuelType}
            onChange={(v) => handleChange('fuelType', v as typeof form.fuelType)}
            required
          />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">{t('transmission')}</p>
            <div className="flex gap-4">
              <RadioButton label={t('gearbox.automatic')} name="transmission" value="automatic" checked={form.transmission === 'automatic'} onChange={(v) => handleChange('transmission', v as typeof form.transmission)} />
              <RadioButton label={t('gearbox.manual')} name="transmission" value="manual" checked={form.transmission === 'manual'} onChange={(v) => handleChange('transmission', v as typeof form.transmission)} />
            </div>
          </div>

          <Input label={t('seats')} type="number" value={String(form.seats)} onChange={(v) => handleChange('seats', Number(v))} required />

          <div className="flex gap-3">
            <Input label={t('pricePerDay')} type="number" value={String(form.pricePerDay)} onChange={(v) => handleChange('pricePerDay', Number(v))} required />
            <Input label={t('deposit')} type="number" value={String(form.deposit)} onChange={(v) => handleChange('deposit', Number(v))} required />
          </div>

          <Input label={t('address')} placeholder="ул. Крещатик, 1, Киев" value={form.address} onChange={(v) => handleChange('address', v)} required />

          <div className="flex gap-3">
            <Input label={t('lat')} type="number" value={String(form.lat)} onChange={(v) => handleChange('lat', Number(v))} required />
            <Input label={t('lng')} type="number" value={String(form.lng)} onChange={(v) => handleChange('lng', Number(v))} required />
          </div>

          <Textarea label={t('description')} placeholder={t('descriptionPlaceholder')} value={form.description ?? ''} onChange={(v) => handleChange('description', v)} maxLength={500} showCount />

          {error && (
            <p className="text-sm text-red-500">
              {error instanceof Error ? error.message : tCommon('error')}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t('submitting') : t('submit')}
          </Button>

        </form>
      </div>
    </div>
  );
}
