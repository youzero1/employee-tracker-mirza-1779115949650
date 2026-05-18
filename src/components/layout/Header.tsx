import { useState } from 'react';
import { Bell, ChevronDown, UserCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/types';
import styles from '@/components/layout/Header.module.css';

const ROLE_LABELS: Record<Role, string> = {
  admin: 'Admin',
  hr_manager: 'HR Manager',
  manager: 'Manager',
  employee: 'Employee',
};

const DEMO_USERS: { label: string; role: Role }[] = [
  { label: 'Sarah Johnson (Admin)', role: 'admin' },
  { label: 'Michael Chen (HR Manager)', role: 'hr_manager' },
  { label: 'James Wilson (Manager)', role: 'manager' },
  { label: 'Emily Davis (Employee)', role: 'employee' },
];

export default function Header() {
  const { currentUser, switchRole } = useAuth();
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.pageTitle}>HR Management System</h1>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <Bell size={18} />
          <span className={styles.badge}>3</span>
        </button>
        <div className={styles.roleSwitch}>
          <button
            className={styles.roleSwitchBtn}
            onClick={() => setShowRoleSwitch(!showRoleSwitch)}
          >
            <UserCheck size={16} />
            <span>Demo: {currentUser ? ROLE_LABELS[currentUser.role] : 'None'}</span>
            <ChevronDown size={14} />
          </button>
          {showRoleSwitch && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownTitle}>Switch Demo Role</div>
              {DEMO_USERS.map(u => (
                <button
                  key={u.role}
                  className={`${styles.dropdownItem} ${currentUser?.role === u.role ? styles.activeRole : ''}`}
                  onClick={() => { switchRole(u.role); setShowRoleSwitch(false); }}
                >
                  {u.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
