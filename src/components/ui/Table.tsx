import { ReactNode } from 'react';
import styles from '@/components/ui/Table.module.css';

type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
};

export default function Table<T extends Record<string, unknown>>({ columns, data, emptyMessage = 'No data available' }: TableProps<T>) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={styles.th}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>{emptyMessage}</td>
            </tr>
          ) : data.map((row, i) => (
            <tr key={i} className={styles.tr}>
              {columns.map(col => (
                <td key={col.key} className={styles.td}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
