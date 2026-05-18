import { useState } from 'react';
import { useHR } from '@/context/HRContext';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import { Employee, PayrollRecord } from '@/types';

export default function PayrollPage() {
  const { employees, payrollRecords } = useHR();
  const [search, setSearch] = useState('');

  const filtered = payrollRecords.filter(p => {
    const emp = employees.find(e => e.id === p.employeeId);
    const fullName = emp ? `${emp.firstName} ${emp.lastName}` : '';
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  const getName = (id: string) => {
    const emp = employees.find(e => e.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
  };

  const totalGross = filtered.reduce((s, p) => s + (p.grossPay ?? 0), 0);
  const totalNet = filtered.reduce((s, p) => s + (p.netPay ?? 0), 0);
  const paid = filtered.filter(p => (p as any).status === 'paid').length;
  const pending = filtered.filter(p => (p as any).status === 'pending').length;

  const columns = ['Employee', 'Period', 'Gross Pay', 'Deductions', 'Net Pay', 'Status'];

  const rows = filtered.map(p => [
    getName(p.employeeId),
    (p as any).period ?? p.payPeriodStart + ' - ' + p.payPeriodEnd,
    `$${(p.grossPay ?? 0).toLocaleString()}`,
    `$${(p.deductions ?? 0).toLocaleString()}`,
    `$${(p.netPay ?? 0).toLocaleString()}`,
    <Badge
      key={p.id}
      label={(p as any).status ?? 'paid'}
      variant={(p as any).status === 'pending' ? 'warning' : 'success'}
    />,
  ]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Payroll</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <Card><div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Total Gross</div><div style={{ fontSize: 22, fontWeight: 700 }}>${totalGross.toLocaleString()}</div></Card>
        <Card><div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Total Net</div><div style={{ fontSize: 22, fontWeight: 700 }}>${totalNet.toLocaleString()}</div></Card>
        <Card><div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Paid</div><div style={{ fontSize: 22, fontWeight: 700 }}>{paid}</div></Card>
        <Card><div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>Pending</div><div style={{ fontSize: 22, fontWeight: 700 }}>{pending}</div></Card>
      </div>
      <Card>
        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="Search employee..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 6, fontSize: 13, width: 240 }}
          />
        </div>
        <Table columns={columns} rows={rows} />
      </Card>
    </div>
  );
}
