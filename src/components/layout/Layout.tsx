import { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import styles from '@/components/layout/Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
