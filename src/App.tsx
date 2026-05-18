import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { HRProvider } from '@/context/HRContext';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from '@/pages/LoginPage';
import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/DashboardPage';
import EmployeesPage from '@/pages/EmployeesPage';
import EmployeeDetailPage from '@/pages/EmployeeDetailPage';
import LeavePage from '@/pages/LeavePage';
import PayrollPage from '@/pages/PayrollPage';
import ReportsPage from '@/pages/ReportsPage';
import SettingsPage from '@/pages/SettingsPage';
import AuditLogsPage from '@/pages/AuditLogsPage';
import MyProfilePage from '@/pages/MyProfilePage';
import MyLeavePage from '@/pages/MyLeavePage';
import MyPayslipsPage from '@/pages/MyPayslipsPage';

function ProtectedRoutes() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="/payroll" element={<PayrollPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/audit-logs" element={<AuditLogsPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/my-leave" element={<MyLeavePage />} />
        <Route path="/my-payslips" element={<MyPayslipsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HRProvider>
          <AppRoutes />
        </HRProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
