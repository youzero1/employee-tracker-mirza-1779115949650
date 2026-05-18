import { useState } from 'react';
import { useHR } from '@/context/HRContext';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import Select from '@/components/ui/Select';
import { LeaveRequest } from '@/types';

const STATUS_OPTIONS = ['all', 'pending', 'approved', 'rejected', 'cancelled'];

export default function LeavePage() {
  const { leaveRequests, employees, updateLeaveStatus } = useHR();
  const { currentUser } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');

  const canApprove = currentUser?.role === 'admin' || currentUser?.role === 'hr_manager' || currentUser?.role === 'manager';

  const filtered = leaveRequests.filter(l => filterStatus === 'all' || l.status === filterStatus);

  const getName = (id: string) => employees.find(e => e.id === id)?.name || 'Unknown';

  const statusVariant: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
    approved: 'success', rejected: 'danger', pending: 'warning', cancelled: 'info'
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Leave Management</h2>
      </div>
      <Card>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} options={STATUS_OPTIONS.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))} />
        </div>
        <Table
          headers={['Employee', 'Type', 'From', 'To', 'Days', 'Reason', 'Status', ...(canApprove ? ['Actions'] : [])]}
          rows={filtered.map((l: LeaveRequest) => [
            getName(l.employeeId),
            l.type,
            l.startDate,
            l.endDate,
            String(l.days),
            l.reason || '-',
            <Badge label={l.status} variant={statusVariant[l.status]} />,
            ...(canApprove ? [l.status === 'pending' ? (
              <div style={{ display: 'flex', gap: 6 }}>
                <Button size="sm" variant="success" onClick={() => updateLeaveStatus(l.id, 'approved')}>Approve</Button>
                <Button size="sm" variant="danger" onClick={() => updateLeaveStatus(l.id, 'rejected')}>Reject</Button>
              </div>
            ) : '-'] : [])
          ])}
        />
      </Card>
    </div>
  );
}
