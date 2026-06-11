'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import RadioButton from '@/components/atoms/RadioButton';
import Spinner from '@/components/atoms/Spinner';
import { Toast } from '@/components/common/Toast';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { BrandAutocomplete } from '@/components/cars/BrandAutocomplete';
import { CarPhotoUploader } from '@/components/cars/CarPhotoUploader';
import { LocationPicker } from '@/components/atoms/map/LocationPicker';
import { useCarForm, type CarFormMode } from '@/hooks/useCarForm';
import { DESCRIPTION_MAX, FUEL_TYPES, TRANSMISSIONS } from '@/lib/carForm';
import type { FuelType, Transmission } from '@/types/car';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border-default bg-bg-card p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">{title}</p>
      {children}
    </div>
  );
}

interface CarFormProps {
  mode: CarFormMode;
  carId?: string;
}

export function CarForm({ mode, carId }: CarFormProps) {
  const t = useTranslations('car.form');
  const tCommon = useTranslations('common');
  const {
    form,
    errors,
    setField,
    blurField,
    newPhotos,
    existingPhotos,
    photoError,
    addFiles,
    removeNewPhoto,
    removeExistingPhoto,
    isLoadingCar,
    isSubmitting,
    formError,
    feedback,
    clearFeedback,
    submit,
    requestCancel,
    showCancelConfirm,
    confirmCancel,
    dismissCancel,
    car,
  } = useCarForm(mode, carId);

  const err = (field: keyof typeof errors) =>
    errors[field] ? t(`errors.${errors[field]}`) : undefined;

  if (isLoadingCar) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-text-muted">
        <Spinner size="sm" /> {tCommon('loading')}
      </div>
    );
  }

  const title =
    mode === 'edit'
      ? car
        ? `${car.brand} ${car.model}`
        : t('titleEdit')
      : t('titleCreate');

  const submitLabel = isSubmitting
    ? t('saving')
    : mode === 'edit'
      ? t('update')
      : t('create');

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={requestCancel}
          aria-label={tCommon('back')}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default text-text-muted transition-colors hover:border-text-muted hover:text-text-secondary"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-semibold text-text-base">{title}</h1>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <Section title={t('sectionPhoto')}>
          <CarPhotoUploader
            newPhotos={newPhotos}
            existingPhotos={existingPhotos}
            onAddFiles={addFiles}
            onRemoveNew={removeNewPhoto}
            onRemoveExisting={removeExistingPhoto}
            disabled={isSubmitting}
            error={err('photos')}
            fileError={photoError ? t(`errors.${photoError}`) : undefined}
            labels={{
              drop: t('photoDrop'),
              formats: t('photoFormats'),
              remove: t('photoRemove'),
            }}
          />
        </Section>

        <Section title={t('sectionBasic')}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <BrandAutocomplete
              label={t('brand')}
              value={form.brand}
              onChange={(v) => setField('brand', v)}
              onBlur={() => blurField('brand')}
              placeholder="Toyota"
              error={err('brand')}
              disabled={isSubmitting}
              required
            />
            <Input
              label={t('model')}
              value={form.model}
              onChange={(v) => setField('model', v)}
              onBlur={() => blurField('model')}
              placeholder="Camry"
              error={err('model')}
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              label={t('year')}
              type="number"
              value={String(form.year)}
              onChange={(v) => setField('year', Number(v))}
              onBlur={() => blurField('year')}
              error={err('year')}
              disabled={isSubmitting}
              required
            />
            <Input
              label={t('seats')}
              type="number"
              value={String(form.seats)}
              onChange={(v) => setField('seats', Number(v))}
              onBlur={() => blurField('seats')}
              error={err('seats')}
              disabled={isSubmitting}
              required
            />
          </div>
        </Section>

        <Section title={t('sectionTechnical')}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-text-secondary">{t('fuelType')}</p>
            <div className="flex flex-wrap gap-4">
              {FUEL_TYPES.map((ft) => (
                <RadioButton
                  key={ft}
                  name="fuelType"
                  value={ft}
                  checked={form.fuelType === ft}
                  onChange={(v) => setField('fuelType', v as FuelType)}
                  label={t(`fuel.${ft}`)}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-text-secondary">{t('transmission')}</p>
            <div className="flex flex-wrap gap-4">
              {TRANSMISSIONS.map((tr) => (
                <RadioButton
                  key={tr}
                  name="transmission"
                  value={tr}
                  checked={form.transmission === tr}
                  onChange={(v) => setField('transmission', v as Transmission)}
                  label={t(`gearbox.${tr}`)}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section title={t('sectionPricing')}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              label={t('pricePerDay')}
              type="number"
              value={String(form.pricePerDay)}
              onChange={(v) => setField('pricePerDay', Number(v))}
              onBlur={() => blurField('pricePerDay')}
              leadingIcon={<span className="text-sm">$</span>}
              error={err('pricePerDay')}
              disabled={isSubmitting}
              required
            />
            <Input
              label={t('deposit')}
              type="number"
              value={String(form.deposit)}
              onChange={(v) => setField('deposit', Number(v))}
              onBlur={() => blurField('deposit')}
              leadingIcon={<span className="text-sm">$</span>}
              error={err('deposit')}
              disabled={isSubmitting}
              required
            />
          </div>
        </Section>

        <Section title={t('sectionLocation')}>
          <Input
            label={t('address')}
            value={form.address}
            onChange={(v) => setField('address', v)}
            onBlur={() => blurField('address')}
            placeholder={t('addressPlaceholder')}
            error={err('address')}
            disabled={isSubmitting}
            required
          />
          <LocationPicker
            label={t('pickLocation')}
            hint={t('pickLocationHint')}
            lat={form.lat}
            lng={form.lng}
            onChange={(lat, lng) => {
              setField('lat', lat);
              setField('lng', lng);
            }}
          />
        </Section>

        <Section title={t('sectionDescription')}>
          <Textarea
            value={form.description ?? ''}
            onChange={(v) => setField('description', v)}
            onBlur={() => blurField('description')}
            placeholder={t('descriptionPlaceholder')}
            maxLength={DESCRIPTION_MAX}
            showCount
            error={err('description')}
            disabled={isSubmitting}
          />
        </Section>

        {formError && (
          <p className="rounded-lg border border-border-error bg-bg-error px-3 py-2 text-sm text-text-error">
            {formError}
          </p>
        )}

        <div className="flex flex-col gap-2 sm:flex-row-reverse">
          <Button type="submit" className="sm:flex-1" loading={isSubmitting}>
            {submitLabel}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="sm:flex-1"
            onClick={requestCancel}
            disabled={isSubmitting}
          >
            {t('cancel')}
          </Button>
        </div>
      </form>

      {feedback && (
        <Toast type={feedback.type} message={t(feedback.key)} onClose={clearFeedback} />
      )}

      <ConfirmDialog
        open={showCancelConfirm}
        title={t('discardTitle')}
        description={t('discardBody')}
        confirmLabel={t('discardConfirm')}
        cancelLabel={t('discardCancel')}
        variant="danger"
        onConfirm={confirmCancel}
        onCancel={dismissCancel}
      />
    </div>
  );
}

export default CarForm;
