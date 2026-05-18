export type Role = 'admin' | 'hr_manager' | 'manager' | 'employee';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  departmentId: string;
  employeeId: string;
  avatar?: string;
};

export type Department = {
  id: string;
  name: string;
  managerId: string;
  headcount: number;
};

export type Position = {
  id: string;
  title: string;
  departmentId: string;
  level: string;
};

export type EmploymentStatus = 'active' | 'inactive' | 'on_leave' | 'terminated';

export type Employee = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  nationalId: string;
  departmentId: string;
  positionId: string;
  managerId: string;
  employmentStatus: EmploymentStatus;
  startDate: string;
  endDate?: string;
  baseSalary: number;
  bankAccount: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  avatar?: string;
};

export type LeaveType = {
  id: string;
  name: string;
  daysAllowed: number;
  color: string;
};

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type LeaveRequest = {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  approvedById?: string;
  approvedAt?: string;
  createdAt: string;
  notes?: string;
};

export type LeaveBalance = {
  employeeId: string;
  leaveTypeId: string;
  total: number;
  used: number;
  remaining: number;
};

export type PayrollStatus = 'draft' | 'approved' | 'paid';

export type PayrollRun = {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  status: PayrollStatus;
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalDeductions: number;
  createdById: string;
  approvedById?: string;
  createdAt: string;
  paidAt?: string;
};

export type PayrollRecord = {
  id: string;
  payrollRunId: string;
  employeeId: string;
  baseSalary: number;
  allowances: number;
  bonus: number;
  grossSalary: number;
  taxAmount: number;
  pensionEmployee: number;
  pensionEmployer: number;
  otherDeductions: number;
  netSalary: number;
  taxBracket: string;
};

export type AuditLog = {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
};

export type Notification = {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
};
