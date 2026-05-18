export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '-';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(dateStr));
}

export function formatDateTime(dateStr: string): string {
  if (!dateStr) return '-';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateStr));
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function calculateBusinessDays(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  let count = 0;
  const cur = new Date(s);
  while (cur <= e) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

export function calculateTax(gross: number): { rate: number; bracket: string; amount: number } {
  if (gross <= 1000) return { rate: 0.10, bracket: '10%', amount: gross * 0.10 };
  if (gross <= 3000) return { rate: 0.12, bracket: '12%', amount: gross * 0.12 };
  if (gross <= 5000) return { rate: 0.15, bracket: '15%', amount: gross * 0.15 };
  if (gross <= 7000) return { rate: 0.18, bracket: '18%', amount: gross * 0.18 };
  if (gross <= 9000) return { rate: 0.20, bracket: '20%', amount: gross * 0.20 };
  if (gross <= 12000) return { rate: 0.22, bracket: '22%', amount: gross * 0.22 };
  return { rate: 0.25, bracket: '25%', amount: gross * 0.25 };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function exportToCSV(data: Record<string, unknown>[], filename: string): void {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
