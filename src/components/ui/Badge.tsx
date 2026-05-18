import styles from '@/components/ui/Badge.module.css';

type BadgeProps = {
  label: string;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary';
};

export default function Badge({ label, variant = 'secondary' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {label}
    </span>
  );
}
