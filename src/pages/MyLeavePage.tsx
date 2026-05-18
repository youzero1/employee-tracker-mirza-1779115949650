import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHR } from '@/context/HRContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { LeaveType } from '@/types';
import { Plus } from 'lucide-react';

const LEAVE_TYPES: LeaveType[] = ['Annual', 'Sick', 'Maternity', 'Paternity', 'Unpaid', 'Emergency'];

export default function MyLeavePage() {
  const { currentUser } = useAuth();
  const { leaveRequests, employees, addLeaveRequest } = useHR();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: 'Annual' as LeaveType, startDate: '', endDate: '', reason: '' });

  const employee = employees.find(e => e.id === currentUser?.employeeId);
  const myLeave = leaveRequests.filter(l => l.employeeId === currentUser?.employeeId);

  const statusVariant: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
    approved: 'success', rejected: 'danger', pending: 'warning', cancelled: 'info'
  };

  function handleSubmit() {
    if (!form.startDate || !form.endDate) return;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    addLeaveRequest({
      employeeId: currentUser?.employeeId || '',
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      days,
      reason: form.reason,
      status: 'pending'
    });
    setShowModal(false);
    setForm({ type: 'Annual', startDate: '', endDate: '', reason: '' });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>My Leave</h2>
        <Button onClick={() => setShowModal(true)}><Plus size={16} /> Request Leave</Button>
      </div>
      {employee && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
          <Card padding="sm">
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Annual Leave Balance</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{employee.leaveBalance?.annual ?? 20} days</div>
          </Card>
          <Card padding="sm">
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Sick Leave Balance</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{employee.leaveBalance?.sick ?? 10} days</div>
          </Card>
          <Card padding="sm">
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 4 }}>Approved Requests</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{myLeave.filter(l => l.status === 'approved').length}</div>
          </Card>
        </div>
      )}
      <Card>
        <Table
          headers={['Type', 'From', 'To', 'Days', 'Reason', 'Status']}
          rows={myLeave.map(l => [
            l.type,
            l.startDate,
            l.endDate,
            String(l.days),
            l.reason || '-',
            <Badge label={l.status} variant={statusVariant[l.status]} />
          ])}
        />
      </Card>
      {showModal && (
        <Modal title="Request Leave" onClose={() => setShowModal(false)}
          footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button onClick={handleSubmit}>Submit</Button></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FormField label="Leave Type"><Select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as LeaveType }))} options={LEAVE_TYPES.map(t => ({ value: t, label: t }))} /></FormField>
            <FormField label="Start Date" required><Input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></FormField>
            <FormField label="End Date" required><Input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} /></FormField>
            <FormField label="Reason"><Input value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} placeholder="Optional reason..." /></FormField>
          </div>
        </Modal>
      )}
    </div>
  );
}
