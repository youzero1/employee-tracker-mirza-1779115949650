import { ReactNode } from 'react';
import styles from '@/components/ui/FormField.module.css';

type FormFieldProps = {
  label: string;
  children: ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
};

export default function FormField({ label, children, required, error, hint }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}{required && <span className={styles.required}> *</span>}
      </label>
      {children}
      {hint && <p className={styles.hint}>{hint}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
