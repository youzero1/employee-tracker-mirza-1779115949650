import { Employee, Department, Position, LeaveType, LeaveRequest, LeaveBalance, PayrollRun, PayrollRecord, AuditLog, User } from '@/types';

export const DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Engineering', managerId: 'e2', headcount: 8 },
  { id: 'd2', name: 'Human Resources', managerId: 'e1', headcount: 4 },
  { id: 'd3', name: 'Finance', managerId: 'e3', headcount: 5 },
  { id: 'd4', name: 'Marketing', managerId: 'e4', headcount: 6 },
  { id: 'd5', name: 'Operations', managerId: 'e5', headcount: 7 },
];

export const POSITIONS: Position[] = [
  { id: 'p1', title: 'HR Director', departmentId: 'd2', level: 'Director' },
  { id: 'p2', title: 'Senior Engineer', departmentId: 'd1', level: 'Senior' },
  { id: 'p3', title: 'Finance Manager', departmentId: 'd3', level: 'Manager' },
  { id: 'p4', title: 'Marketing Lead', departmentId: 'd4', level: 'Lead' },
  { id: 'p5', title: 'Operations Manager', departmentId: 'd5', level: 'Manager' },
  { id: 'p6', title: 'Junior Engineer', departmentId: 'd1', level: 'Junior' },
  { id: 'p7', title: 'HR Specialist', departmentId: 'd2', level: 'Mid' },
  { id: 'p8', title: 'Accountant', departmentId: 'd3', level: 'Mid' },
];

export const USERS: User[] = [
  { id: 'u1', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'admin', departmentId: 'd2', employeeId: 'e1' },
  { id: 'u2', name: 'Michael Chen', email: 'michael@company.com', role: 'hr_manager', departmentId: 'd2', employeeId: 'e6' },
  { id: 'u3', name: 'James Wilson', email: 'james@company.com', role: 'manager', departmentId: 'd1', employeeId: 'e2' },
  { id: 'u4', name: 'Emily Davis', email: 'emily@company.com', role: 'employee', departmentId: 'd1', employeeId: 'e7' },
];

export const EMPLOYEES: Employee[] = [
  {
    id: 'e1', userId: 'u1', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@company.com',
    phone: '+1-555-0101', address: '123 Main St, New York, NY', dateOfBirth: '1985-03-15',
    gender: 'Female', nationalId: 'SSN-001', departmentId: 'd2', positionId: 'p1',
    managerId: '', employmentStatus: 'active', startDate: '2018-01-10', baseSalary: 95000,
    bankAccount: '****1234', emergencyContactName: 'Tom Johnson', emergencyContactPhone: '+1-555-0102',
    emergencyContactRelation: 'Spouse'
  },
  {
    id: 'e2', userId: 'u3', firstName: 'James', lastName: 'Wilson', email: 'james@company.com',
    phone: '+1-555-0103', address: '456 Oak Ave, San Francisco, CA', dateOfBirth: '1987-07-22',
    gender: 'Male', nationalId: 'SSN-002', departmentId: 'd1', positionId: 'p2',
    managerId: 'e1', employmentStatus: 'active', startDate: '2019-05-01', baseSalary: 85000,
    bankAccount: '****5678', emergencyContactName: 'Amy Wilson', emergencyContactPhone: '+1-555-0104',
    emergencyContactRelation: 'Spouse'
  },
  {
    id: 'e3', userId: '', firstName: 'Linda', lastName: 'Martinez', email: 'linda@company.com',
    phone: '+1-555-0105', address: '789 Pine Rd, Chicago, IL', dateOfBirth: '1982-11-30',
    gender: 'Female', nationalId: 'SSN-003', departmentId: 'd3', positionId: 'p3',
    managerId: 'e1', employmentStatus: 'active', startDate: '2017-09-15', baseSalary: 78000,
    bankAccount: '****9012', emergencyContactName: 'Carlos Martinez', emergencyContactPhone: '+1-555-0106',
    emergencyContactRelation: 'Spouse'
  },
  {
    id: 'e4', userId: '', firstName: 'David', lastName: 'Brown', email: 'david@company.com',
    phone: '+1-555-0107', address: '321 Elm St, Austin, TX', dateOfBirth: '1990-05-18',
    gender: 'Male', nationalId: 'SSN-004', departmentId: 'd4', positionId: 'p4',
    managerId: 'e1', employmentStatus: 'active', startDate: '2020-02-01', baseSalary: 72000,
    bankAccount: '****3456', emergencyContactName: 'Maria Brown', emergencyContactPhone: '+1-555-0108',
    emergencyContactRelation: 'Spouse'
  },
  {
    id: 'e5', userId: '', firstName: 'Rachel', lastName: 'Green', email: 'rachel@company.com',
    phone: '+1-555-0109', address: '654 Maple Dr, Seattle, WA', dateOfBirth: '1988-09-12',
    gender: 'Female', nationalId: 'SSN-005', departmentId: 'd5', positionId: 'p5',
    managerId: 'e1', employmentStatus: 'active', startDate: '2018-11-20', baseSalary: 80000,
    bankAccount: '****7890', emergencyContactName: 'Ross Green', emergencyContactPhone: '+1-555-0110',
    emergencyContactRelation: 'Sibling'
  },
  {
    id: 'e6', userId: 'u2', firstName: 'Michael', lastName: 'Chen', email: 'michael@company.com',
    phone: '+1-555-0111', address: '987 Cedar Ln, Boston, MA', dateOfBirth: '1991-01-25',
    gender: 'Male', nationalId: 'SSN-006', departmentId: 'd2', positionId: 'p7',
    managerId: 'e1', employmentStatus: 'active', startDate: '2021-03-15', baseSalary: 65000,
    bankAccount: '****2345', emergencyContactName: 'Lisa Chen', emergencyContactPhone: '+1-555-0112',
    emergencyContactRelation: 'Spouse'
  },
  {
    id: 'e7', userId: 'u4', firstName: 'Emily', lastName: 'Davis', email: 'emily@company.com',
    phone: '+1-555-0113', address: '147 Birch Blvd, Denver, CO', dateOfBirth: '1995-06-30',
    gender: 'Female', nationalId: 'SSN-007', departmentId: 'd1', positionId: 'p6',
    managerId: 'e2', employmentStatus: 'active', startDate: '2022-07-01', baseSalary: 58000,
    bankAccount: '****6789', emergencyContactName: 'Frank Davis', emergencyContactPhone: '+1-555-0114',
    emergencyContactRelation: 'Parent'
  },
  {
    id: 'e8', userId: '', firstName: 'Robert', lastName: 'Taylor', email: 'robert@company.com',
    phone: '+1-555-0115', address: '258 Walnut St, Miami, FL', dateOfBirth: '1986-12-08',
    gender: 'Male', nationalId: 'SSN-008', departmentId: 'd3', positionId: 'p8',
    managerId: 'e3', employmentStatus: 'on_leave', startDate: '2019-08-01', baseSalary: 62000,
    bankAccount: '****0123', emergencyContactName: 'Nancy Taylor', emergencyContactPhone: '+1-555-0116',
    emergencyContactRelation: 'Spouse'
  },
];

export const LEAVE_TYPES: LeaveType[] = [
  { id: 'lt1', name: 'Annual Leave', daysAllowed: 20, color: '#2563eb' },
  { id: 'lt2', name: 'Sick Leave', daysAllowed: 10, color: '#dc2626' },
  { id: 'lt3', name: 'Unpaid Leave', daysAllowed: 30, color: '#d97706' },
  { id: 'lt4', name: 'Maternity/Paternity', daysAllowed: 90, color: '#7c3aed' },
  { id: 'lt5', name: 'Compassionate Leave', daysAllowed: 5, color: '#0891b2' },
];

export const LEAVE_BALANCES: LeaveBalance[] = [
  { employeeId: 'e1', leaveTypeId: 'lt1', total: 20, used: 5, remaining: 15 },
  { employeeId: 'e1', leaveTypeId: 'lt2', total: 10, used: 2, remaining: 8 },
  { employeeId: 'e2', leaveTypeId: 'lt1', total: 20, used: 8, remaining: 12 },
  { employeeId: 'e2', leaveTypeId: 'lt2', total: 10, used: 0, remaining: 10 },
  { employeeId: 'e6', leaveTypeId: 'lt1', total: 20, used: 3, remaining: 17 },
  { employeeId: 'e6', leaveTypeId: 'lt2', total: 10, used: 1, remaining: 9 },
  { employeeId: 'e7', leaveTypeId: 'lt1', total: 15, used: 2, remaining: 13 },
  { employeeId: 'e7', leaveTypeId: 'lt2', total: 10, used: 3, remaining: 7 },
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'lr1', employeeId: 'e7', leaveTypeId: 'lt1', startDate: '2025-02-10',
    endDate: '2025-02-14', days: 5, reason: 'Family vacation', status: 'pending',
    createdAt: '2025-01-25T10:00:00Z'
  },
  {
    id: 'lr2', employeeId: 'e2', leaveTypeId: 'lt2', startDate: '2025-01-20',
    endDate: '2025-01-22', days: 3, reason: 'Medical appointment', status: 'approved',
    approvedById: 'e1', approvedAt: '2025-01-18T14:00:00Z', createdAt: '2025-01-17T09:00:00Z'
  },
  {
    id: 'lr3', employeeId: 'e6', leaveTypeId: 'lt1', startDate: '2025-03-01',
    endDate: '2025-03-05', days: 5, reason: 'Personal travel', status: 'pending',
    createdAt: '2025-01-28T11:00:00Z'
  },
  {
    id: 'lr4', employeeId: 'e8', leaveTypeId: 'lt4', startDate: '2024-12-01',
    endDate: '2025-02-28', days: 90, reason: 'Paternity leave', status: 'approved',
    approvedById: 'e1', approvedAt: '2024-11-25T10:00:00Z', createdAt: '2024-11-20T08:00:00Z'
  },
];

export const PAYROLL_RUNS: PayrollRun[] = [
  {
    id: 'pr1', period: 'December 2024', startDate: '2024-12-01', endDate: '2024-12-31',
    status: 'paid', totalGross: 535000, totalNet: 412350, totalTax: 87650, totalDeductions: 35000,
    createdById: 'u1', approvedById: 'u1', createdAt: '2024-12-28T10:00:00Z', paidAt: '2024-12-31T12:00:00Z'
  },
  {
    id: 'pr2', period: 'January 2025', startDate: '2025-01-01', endDate: '2025-01-31',
    status: 'approved', totalGross: 535000, totalNet: 412350, totalTax: 87650, totalDeductions: 35000,
    createdById: 'u1', approvedById: 'u1', createdAt: '2025-01-28T10:00:00Z'
  },
  {
    id: 'pr3', period: 'February 2025', startDate: '2025-02-01', endDate: '2025-02-28',
    status: 'draft', totalGross: 541000, totalNet: 416570, totalTax: 88730, totalDeductions: 35700,
    createdById: 'u1', createdAt: '2025-02-25T10:00:00Z'
  },
];

export const PAYROLL_RECORDS: PayrollRecord[] = [
  { id: 'prec1', payrollRunId: 'pr1', employeeId: 'e1', baseSalary: 95000/12, allowances: 500, bonus: 1000, grossSalary: (95000/12)+1500, taxAmount: ((95000/12)+1500)*0.22, pensionEmployee: ((95000/12)+1500)*0.05, pensionEmployer: ((95000/12)+1500)*0.08, otherDeductions: 0, netSalary: ((95000/12)+1500)*(1-0.22-0.05), taxBracket: '22%' },
  { id: 'prec2', payrollRunId: 'pr1', employeeId: 'e2', baseSalary: 85000/12, allowances: 400, bonus: 0, grossSalary: (85000/12)+400, taxAmount: ((85000/12)+400)*0.20, pensionEmployee: ((85000/12)+400)*0.05, pensionEmployer: ((85000/12)+400)*0.08, otherDeductions: 0, netSalary: ((85000/12)+400)*(1-0.20-0.05), taxBracket: '20%' },
  { id: 'prec3', payrollRunId: 'pr1', employeeId: 'e3', baseSalary: 78000/12, allowances: 350, bonus: 0, grossSalary: (78000/12)+350, taxAmount: ((78000/12)+350)*0.20, pensionEmployee: ((78000/12)+350)*0.05, pensionEmployer: ((78000/12)+350)*0.08, otherDeductions: 0, netSalary: ((78000/12)+350)*(1-0.20-0.05), taxBracket: '20%' },
  { id: 'prec4', payrollRunId: 'pr1', employeeId: 'e4', baseSalary: 72000/12, allowances: 300, bonus: 0, grossSalary: (72000/12)+300, taxAmount: ((72000/12)+300)*0.18, pensionEmployee: ((72000/12)+300)*0.05, pensionEmployer: ((72000/12)+300)*0.08, otherDeductions: 0, netSalary: ((72000/12)+300)*(1-0.18-0.05), taxBracket: '18%' },
  { id: 'prec5', payrollRunId: 'pr1', employeeId: 'e5', baseSalary: 80000/12, allowances: 350, bonus: 0, grossSalary: (80000/12)+350, taxAmount: ((80000/12)+350)*0.20, pensionEmployee: ((80000/12)+350)*0.05, pensionEmployer: ((80000/12)+350)*0.08, otherDeductions: 0, netSalary: ((80000/12)+350)*(1-0.20-0.05), taxBracket: '20%' },
  { id: 'prec6', payrollRunId: 'pr1', employeeId: 'e6', baseSalary: 65000/12, allowances: 250, bonus: 0, grossSalary: (65000/12)+250, taxAmount: ((65000/12)+250)*0.15, pensionEmployee: ((65000/12)+250)*0.05, pensionEmployer: ((65000/12)+250)*0.08, otherDeductions: 0, netSalary: ((65000/12)+250)*(1-0.15-0.05), taxBracket: '15%' },
  { id: 'prec7', payrollRunId: 'pr1', employeeId: 'e7', baseSalary: 58000/12, allowances: 200, bonus: 0, grossSalary: (58000/12)+200, taxAmount: ((58000/12)+200)*0.12, pensionEmployee: ((58000/12)+200)*0.05, pensionEmployer: ((58000/12)+200)*0.08, otherDeductions: 0, netSalary: ((58000/12)+200)*(1-0.12-0.05), taxBracket: '12%' },
  { id: 'prec8', payrollRunId: 'pr1', employeeId: 'e8', baseSalary: 62000/12, allowances: 0, bonus: 0, grossSalary: (62000/12), taxAmount: (62000/12)*0.12, pensionEmployee: (62000/12)*0.05, pensionEmployer: (62000/12)*0.08, otherDeductions: 0, netSalary: (62000/12)*(1-0.12-0.05), taxBracket: '12%' },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'al1', userId: 'u1', action: 'CREATE', entity: 'Employee', entityId: 'e7', details: 'Created employee record for Emily Davis', timestamp: '2022-07-01T08:00:00Z' },
  { id: 'al2', userId: 'u1', action: 'APPROVE', entity: 'LeaveRequest', entityId: 'lr2', details: 'Approved sick leave for James Wilson', timestamp: '2025-01-18T14:00:00Z' },
  { id: 'al3', userId: 'u1', action: 'CREATE', entity: 'PayrollRun', entityId: 'pr1', details: 'Created payroll run for December 2024', timestamp: '2024-12-28T10:00:00Z' },
  { id: 'al4', userId: 'u1', action: 'APPROVE', entity: 'PayrollRun', entityId: 'pr1', details: 'Approved payroll run for December 2024', timestamp: '2024-12-29T09:00:00Z' },
  { id: 'al5', userId: 'u1', action: 'UPDATE', entity: 'Employee', entityId: 'e3', details: 'Updated salary for Linda Martinez', timestamp: '2025-01-10T11:00:00Z' },
  { id: 'al6', userId: 'u2', action: 'SUBMIT', entity: 'LeaveRequest', entityId: 'lr3', details: 'Submitted annual leave request', timestamp: '2025-01-28T11:00:00Z' },
];
