import { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, LeaveRequest, PayrollRecord, AuditLog, Department } from '@/types';
import { seedData } from '@/lib/seed';
import { loadFromStorage, saveToStorage } from '@/lib/storage';

type HRContextType = {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  payrollRecords: PayrollRecord[];
  auditLogs: AuditLog[];
  addEmployee: (data: Omit<Employee, 'id' | 'leaveBalance'>) => void;
  updateEmployee: (emp: Employee) => void;
  addLeaveRequest: (data: Omit<LeaveRequest, 'id' | 'createdAt'>) => void;
  updateLeaveStatus: (id: string, status: LeaveRequest['status']) => void;
  processPayroll: () => void;
};

const HRContext = createContext<HRContextType | null>(null);

const STORAGE_KEY = 'hr_data';

function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

type StoredData = {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  payrollRecords: PayrollRecord[];
  auditLogs: AuditLog[];
};

function loadData(): StoredData {
  const stored = loadFromStorage<StoredData>(STORAGE_KEY);
  if (stored) return stored;
  return seedData();
}

export function HRProvider({ children }: { children: ReactNode }) {
  const initial = loadData();
  const [employees, setEmployees] = useState<Employee[]>(initial.employees);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initial.leaveRequests);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(initial.payrollRecords);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initial.auditLogs);

  function persist(data: StoredData) {
    saveToStorage(STORAGE_KEY, data);
  }

  function addAudit(action: string, performedBy: string, targetId?: string, details?: string) {
    const log: AuditLog = { id: generateId(), action, performedBy, targetId, details, timestamp: new Date().toISOString() };
    setAuditLogs(prev => {
      const updated = [...prev, log];
      return updated;
    });
  }

  function addEmployee(data: Omit<Employee, 'id' | 'leaveBalance'>) {
    const emp: Employee = { ...data, id: generateId(), leaveBalance: { annual: 20, sick: 10, unpaid: 0 } };
    setEmployees(prev => {
      const updated = [...prev, emp];
      persist({ employees: updated, leaveRequests, payrollRecords, auditLogs });
      return updated;
    });
    addAudit('ADD_EMPLOYEE', 'system', emp.id, `Added ${emp.name}`);
  }

  function updateEmployee(emp: Employee) {
    setEmployees(prev => {
      const updated = prev.map(e => e.id === emp.id ? emp : e);
      persist({ employees: updated, leaveRequests, payrollRecords, auditLogs });
      return updated;
    });
    addAudit('UPDATE_EMPLOYEE', 'system', emp.id, `Updated ${emp.name}`);
  }

  function addLeaveRequest(data: Omit<LeaveRequest, 'id' | 'createdAt'>) {
    const req: LeaveRequest = { ...data, id: generateId(), createdAt: new Date().toISOString() };
    setLeaveRequests(prev => {
      const updated = [...prev, req];
      persist({ employees, leaveRequests: updated, payrollRecords, auditLogs });
      return updated;
    });
    addAudit('ADD_LEAVE_REQUEST', 'system', req.employeeId, `Leave request: ${req.type}`);
  }

  function updateLeaveStatus(id: string, status: LeaveRequest['status']) {
    setLeaveRequests(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, status } : l);
      persist({ employees, leaveRequests: updated, payrollRecords, auditLogs });
      return updated;
    });
    addAudit('UPDATE_LEAVE_STATUS', 'system', id, `Status: ${status}`);
  }

  function processPayroll() {
    const period = new Date().toISOString().slice(0, 7);
    const newRecords: PayrollRecord[] = employees
      .filter(e => e.status === 'active')
      .filter(e => !payrollRecords.some(p => p.employeeId === e.id && p.period === period))
      .map(e => {
        const gross = Math.round(e.salary / 12);
        const deductions = Math.round(gross * 0.25);
        return {
          id: generateId(),
          employeeId: e.id,
          period,
          grossPay: gross,
          deductions,
          netPay: gross - deductions,
          status: 'paid' as PayrollRecord['status']
        };
      });
    setPayrollRecords(prev => {
      const updated = [...prev, ...newRecords];
      persist({ employees, leaveRequests, payrollRecords: updated, auditLogs });
      return updated;
    });
    addAudit('PROCESS_PAYROLL', 'system', undefined, `Processed ${newRecords.length} records for ${period}`);
  }

  return (
    <HRContext.Provider value={{ employees, leaveRequests, payrollRecords, auditLogs, addEmployee, updateEmployee, addLeaveRequest, updateLeaveStatus, processPayroll }}>
      {children}
    </HRContext.Provider>
  );
}

export function useHR() {
  const ctx = useContext(HRContext);
  if (!ctx) throw new Error('useHR must be used within HRProvider');
  return ctx;
}
