import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHR } from '@/context/HRContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { Mail, Phone, MapPin, Calendar, DollarSign, Briefcase } from 'lucide-react';

export default function MyProfilePage() {
  const { currentUser } = useAuth();
  const { employees, updateEmployee } = useHR();

  const employee = employees.find(e => e.id === currentUser?.employeeId);
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(employee?.phone || '');
  const [location, setLocation] = useState(employee?.location || '');

  if (!employee) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>No employee profile linked to your account.</div>;

  function handleSave() {
    if (employee) {
      updateEmployee({ ...employee, phone, location });
    }
    setEditing(false);
  }

  const statusVariant: Record<string, 'success' | 'danger' | 'warning'> = {
    active: 'success', inactive: 'danger', on_leave: 'warning'
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>My Profile</h2>
      <div style={{ maxWidth: 600 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, flexShrink: 0 }}>
              {employee.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{employee.name}</div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 14 }}>{employee.position}</div>
              <Badge label={employee.status.replace('_', ' ')} variant={statusVariant[employee.status]} />
            </div>
          </div>
          {!editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><Mail size={16} style={{ color: 'var(--color-text-muted)' }} />{employee.email}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><Phone size={16} style={{ color: 'var(--color-text-muted)' }} />{employee.phone || 'Not set'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><MapPin size={16} style={{ color: 'var(--color-text-muted)' }} />{employee.location || 'Not set'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><Calendar size={16} style={{ color: 'var(--color-text-muted)' }} />Joined {employee.startDate}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><Briefcase size={16} style={{ color: 'var(--color-text-muted)' }} />{employee.department}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}><DollarSign size={16} style={{ color: 'var(--color-text-muted)' }} />${employee.salary.toLocaleString()}/yr</div>
              <Button variant="secondary" onClick={() => setEditing(true)}>Edit Profile</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <FormField label="Phone"><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555-0000" /></FormField>
              <FormField label="Location"><Input value={location} onChange={e => setLocation(e.target.value)} placeholder="City, State" /></FormField>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button onClick={handleSave}>Save</Button>
                <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
