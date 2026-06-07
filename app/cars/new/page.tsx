'use client';

import { useState } from 'react';
import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Textarea } from '@/components/atoms/Textarea';
import { RadioButton } from '@/components/atoms/RadioButton';
import { ArrowLeft, Camera } from 'lucide-react';
import Link from 'next/link';
import { useCarNewPage } from '@/hooks/useCarNewPage';
import { useTranslations } from 'next-intl';

export default function CarNewPage() {
  const t = useTranslations('car.new');
  const tCommon = useTranslations('common');
  const { form, handleChange, handleSubmit, isPending, error } = useCarNewPage();
  const [photo, setPhoto] = useState<string | null>(null);

  const FUEL_OPTIONS = [
    { value: 'petrol', label: t('fuel.petrol') },
    { value: 'diesel', label: t('fuel.diesel') },
    { value: 'electric', label: t('fuel.electric') },
    { value: 'hybrid', label: t('fuel.hybrid') },
  ];

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-4">

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-border-default text-text-muted hover:border-text-muted hover:text-text-secondary transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <p className="text-xs font-semibold text-text-muted tracking-widest uppercase">{t('title')}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="bg-bg-card rounded-2xl shadow-sm p-5">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">{t('sectionPhoto')}</p>
          <label className="w-full h-40 rounded-xl border-2 border-dashed border-border-focus bg-brand-subtle flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-brand-subtle/70 transition-colors overflow-hidden">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="Car" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <>
                <Camera size={24} className="text-brand" />
                <span className="text-sm text-brand">{t('uploadPhoto')}</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </label>
        </div>

        <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">{t('sectionMain')}</p>

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
            <p className="text-sm font-medium text-text-secondary">{t('transmission')}</p>
            <div className="flex gap-4">
              <RadioButton label={t('gearbox.automatic')} name="transmission" value="automatic" checked={form.transmission === 'automatic'} onChange={(v) => handleChange('transmission', v as typeof form.transmission)} />
              <RadioButton label={t('gearbox.manual')} name="transmission" value="manual" checked={form.transmission === 'manual'} onChange={(v) => handleChange('transmission', v as typeof form.transmission)} />
            </div>
          </div>

          <Input label={t('seats')} type="number" value={String(form.seats)} onChange={(v) => handleChange('seats', Number(v))} required />
        </div>

        <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">{t('sectionPricing')}</p>
          <div className="flex gap-3">
            <Input label={t('pricePerDay')} type="number" value={String(form.pricePerDay)} onChange={(v) => handleChange('pricePerDay', Number(v))} required />
            <Input label={t('deposit')} type="number" value={String(form.deposit)} onChange={(v) => handleChange('deposit', Number(v))} required />
          </div>
        </div>

        <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">{t('sectionLocation')}</p>
          <Input label={t('address')} placeholder="ул. Крещатик, 1, Киев" value={form.address} onChange={(v) => handleChange('address', v)} required />
          <div className="flex gap-3">
            <Input label={t('lat')} type="number" value={String(form.lat)} onChange={(v) => handleChange('lat', Number(v))} required />
            <Input label={t('lng')} type="number" value={String(form.lng)} onChange={(v) => handleChange('lng', Number(v))} required />
          </div>
        </div>

        <div className="bg-bg-card rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">{t('sectionDescription')}</p>
          <Textarea placeholder={t('descriptionPlaceholder')} value={form.description ?? ''} onChange={(v) => handleChange('description', v)} maxLength={500} showCount />
        </div>

        {error && (
          <p className="text-sm text-text-error">
            {error instanceof Error ? error.message : tCommon('error')}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t('submitting') : t('submit')}
          </Button>
          <Link href="/dashboard" className="text-sm text-text-muted hover:text-text-secondary transition-colors text-center">
            {t('cancel')}
          </Link>
        </div>

      </form>
    </div>
  );
}
