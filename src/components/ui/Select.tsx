import styles from '@/components/ui/Select.module.css';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
};

export default function Select({ value, onChange, options, placeholder, disabled }: SelectProps) {
  return (
    <select value={value} onChange={onChange} disabled={disabled} className={styles.select}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
