import { useState } from 'react';
import { useHR } from '@/context/HRContext';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import Select from '@/components/ui/Select';
import StatCard from '@/components/ui/StatCard';
import { DollarSign, Users, CheckCircle, Clock } from 'lucide-react';

export default function PayrollPage() {
  const { payrollRecords, employees, processPayroll } = useHR();
  const { currentUser } = useAuth();
  const [filterPeriod, setFilterPeriod] = useState('');

  const canProcess = currentUser?.role === 'admin' || currentUser?.role === 'hr_manager';

  const periods = Array.from(new Set(payrollRecords.map(p => p.period))).sort().reverse();
  const filtered = payrollRecords.filter(p => !filterPeriod || p.period === filterPeriod);

  const getName = (id: string) => employees.find(e => e.id === id)?.name || 'Unknown';

  const totalGross = filtered.reduce((s, p) => s + p.grossPay, 0);
  const totalNet = filtered.reduce((s, p) => s + p.netPay, 0);
  const paid = filtered.filter(p => p.status === 'paid').length;
  const pending = filtered.filter(p => p.status === 'pending').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Payroll</h2>
        {canProcess && <Button onClick={() => processPayroll()}>Process Payroll</Button>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
        <StatCard title="Total Gross" value={`$${totalGross.toLocaleString()}`} icon={<DollarSign size={22} />} color="primary" />
        <StatCard title="Total Net" value={`$${totalNet.toLocaleString()}`} icon={<DollarSign size={22} />} color="success" />
        <StatCard title="Paid" value={String(paid)} icon={<CheckCircle size={22} />} color="success" />
        <StatCard title="Pending" value={String(pending)} icon={<Clock size={22} />} color="warning" />
      </div>
      <Card>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)} options={[{ value: '', label: 'All Periods' }, ...periods.map(p => ({ value: p, label: p }))]} />
        </div>
        <Table
          headers={['Employee', 'Period', 'Gross Pay', 'Deductions', 'Net Pay', 'Status']}
          rows={filtered.map(p => [
            getName(p.employeeId),
            p.period,
            `$${p.grossPay.toLocaleString()}`,
            `$${p.deductions.toLocaleString()}`,
            `$${p.netPay.toLocaleString()}`,
            <Badge label={p.status} variant={p.status === 'paid' ? 'success' : 'warning'} />
          ])}
        />
      </Card>
    </div>
  );
}
