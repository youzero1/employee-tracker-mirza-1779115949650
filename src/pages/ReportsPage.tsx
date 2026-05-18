import { useHR } from '@/context/HRContext';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed', '#0891b2'];

export default function ReportsPage() {
  const { employees, leaveRequests, payrollRecords } = useHR();

  const deptCount: Record<string, number> = {};
  employees.forEach(e => { deptCount[e.department] = (deptCount[e.department] || 0) + 1; });
  const deptData = Object.entries(deptCount).map(([name, value]) => ({ name, value }));

  const leaveByType: Record<string, number> = {};
  leaveRequests.forEach(l => { leaveByType[l.type] = (leaveByType[l.type] || 0) + 1; });
  const leaveData = Object.entries(leaveByType).map(([name, value]) => ({ name, value }));

  const payByDept: Record<string, number> = {};
  employees.forEach(e => { payByDept[e.department] = (payByDept[e.department] || 0) + e.salary; });
  const payData = Object.entries(payByDept).map(([name, value]) => ({ name, total: Math.round(value / 1000) }));

  const activeCount = employees.filter(e => e.status === 'active').length;
  const pendingLeave = leaveRequests.filter(l => l.status === 'pending').length;
  const totalPayroll = payrollRecords.filter(p => p.status === 'paid').reduce((s, p) => s + p.netPay, 0);
  const avgSalary = employees.length > 0 ? Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length) : 0;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Reports & Analytics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard title="Active Employees" value={String(activeCount)} icon={<Users size={22} />} color="primary" />
        <StatCard title="Pending Leave" value={String(pendingLeave)} icon={<Calendar size={22} />} color="warning" />
        <StatCard title="Total Payroll Paid" value={`$${totalPayroll.toLocaleString()}`} icon={<DollarSign size={22} />} color="success" />
        <StatCard title="Avg Salary" value={`$${avgSalary.toLocaleString()}`} icon={<TrendingUp size={22} />} color="info" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <Card>
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Employees by Department</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Leave by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={leaveData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {leaveData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card>
        <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Salary Distribution by Department (in $K)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={payData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
