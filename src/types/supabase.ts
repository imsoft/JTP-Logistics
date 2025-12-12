// Database types matching Supabase schema
export interface DbEmployee {
  id: string;
  full_name: string;
  position: string;
  department: 'logistics' | 'finance' | 'management';
  created_at?: string;
  updated_at?: string;
}

export interface DbLaptop {
  id: string;
  name: string;
  password: string;
  serial_number: string;
  assigned_to: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DbCellphone {
  id: string;
  name: string;
  password: string;
  phone: string;
  imei: string;
  assigned_to: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DbEmail {
  id: string;
  type: 'administrative' | 'gmail' | 'hotmail' | 'icloud' | 'hosting';
  email: string;
  password: string;
  assigned_to: string[];
  created_at?: string;
  updated_at?: string;
}

// Conversion functions from database types to app types
import type { Employee, Laptop, Cellphone, Email } from './index';

export function dbEmployeeToEmployee(dbEmployee: DbEmployee): Employee {
  return {
    id: dbEmployee.id,
    fullName: dbEmployee.full_name,
    position: dbEmployee.position,
    department: dbEmployee.department,
  };
}

export function employeeToDbEmployee(employee: Partial<Employee>): Partial<DbEmployee> {
  return {
    full_name: employee.fullName,
    position: employee.position,
    department: employee.department,
  };
}

export function dbLaptopToLaptop(dbLaptop: DbLaptop): Laptop {
  return {
    id: dbLaptop.id,
    name: dbLaptop.name,
    password: dbLaptop.password,
    serialNumber: dbLaptop.serial_number,
    assignedTo: dbLaptop.assigned_to || undefined,
  };
}

export function laptopToDbLaptop(laptop: Partial<Laptop>): Partial<DbLaptop> {
  return {
    name: laptop.name,
    password: laptop.password,
    serial_number: laptop.serialNumber,
    assigned_to: laptop.assignedTo || null,
  };
}

export function dbCellphoneToCellphone(dbCellphone: DbCellphone): Cellphone {
  return {
    id: dbCellphone.id,
    name: dbCellphone.name,
    password: dbCellphone.password,
    phone: dbCellphone.phone,
    imei: dbCellphone.imei,
    assignedTo: dbCellphone.assigned_to || undefined,
  };
}

export function cellphoneToDbCellphone(cellphone: Partial<Cellphone>): Partial<DbCellphone> {
  return {
    name: cellphone.name,
    password: cellphone.password,
    phone: cellphone.phone,
    imei: cellphone.imei,
    assigned_to: cellphone.assignedTo || null,
  };
}

export function dbEmailToEmail(dbEmail: DbEmail): Email {
  return {
    id: dbEmail.id,
    type: dbEmail.type,
    email: dbEmail.email,
    password: dbEmail.password,
    assignedTo: dbEmail.assigned_to || [],
  };
}

export function emailToDbEmail(email: Partial<Email>): Partial<DbEmail> {
  return {
    type: email.type,
    email: email.email,
    password: email.password,
    assigned_to: email.assignedTo || [],
  };
}
