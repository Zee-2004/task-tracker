import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const VARIANT_CLASSES: Record<string, string> = {
  primary: 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

export default function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const classes = 'px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + VARIANT_CLASSES[variant] + ' ' + className;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}