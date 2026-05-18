export type Role = 'admin' | 'hr_manager' | 'manager' | 'employee';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  employeeId?: string;
};

export type Department = {
  id: string;
  name: string;
  managerId?: string;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  departmentId: string;
  positionId?: string;
  position?: string;
  jobTitle?: string;
  managerId?: string;
  hireDate: string;
  baseSalary: number;
  employmentStatus: 'active' | 'inactive' | 'on_leave' | 'terminated';
  avatarUrl?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
};

export type Position = {
  id: string;
  title: string;
  departmentId: string;
  level?: string;
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approverId?: string;
  createdAt: string;
  updatedAt?: string;
};

export type PayrollRecord = {
  id: string;
  employeeId: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  payDate?: string;
  createdAt?: string;
};

export type AuditLog = {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  details?: string;
  createdAt: string;
};

export type Settings = {
  companyName: string;
  currency: string;
  timezone: string;
  workingHoursPerDay: number;
  leaveTypes: string[];
};

export type HRState = {
  employees: Employee[];
  departments: Department[];
  positions: Position[];
  leaveRequests: LeaveRequest[];
  payrollRecords: PayrollRecord[];
  auditLogs: AuditLog[];
  settings: Settings;
};
