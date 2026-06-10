import { Phone, Check } from 'lucide-react';
import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import type { ProfileFormData, FormErrors } from './validateProfile';


interface ProfileEditModeProps {
  form: ProfileFormData;
  errors: FormErrors;
  onFieldChange: (field: keyof ProfileFormData) => (value: string) => void;
  onSave: () => void;
}

export function ProfileEditMode({ form, errors, onFieldChange, onSave }: ProfileEditModeProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Input
            label="Имя"
            value={form.firstName}
            onChange={onFieldChange('firstName')}
            placeholder="Иван"
            required
            error={errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          <Input
            label="Фамилия"
            value={form.lastName}
            onChange={onFieldChange('lastName')}
            placeholder="Петров"
            required
            error={errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
        </div>
        <Input
          label="Телефон"
          type="tel"
          leadingIcon={<Phone size={16} />}
          value={form.phone}
          onChange={onFieldChange('phone')}
          placeholder="+49 123 4567890"
          error={errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
      </div>

      <div className="mt-6">
        <Button className="w-full" leftIcon={<Check size={16} />} onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </>
  );
}