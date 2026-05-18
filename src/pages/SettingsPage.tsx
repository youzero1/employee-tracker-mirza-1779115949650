import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [timezone, setTimezone] = useState('UTC');
  const [currency, setCurrency] = useState('USD');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Settings</h2>
      <div style={{ maxWidth: 600 }}>
        <Card>
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Company Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <FormField label="Company Name">
              <Input value={companyName} onChange={e => setCompanyName(e.target.value)} />
            </FormField>
            <FormField label="Timezone">
              <Select value={timezone} onChange={e => setTimezone(e.target.value)} options={[
                { value: 'UTC', label: 'UTC' },
                { value: 'America/New_York', label: 'Eastern Time' },
                { value: 'America/Chicago', label: 'Central Time' },
                { value: 'America/Denver', label: 'Mountain Time' },
                { value: 'America/Los_Angeles', label: 'Pacific Time' },
              ]} />
            </FormField>
            <FormField label="Currency">
              <Select value={currency} onChange={e => setCurrency(e.target.value)} options={[
                { value: 'USD', label: 'USD - US Dollar' },
                { value: 'EUR', label: 'EUR - Euro' },
                { value: 'GBP', label: 'GBP - British Pound' },
              ]} />
            </FormField>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Button onClick={handleSave}>Save Settings</Button>
              {saved && <span style={{ color: 'var(--color-success)', fontSize: 13 }}>✓ Saved!</span>}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
