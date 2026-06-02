'use client';

import { Input } from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { Camera, Phone } from 'lucide-react';
import { useProfileSetupPage } from '@/hooks/useProfileSetupPage';
import { useTranslations } from 'next-intl';

export default function ProfileSetupPage() {
  const t = useTranslations('profile.setup');
  const {
    firstName, setFirstName,
    lastName, setLastName,
    phone, setPhone,
    avatar,
    fileInputRef,
    openFilePicker,
    handleAvatarChange,
    handleContinue,
    handleSkip,
  } = useProfileSetupPage();

  return (
    <div className="flex justify-center p-4 py-6">
      <div className="w-full max-w-md flex flex-col gap-6">
        <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">{t('title')}</p>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={openFilePicker}
            className="w-24 h-24 rounded-full border-2 border-dashed border-[#48C964]/50 bg-[#48C964]/10 flex flex-col items-center justify-center text-[#48C964] hover:bg-[#48C964]/20 transition-colors"
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <>
                <Camera size={24} />
                <span className="text-xs mt-1">{t('photo')}</span>
              </>
            )}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Input label={t('firstName')} type="text" placeholder="Иван" value={firstName} onChange={setFirstName} required />
            <Input label={t('lastName')} type="text" placeholder="Петров" value={lastName} onChange={setLastName} required />
          </div>
          <Input label={t('phone')} type="tel" leadingIcon={<Phone size={16} />} placeholder="+380..." value={phone} onChange={setPhone} />
        </div>

        <hr className="border-gray-100" />

        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleContinue}>{t('continue')}</Button>
          <Button variant="ghost" size="sm" className="w-full text-gray-400" onClick={handleSkip}>{t('skip')}</Button>
        </div>
      </div>
    </div>
  );
}
