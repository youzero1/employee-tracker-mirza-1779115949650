import { ReactNode } from 'react';
import styles from '@/components/ui/Card.module.css';

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
};

export default function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[padding]} ${className || ''}`}>
      {children}
    </div>
  );
}
