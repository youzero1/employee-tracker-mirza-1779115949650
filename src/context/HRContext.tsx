import { createContext, useContext, ReactNode } from 'react';
import { Employee, Department, Position, LeaveType, LeaveRequest, LeaveBalance, PayrollRun, PayrollRecord, AuditLog } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  EMPLOYEES, DEPARTMENTS, POSITIONS, LEAVE_TYPES,
  LEAVE_REQUESTS, LEAVE_BALANCES, PAYROLL_RUNS, PAYROLL_RECORDS, AUDIT_LOGS
} from '@/lib/seed';
import { generateId } from '@/lib/utils';

type HRContextType = {
  employees: Employee[];
  departments: Department[];
  positions: Position[];
  leaveTypes: LeaveType[];
  leaveRequests: LeaveRequest[];
  leaveBalances: LeaveBalance[];
  payrollRuns: PayrollRun[];
  payrollRecords: PayrollRecord[];
  auditLogs: AuditLog[];
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'createdAt'>) => void;
  updateLeaveRequest: (id: string, data: Partial<LeaveRequest>) => void;
  addPayrollRun: (run: Omit<PayrollRun, 'id' | 'createdAt'>) => void;
  updatePayrollRun: (id: string, data: Partial<PayrollRun>) => void;
  addDepartment: (dept: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, data: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;
  addPosition: (pos: Omit<Position, 'id'>) => void;
  updatePosition: (id: string, data: Partial<Position>) => void;
  deletePosition: (id: string) => void;
  addLeaveType: (lt: Omit<LeaveType, 'id'>) => void;
  updateLeaveType: (id: string, data: Partial<LeaveType>) => void;
  deleteLeaveType: (id: string) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
};

const HRContext = createContext<HRContextType>({} as HRContextType);

export function HRProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useLocalStorage<Employee[]>('hr_employees', EMPLOYEES);
  const [departments, setDepartments] = useLocalStorage<Department[]>('hr_departments', DEPARTMENTS);
  const [positions, setPositions] = useLocalStorage<Position[]>('hr_positions', POSITIONS);
  const [leaveTypes, setLeaveTypes] = useLocalStorage<LeaveType[]>('hr_leave_types', LEAVE_TYPES);
  const [leaveRequests, setLeaveRequests] = useLocalStorage<LeaveRequest[]>('hr_leave_requests', LEAVE_REQUESTS);
  const [leaveBalances, setLeaveBalances] = useLocalStorage<LeaveBalance[]>('hr_leave_balances', LEAVE_BALANCES);
  const [payrollRuns, setPayrollRuns] = useLocalStorage<PayrollRun[]>('hr_payroll_runs', PAYROLL_RUNS);
  const [payrollRecords, setPayrollRecords] = useLocalStorage<PayrollRecord[]>('hr_payroll_records', PAYROLL_RECORDS);
  const [auditLogs, setAuditLogs] = useLocalStorage<AuditLog[]>('hr_audit_logs', AUDIT_LOGS);

  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp = { ...emp, id: generateId() };
    setEmployees([...employees, newEmp]);
  };

  const updateEmployee = (id: string, data: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...data } : e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const addLeaveRequest = (req: Omit<LeaveRequest, 'id' | 'createdAt'>) => {
    const newReq: LeaveRequest = { ...req, id: generateId(), createdAt: new Date().toISOString() };
    setLeaveRequests([...leaveRequests, newReq]);
  };

  const updateLeaveRequest = (id: string, data: Partial<LeaveRequest>) => {
    setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, ...data } : r));
    if (data.status === 'approved') {
      const req = leaveRequests.find(r => r.id === id);
      if (req) {
        setLeaveBalances(leaveBalances.map(b =>
          b.employeeId === req.employeeId && b.leaveTypeId === req.leaveTypeId
            ? { ...b, used: b.used + req.days, remaining: b.remaining - req.days }
            : b
        ));
      }
    }
  };

  const addPayrollRun = (run: Omit<PayrollRun, 'id' | 'createdAt'>) => {
    const newRun: PayrollRun = { ...run, id: generateId(), createdAt: new Date().toISOString() };
    setPayrollRuns([...payrollRuns, newRun]);
  };

  const updatePayrollRun = (id: string, data: Partial<PayrollRun>) => {
    setPayrollRuns(payrollRuns.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const addDepartment = (dept: Omit<Department, 'id'>) => {
    setDepartments([...departments, { ...dept, id: generateId() }]);
  };

  const updateDepartment = (id: string, data: Partial<Department>) => {
    setDepartments(departments.map(d => d.id === id ? { ...d, ...data } : d));
  };

  const deleteDepartment = (id: string) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const addPosition = (pos: Omit<Position, 'id'>) => {
    setPositions([...positions, { ...pos, id: generateId() }]);
  };

  const updatePosition = (id: string, data: Partial<Position>) => {
    setPositions(positions.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const deletePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const addLeaveType = (lt: Omit<LeaveType, 'id'>) => {
    setLeaveTypes([...leaveTypes, { ...lt, id: generateId() }]);
  };

  const updateLeaveType = (id: string, data: Partial<LeaveType>) => {
    setLeaveTypes(leaveTypes.map(t => t.id === id ? { ...t, ...data } : t));
  };

  const deleteLeaveType = (id: string) => {
    setLeaveTypes(leaveTypes.filter(t => t.id !== id));
  };

  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = { ...log, id: generateId(), timestamp: new Date().toISOString() };
    setAuditLogs([newLog, ...auditLogs]);
  };

  return (
    <HRContext.Provider value={{
      employees, departments, positions, leaveTypes, leaveRequests,
      leaveBalances, payrollRuns, payrollRecords, auditLogs,
      addEmployee, updateEmployee, deleteEmployee,
      addLeaveRequest, updateLeaveRequest,
      addPayrollRun, updatePayrollRun,
      addDepartment, updateDepartment, deleteDepartment,
      addPosition, updatePosition, deletePosition,
      addLeaveType, updateLeaveType, deleteLeaveType,
      addAuditLog,
    }}>
      {children}
    </HRContext.Provider>
  );
}

export function useHR() {
  return useContext(HRContext);
}
