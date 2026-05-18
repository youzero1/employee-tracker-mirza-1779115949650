import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { useHR } from '@/context/HRContext';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { employees, leaveRequests, payrollRecords } = useHR();
  const { currentUser } = useAuth();

  const employee = employees.find(e => e.id === id);
  if (!employee) return <div style={{ padding: 40, textAlign: 'center' }}>Employee not found. <button onClick={() => navigate('/employees')} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>Go back</button></div>;

  const empLeave = leaveRequests.filter(l => l.employeeId === id);
  const empPayroll = payrollRecords.filter(p => p.employeeId === id);

  const statusVariant: Record<string, 'success' | 'danger' | 'warning'> = {
    active: 'success', inactive: 'danger', on_leave: 'warning'
  };

  const leaveStatusVariant: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
    approved: 'success', rejected: 'danger', pending: 'warning', cancelled: 'info'
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Button variant="secondary" size="sm" onClick={() => navigate('/employees')}><ArrowLeft size={16} /> Back</Button>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>{employee.name}</h2>
        <Badge label={employee.status.replace('_', ' ')} variant={statusVariant[employee.status]} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, margin: '0 auto 12px' }}>
                {employee.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{employee.name}</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>{employee.position}</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>{employee.department}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {employee.email && <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><Mail size={14} style={{ color: 'var(--color-text-muted)' }} />{employee.email}</div>}
              {employee.phone && <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><Phone size={14} style={{ color: 'var(--color-text-muted)' }} />{employee.phone}</div>}
              {employee.location && <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><MapPin size={14} style={{ color: 'var(--color-text-muted)' }} />{employee.location}</div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><Calendar size={14} style={{ color: 'var(--color-text-muted)' }} />Joined {employee.startDate}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><DollarSign size={14} style={{ color: 'var(--color-text-muted)' }} />${employee.salary.toLocaleString()}/yr</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><Briefcase size={14} style={{ color: 'var(--color-text-muted)' }} />{employee.department}</div>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Leave History</h3>
            {empLeave.length === 0 ? <p style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>No leave records.</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>From</th>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>To</th>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Status</th>
                </tr></thead>
                <tbody>{empLeave.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '6px 8px' }}>{l.type}</td>
                    <td style={{ padding: '6px 8px' }}>{l.startDate}</td>
                    <td style={{ padding: '6px 8px' }}>{l.endDate}</td>
                    <td style={{ padding: '6px 8px' }}><Badge label={l.status} variant={leaveStatusVariant[l.status]} /></td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </Card>
          {(currentUser?.role === 'admin' || currentUser?.role === 'hr_manager') && (
            <Card>
              <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Payroll History</h3>
              {empPayroll.length === 0 ? <p style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>No payroll records.</p> : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Period</th>
                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Gross</th>
                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Net</th>
                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Status</th>
                  </tr></thead>
                  <tbody>{empPayroll.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '6px 8px' }}>{p.period}</td>
                      <td style={{ padding: '6px 8px' }}>${p.grossPay.toLocaleString()}</td>
                      <td style={{ padding: '6px 8px' }}>${p.netPay.toLocaleString()}</td>
                      <td style={{ padding: '6px 8px' }}><Badge label={p.status} variant={p.status === 'paid' ? 'success' : 'warning'} /></td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
