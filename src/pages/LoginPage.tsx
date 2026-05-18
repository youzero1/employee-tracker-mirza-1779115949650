import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Building2, Lock, Mail } from 'lucide-react';
import styles from '@/pages/LoginPage.module.css';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) setError('Invalid email. Use one of the demo accounts below.');
  };

  const demoAccounts = [
    { role: 'Admin', email: 'sarah@company.com' },
    { role: 'HR Manager', email: 'michael@company.com' },
    { role: 'Manager', email: 'james@company.com' },
    { role: 'Employee', email: 'emily@company.com' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <Building2 size={40} className={styles.logoIcon} />
          <h1 className={styles.title}>HR Management System</h1>
          <p className={styles.subtitle}>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrap}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrap}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Any password works (demo)"
              />
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>
        <div className={styles.demo}>
          <p className={styles.demoTitle}>Demo Accounts</p>
          <div className={styles.demoGrid}>
            {demoAccounts.map(acc => (
              <button key={acc.role} className={styles.demoBtn} onClick={() => { setEmail(acc.email); setPassword('demo'); setError(''); }}>
                <span className={styles.demoRole}>{acc.role}</span>
                <span className={styles.demoEmail}>{acc.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
