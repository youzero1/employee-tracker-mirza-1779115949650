import { ReactNode } from 'react';
import styles from '@/components/ui/Table.module.css';

type TableProps = {
  headers: string[];
  rows: (ReactNode | string | number)[][];
  onRowClick?: (index: number) => void;
  emptyMessage?: string;
};

export default function Table({ headers, rows, onRowClick, emptyMessage = 'No data found.' }: TableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={`${styles.table} ${onRowClick ? styles.clickable : ''}`}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className={styles.empty}>{emptyMessage}</td></tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} onClick={onRowClick ? () => onRowClick(i) : undefined}>
                {row.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
