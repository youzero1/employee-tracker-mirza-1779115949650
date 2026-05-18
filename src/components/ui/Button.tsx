import { ReactNode } from 'react';
import styles from '@/components/ui/Button.module.css';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  children, variant = 'primary', size = 'md',
  onClick, type = 'button', disabled = false, fullWidth = false
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
