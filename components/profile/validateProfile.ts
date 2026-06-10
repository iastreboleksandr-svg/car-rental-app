export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export function validateForm(form: ProfileFormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.firstName.trim()) errors.firstName = 'Введите имя';
  if (!form.lastName.trim()) errors.lastName = 'Введите фамилию';
  if (form.phone && !/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
    errors.phone = 'Введите корректный номер телефона, например +49 123 4567890';
  }
  return errors;
}