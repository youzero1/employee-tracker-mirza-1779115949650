import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, DollarSign,
  BarChart2, Settings, ClipboardList, User,
  CalendarCheck, FileText, LogOut, Building2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/components/layout/Sidebar.module.css';

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} />, roles: ['admin', 'hr_manager', 'manager', 'employee'] },
  { label: 'Employees', path: '/employees', icon: <Users size={18} />, roles: ['admin', 'hr_manager', 'manager'] },
  { label: 'Leave Management', path: '/leave', icon: <Calendar size={18} />, roles: ['admin', 'hr_manager', 'manager'] },
  { label: 'Payroll', path: '/payroll', icon: <DollarSign size={18} />, roles: ['admin', 'hr_manager'] },
  { label: 'Reports', path: '/reports', icon: <BarChart2 size={18} />, roles: ['admin', 'hr_manager', 'manager'] },
  { label: 'My Profile', path: '/my-profile', icon: <User size={18} />, roles: ['employee', 'manager'] },
  { label: 'My Leave', path: '/my-leave', icon: <CalendarCheck size={18} />, roles: ['employee', 'manager'] },
  { label: 'My Payslips', path: '/my-payslips', icon: <FileText size={18} />, roles: ['employee', 'manager', 'hr_manager'] },
  { label: 'Audit Logs', path: '/audit-logs', icon: <ClipboardList size={18} />, roles: ['admin'] },
  { label: 'Settings', path: '/settings', icon: <Settings size={18} />, roles: ['admin'] },
];

export default function Sidebar() {
  const { currentUser, logout } = useAuth();

  const visibleItems = NAV_ITEMS.filter(item =>
    currentUser && item.roles.includes(currentUser.role)
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Building2 size={24} className={styles.logoIcon} />
        <span className={styles.logoText}>HR System</span>
      </div>
      <nav className={styles.nav}>
        {visibleItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.footer}>
        {currentUser && (
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{currentUser.name}</div>
              <div className={styles.userRole}>{currentUser.role.replace('_', ' ')}</div>
            </div>
          </div>
        )}
        <button className={styles.logoutBtn} onClick={logout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
