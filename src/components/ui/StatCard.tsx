import { ReactNode } from 'react';
import styles from '@/components/ui/StatCard.module.css';

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBg?: string;
  trend?: { value: string; up: boolean };
};

export default function StatCard({ title, value, subtitle, icon, iconBg, trend }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <p className={styles.value}>{value}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {trend && (
            <p className={`${styles.trend} ${trend.up ? styles.trendUp : styles.trendDown}`}>
              {trend.up ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={styles.iconWrap} style={iconBg ? { background: iconBg } : {}}>
          {icon}
        </div>
      </div>
    </div>
  );
}
