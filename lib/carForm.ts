import type { CreateCarDto, FuelType, Transmission } from '@/types/car';


export const BRAND_SUGGESTIONS = [
  'Toyota',
  'BMW',
  'Mercedes',
  'Volkswagen',
  'Honda',
  'Hyundai',
  'Kia',
  'Audi',
  'Ford',
  'Renault',
] as const;

export const YEAR_MIN = 1990;
export const YEAR_MAX = new Date().getFullYear();

export const SEATS_MIN = 2;
export const SEATS_MAX = 9;

export const DESCRIPTION_MAX = 1000;

export const FUEL_TYPES: FuelType[] = ['petrol', 'diesel', 'electric', 'hybrid'];
export const TRANSMISSIONS: Transmission[] = ['manual', 'automatic'];

export const PHOTO_ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const PHOTO_MAX_BYTES = 5 * 1024 * 1024; // 5MB


export type CarFormValues = CreateCarDto;

export const EMPTY_CAR_FORM: CarFormValues = {
  brand: '',
  model: '',
  year: YEAR_MAX,
  fuelType: 'petrol',
  transmission: 'automatic',
  seats: 5,
  description: '',
  pricePerDay: 0,
  deposit: 0,
  lat: 0,
  lng: 0,
  address: '',
};

export type CarFormField =
  | 'brand'
  | 'model'
  | 'year'
  | 'seats'
  | 'pricePerDay'
  | 'deposit'
  | 'address'
  | 'description'
  | 'photos';

export type CarFormErrors = Partial<Record<CarFormField, string>>;


export function validateField(
  field: CarFormField,
  values: CarFormValues,
  photoCount: number,
): string | null {
  switch (field) {
    case 'brand':
      return values.brand.trim() ? null : 'required';
    case 'model':
      return values.model.trim() ? null : 'required';
    case 'year':
      if (!Number.isFinite(values.year)) return 'required';
      return values.year >= YEAR_MIN && values.year <= YEAR_MAX ? null : 'yearRange';
    case 'seats':
      if (!Number.isFinite(values.seats)) return 'required';
      return values.seats >= SEATS_MIN && values.seats <= SEATS_MAX ? null : 'seatsRange';
    case 'pricePerDay':
      if (!Number.isFinite(values.pricePerDay)) return 'required';
      return values.pricePerDay > 0 ? null : 'pricePositive';
    case 'deposit':
      if (!Number.isFinite(values.deposit)) return 'required';
      return values.deposit >= 0 ? null : 'depositNonNegative';
    case 'address':
      return values.address.trim() ? null : 'required';
    case 'description':
      return (values.description?.length ?? 0) <= DESCRIPTION_MAX ? null : 'descriptionMax';
    case 'photos':
      return photoCount >= 1 ? null : 'photoRequired';
    default:
      return null;
  }
}

const ALL_FIELDS: CarFormField[] = [
  'brand',
  'model',
  'year',
  'seats',
  'pricePerDay',
  'deposit',
  'address',
  'description',
  'photos',
];

export function validateCarForm(values: CarFormValues, photoCount: number): CarFormErrors {
  const errors: CarFormErrors = {};
  for (const field of ALL_FIELDS) {
    const code = validateField(field, values, photoCount);
    if (code) errors[field] = code;
  }
  return errors;
}

export function validatePhotoFile(file: File): string | null {
  if (!PHOTO_ACCEPTED_TYPES.includes(file.type)) return 'photoType';
  if (file.size > PHOTO_MAX_BYTES) return 'photoSize';
  return null;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
