import { ReactNode } from 'react';
import styles from '@/components/ui/StatCard.module.css';

type StatCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  sub?: string;
};

export default function StatCard({ title, value, icon, color = 'primary', sub }: StatCardProps) {
  return (
    <div className={styles.card}>
      {icon && <div className={`${styles.icon} ${styles[color]}`}>{icon}</div>}
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        {sub && <div className={styles.sub}>{sub}</div>}
      </div>
    </div>
  );
}
