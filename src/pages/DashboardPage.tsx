import { useMemo } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useHR } from '@/context/HRContext';
import { useAuth } from '@/hooks/useAuth';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import styles from '@/pages/DashboardPage.module.css';

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed'];

export default function DashboardPage() {
  const { employees, departments, leaveRequests, payrollRuns, leaveTypes } = useHR();
  const { currentUser } = useAuth();

  const isAdminOrHR = currentUser?.role === 'admin' || currentUser?.role === 'hr_manager';

  const headcountByDept = useMemo(() => {
    return departments.map(d => ({
      name: d.name.length > 10 ? d.name.slice(0, 10) + '..' : d.name,
      count: employees.filter(e => e.departmentId === d.id && e.employmentStatus === 'active').length,
    }));
  }, [departments, employees]);

  const statusDist = useMemo(() => {
    const map: Record<string, number> = {};
    employees.forEach(e => { map[e.employmentStatus] = (map[e.employmentStatus] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [employees]);

  const leaveStats = useMemo(() => {
    const pending = leaveRequests.filter(r => r.status === 'pending').length;
    const approved = leaveRequests.filter(r => r.status === 'approved').length;
    return { pending, approved };
  }, [leaveRequests]);

  const latestPayroll = payrollRuns.find(p => p.status === 'paid');
  const activeEmployees = employees.filter(e => e.employmentStatus === 'active').length;

  const recentLeaveRequests = leaveRequests
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const leaveUsageData = useMemo(() => {
    return leaveTypes.map(lt => {
      const reqs = leaveRequests.filter(r => r.leaveTypeId === lt.id && r.status === 'approved');
      const totalDays = reqs.reduce((sum, r) => sum + r.days, 0);
      return { name: lt.name.split(' ')[0], days: totalDays, color: lt.color };
    });
  }, [leaveTypes, leaveRequests]);

  const getStatusBadge = (status: string) => {
    if (status === 'approved') return <Badge label="Approved" variant="success" />;
    if (status === 'pending') return <Badge label="Pending" variant="warning" />;
    if (status === 'rejected') return <Badge label="Rejected" variant="danger" />;
    return <Badge label={status} variant="secondary" />;
  };

  const getEmployeeName = (empId: string) => {
    const emp = employees.find(e => e.id === empId);
    return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
  };

  const getLeaveTypeName = (ltId: string) => {
    const lt = leaveTypes.find(l => l.id === ltId);
    return lt ? lt.name : 'Unknown';
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Dashboard</h2>
        <p className={styles.pageSubtitle}>Welcome back, {currentUser?.name}</p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          title="Total Employees"
          value={activeEmployees}
          subtitle="Active employees"
          icon={<Users size={22} />}
          iconBg="var(--color-primary-light)"
          trend={{ value: '+2 this month', up: true }}
        />
        {isAdminOrHR && (
          <StatCard
            title="Pending Leave"
            value={leaveStats.pending}
            subtitle="Requests awaiting approval"
            icon={<Clock size={22} />}
            iconBg="var(--color-warning-light)"
          />
        )}
        {isAdminOrHR && latestPayroll && (
          <StatCard
            title="Last Payroll"
            value={formatCurrency(latestPayroll.totalNet)}
            subtitle={latestPayroll.period}
            icon={<DollarSign size={22} />}
            iconBg="var(--color-success-light)"
          />
        )}
        <StatCard
          title="Approved Leaves"
          value={leaveStats.approved}
          subtitle="This period"
          icon={<CheckCircle size={22} />}
          iconBg="var(--color-info-light)"
        />
        {isAdminOrHR && (
          <StatCard
            title="Departments"
            value={departments.length}
            subtitle="Active departments"
            icon={<TrendingUp size={22} />}
            iconBg="var(--color-primary-light)"
          />
        )}
        <StatCard
          title="On Leave"
          value={employees.filter(e => e.employmentStatus === 'on_leave').length}
          subtitle="Currently on leave"
          icon={<Calendar size={22} />}
          iconBg="var(--color-warning-light)"
        />
      </div>

      {isAdminOrHR && (
        <div className={styles.chartsGrid}>
          <Card>
            <h3 className={styles.chartTitle}>Headcount by Department</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={headcountByDept} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className={styles.chartTitle}>Employee Status Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusDist.map((_entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className={styles.chartTitle}>Leave Usage by Type</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={leaveUsageData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="days" radius={[4, 4, 0, 0]}>
                  {leaveUsageData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      <Card>
        <h3 className={styles.chartTitle}>Recent Leave Requests</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Dates</th>
              <th>Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentLeaveRequests.map(req => (
              <tr key={req.id}>
                <td>{getEmployeeName(req.employeeId)}</td>
                <td>{getLeaveTypeName(req.leaveTypeId)}</td>
                <td>{formatDate(req.startDate)} – {formatDate(req.endDate)}</td>
                <td>{req.days} days</td>
                <td>{getStatusBadge(req.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
