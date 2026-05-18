import { useHR } from '@/context/HRContext';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';

export default function AuditLogsPage() {
  const { auditLogs, employees } = useHR();

  const getName = (id: string) => employees.find(e => e.id === id)?.name || id;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Audit Logs</h2>
      <Card>
        <Table
          headers={['Timestamp', 'Action', 'Performed By', 'Target', 'Details']}
          rows={[...auditLogs].reverse().map(log => [
            new Date(log.timestamp).toLocaleString(),
            log.action,
            getName(log.performedBy),
            log.targetId ? getName(log.targetId) : '-',
            log.details || '-'
          ])}
        />
      </Card>
    </div>
  );
}
