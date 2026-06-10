import { User, Mail, Phone } from 'lucide-react';
import { InfoRow } from './InfoRow';
import type { ProfileFormData } from './validateProfile';

interface ProfileViewModeProps {
  form: ProfileFormData;
  email: string;
}

export function ProfileViewMode({ form, email }: ProfileViewModeProps) {
  return (
    <div className="flex flex-col gap-3">
      <InfoRow
        icon={<User size={16} />}
        label="Имя"
        value={`${form.firstName} ${form.lastName}`.trim() || '—'}
      />
      <InfoRow icon={<Mail size={16} />} label="Email" value={email} />
      <InfoRow icon={<Phone size={16} />} label="Телефон" value={form.phone || '—'} />
    </div>
  );
}
