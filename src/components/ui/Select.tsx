import styles from '@/components/ui/Select.module.css';

type SelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
};

export default function Select({ value, onChange, options, disabled }: SelectProps) {
  return (
    <select value={value} onChange={onChange} disabled={disabled} className={styles.select}>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
