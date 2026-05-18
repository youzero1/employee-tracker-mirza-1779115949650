import { useAuth } from '@/hooks/useAuth';
import { useHR } from '@/context/HRContext';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';

export default function MyPayslipsPage() {
  const { currentUser } = useAuth();
  const { payrollRecords } = useHR();

  const myPayslips = payrollRecords
    .filter(p => p.employeeId === currentUser?.employeeId)
    .sort((a, b) => b.period.localeCompare(a.period));

  const totalEarned = myPayslips.filter(p => p.status === 'paid').reduce((s, p) => s + p.netPay, 0);

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>My Payslips</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
        <Card padding="sm">
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Total Payslips</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{myPayslips.length}</div>
        </Card>
        <Card padding="sm">
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Total Earned (Net)</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>${totalEarned.toLocaleString()}</div>
        </Card>
        <Card padding="sm">
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Last Period</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{myPayslips[0]?.period || '-'}</div>
        </Card>
      </div>
      <Card>
        <Table
          headers={['Period', 'Gross Pay', 'Deductions', 'Net Pay', 'Status']}
          rows={myPayslips.map(p => [
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
