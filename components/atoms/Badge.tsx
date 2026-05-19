import React from 'react';

type BadgeVariant =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'active'
  | 'completed'
  | 'inactive'
  | 'rented';

type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  label?: string;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  confirmed: 'bg-green-100 text-green-700 border border-green-200',
  active: 'bg-blue-100 text-blue-700 border border-blue-200',
  completed: 'bg-purple-100 text-purple-700 border border-purple-200',
  cancelled: 'bg-gray-100 text-gray-500 border border-gray-400',
  inactive: 'bg-gray-50 text-gray-500 border border-gray-400',
  rented: 'bg-blue-100 text-blue-700 border border-blue-200',
};

const defaultLabels: Record<BadgeVariant, string> = {
  pending: 'Ожидает',
  confirmed: 'Подтверждено',
  active: 'Активна',
  completed: 'Завершено',
  cancelled: 'Отменено',
  inactive: 'Неактивна',
  rented: 'Арендована',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5 min-w-[100px] justify-center',
  md: 'text-sm px-2.5 py-1 min-w-[130px] justify-center',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'pending',
  size = 'md',
  label,
  className = '',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center font-medium rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
    >
      {label ?? defaultLabels[variant]}
    </span>
  );
};

export default Badge;
