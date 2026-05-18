import { useHR } from '@/context/HRContext';
import Card from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0891b2'];

export default function ReportsPage() {
  const { employees, leaveRequests, payrollRecords, departments } = useHR();

  // Department headcount
  const deptCount: Record<string, number> = {};
  employees.forEach(e => {
    const key = e.departmentId;
    deptCount[key] = (deptCount[key] || 0) + 1;
  });
  const deptData = Object.entries(deptCount).map(([id, count]) => {
    const dept = departments.find(d => d.id === id);
    return { name: dept ? dept.name : id, count };
  });

  // Leave by type
  const leaveByType: Record<string, number> = {};
  leaveRequests.forEach(l => {
    const key = (l as any).type ?? l.leaveType ?? 'Other';
    leaveByType[key] = (leaveByType[key] || 0) + 1;
  });
  const leaveData = Object.entries(leaveByType).map(([name, value]) => ({ name, value }));

  // Payroll by department
  const payByDept: Record<string, number> = {};
  employees.forEach(e => {
    const key = e.departmentId;
    const salary = (e as any).salary ?? e.baseSalary ?? 0;
    payByDept[key] = (payByDept[key] || 0) + salary;
  });
  const payData = Object.entries(payByDept).map(([id, total]) => {
    const dept = departments.find(d => d.id === id);
    return { name: dept ? dept.name : id, total };
  });

  // Summary stats
  const activeCount = employees.filter(e => (e as any).status === 'active' || e.employmentStatus === 'active').length;
  const totalPayroll = payrollRecords
    .filter(p => (p as any).status === 'paid' || true)
    .reduce((s, p) => s + (p.netPay ?? 0), 0);
  const avgSalaryRaw = employees.reduce((s, e) => s + ((e as any).salary ?? e.baseSalary ?? 0), 0);
  const avgSalary = employees.length > 0 ? Math.round(avgSalaryRaw / employees.length) : 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Reports & Analytics</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
        <Card>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Active Employees</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{activeCount}</div>
        </Card>
        <Card>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Total Payroll (Net)</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>${totalPayroll.toLocaleString()}</div>
        </Card>
        <Card>
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Avg. Salary</div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>${avgSalary.toLocaleString()}</div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Headcount by Department</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deptData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Leave Requests by Type</h3>
          <ResponsiveContainer width="100%" height={260}>
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
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Payroll Distribution by Department</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={payData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            <Bar dataKey="total" fill="#16a34a" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
