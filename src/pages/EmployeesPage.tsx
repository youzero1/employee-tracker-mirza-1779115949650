import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { useHR } from '@/context/HRContext';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';
import Select from '@/components/ui/Select';
import { Employee, Department } from '@/types';

const DEPARTMENTS: Department[] = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design', 'Legal'];
const STATUS_OPTIONS = ['active', 'inactive', 'on_leave'];

export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee } = useHR();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [form, setForm] = useState({
    name: '', email: '', department: 'Engineering' as Department,
    position: '', salary: 50000, status: 'active' as Employee['status'],
    startDate: new Date().toISOString().split('T')[0], phone: '', location: ''
  });

  const canEdit = currentUser?.role === 'admin' || currentUser?.role === 'hr_manager';

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase());
    const matchDept = !filterDept || e.department === filterDept;
    const matchStatus = !filterStatus || e.status === filterStatus;
    return matchSearch && matchDept && matchStatus;
  });

  function openAdd() {
    setEditEmployee(null);
    setForm({ name: '', email: '', department: 'Engineering', position: '', salary: 50000, status: 'active', startDate: new Date().toISOString().split('T')[0], phone: '', location: '' });
    setShowModal(true);
  }

  function openEdit(emp: Employee) {
    setEditEmployee(emp);
    setForm({ name: emp.name, email: emp.email, department: emp.department, position: emp.position, salary: emp.salary, status: emp.status, startDate: emp.startDate, phone: emp.phone || '', location: emp.location || '' });
    setShowModal(true);
  }

  function handleSubmit() {
    if (!form.name || !form.email || !form.position) return;
    if (editEmployee) {
      updateEmployee({ ...editEmployee, ...form });
    } else {
      addEmployee(form);
    }
    setShowModal(false);
  }

  const statusVariant: Record<string, 'success' | 'danger' | 'warning'> = {
    active: 'success', inactive: 'danger', on_leave: 'warning'
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Employees</h2>
        {canEdit && <Button onClick={openAdd}><Plus size={16} /> Add Employee</Button>}
      </div>
      <Card>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employees..." />
          </div>
          <Select value={filterDept} onChange={e => setFilterDept(e.target.value)} options={[{ value: '', label: 'All Departments' }, ...DEPARTMENTS.map(d => ({ value: d, label: d }))]} />
          <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} options={[{ value: '', label: 'All Statuses' }, ...STATUS_OPTIONS.map(s => ({ value: s, label: s.replace('_', ' ') }))]} />
        </div>
        <Table
          headers={['Name', 'Department', 'Position', 'Status', 'Start Date', 'Salary']}
          rows={filtered.map(e => [
            <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate(`/employees/${e.id}`)}>{e.name}</button>,
            e.department,
            e.position,
            <Badge label={e.status.replace('_', ' ')} variant={statusVariant[e.status]} />,
            e.startDate,
            `$${e.salary.toLocaleString()}`
          ])}
          onRowClick={canEdit ? (i) => openEdit(filtered[i]) : undefined}
        />
      </Card>
      {showModal && (
        <Modal title={editEmployee ? 'Edit Employee' : 'Add Employee'} onClose={() => setShowModal(false)}
          footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button onClick={handleSubmit}>{editEmployee ? 'Save' : 'Add'}</Button></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FormField label="Full Name" required><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" /></FormField>
            <FormField label="Email" required><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@company.com" /></FormField>
            <FormField label="Department" required><Select value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value as Department }))} options={DEPARTMENTS.map(d => ({ value: d, label: d }))} /></FormField>
            <FormField label="Position" required><Input value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} placeholder="Software Engineer" /></FormField>
            <FormField label="Salary"><Input type="number" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: Number(e.target.value) }))} /></FormField>
            <FormField label="Status"><Select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Employee['status'] }))} options={STATUS_OPTIONS.map(s => ({ value: s, label: s.replace('_', ' ') }))} /></FormField>
            <FormField label="Start Date"><Input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></FormField>
            <FormField label="Phone"><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 555-0000" /></FormField>
            <FormField label="Location"><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="New York, NY" /></FormField>
          </div>
        </Modal>
      )}
    </div>
  );
}
