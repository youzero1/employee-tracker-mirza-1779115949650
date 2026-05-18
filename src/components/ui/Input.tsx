import styles from '@/components/ui/Input.module.css';

type InputProps = {
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  step?: string;
};

export default function Input({ type = 'text', value, onChange, placeholder, disabled, min, max, step }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      className={styles.input}
    />
  );
}
