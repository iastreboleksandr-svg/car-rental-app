import { Phone, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import type { ProfileFormData, FormErrors } from './validateProfile';

interface ProfileEditModeProps {
  form: ProfileFormData;
  errors: FormErrors;
  onFieldChange: (field: keyof ProfileFormData) => (value: string) => void;
  onSave: () => void;
  saving: boolean;
  saveLabel: string;
  savingLabel: string;
}

export function ProfileEditMode({
  form,
  errors,
  onFieldChange,
  onSave,
  saving,
  saveLabel,
  savingLabel,
}: ProfileEditModeProps) {
  const t = useTranslations('userProfile');

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Input
            label={t('firstName')}
            value={form.firstName}
            onChange={onFieldChange('firstName')}
            placeholder="Иван"
            required
            error={errors.firstName}
          />
          <Input
            label={t('lastName')}
            value={form.lastName}
            onChange={onFieldChange('lastName')}
            placeholder="Петров"
            required
            error={errors.lastName}
          />
        </div>
        <Input
          label={t('phone')}
          type="tel"
          leadingIcon={<Phone size={16} />}
          value={form.phone}
          onChange={onFieldChange('phone')}
          placeholder="+49 123 4567890"
          error={errors.phone}
        />
      </div>

      <div className="mt-6">
        <Button className="w-full" leftIcon={<Check size={16} />} onClick={onSave} disabled={saving}>
          {saving ? savingLabel : saveLabel}
        </Button>
      </div>
    </>
  );
}
