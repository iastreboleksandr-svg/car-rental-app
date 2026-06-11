import { User, Mail, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { InfoRow } from './InfoRow';
import type { ProfileFormData } from './validateProfile';

interface ProfileViewModeProps {
  form: ProfileFormData;
  email: string;
}

export function ProfileViewMode({ form, email }: ProfileViewModeProps) {
  const t = useTranslations('userProfile');

  return (
    <div className="flex flex-col gap-3">
      <InfoRow
        icon={<User size={16} />}
        label={t('name')}
        value={`${form.firstName} ${form.lastName}`.trim() || '—'}
      />
      <InfoRow icon={<Mail size={16} />} label={t('email')} value={email} />
      <InfoRow icon={<Phone size={16} />} label={t('phone')} value={form.phone || '—'} />
    </div>
  );
}
