import { create } from 'zustand';
import type { AppStore, Employee, Laptop, Cellphone, Email } from '@/types';
import { createClient } from '@/lib/supabase/client';
import {
  dbEmployeeToEmployee,
  employeeToDbEmployee,
  dbLaptopToLaptop,
  laptopToDbLaptop,
  dbCellphoneToCellphone,
  cellphoneToDbCellphone,
  dbEmailToEmail,
  emailToDbEmail,
  type DbEmployee,
  type DbLaptop,
  type DbCellphone,
  type DbEmail,
} from '@/types/supabase';

export const useAppStore = create<AppStore>((set, get) => ({
  employees: [],
  laptops: [],
  cellphones: [],
  emails: [],

  // Employees
  addEmployee: async (employee) => {
    const supabase = createClient();
    const dbEmployee = employeeToDbEmployee(employee);

    const { data, error } = await supabase
      .from('employees')
      .insert([dbEmployee])
      .select()
      .single();

    if (error) {
      console.error('Error adding employee:', error);
      return;
    }

    if (data) {
      set((state) => ({
        employees: [...state.employees, dbEmployeeToEmployee(data as DbEmployee)],
      }));
    }
  },

  updateEmployee: async (id, employee) => {
    const supabase = createClient();
    const dbEmployee = employeeToDbEmployee(employee);

    const { data, error } = await supabase
      .from('employees')
      .update(dbEmployee)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating employee:', error);
      return;
    }

    if (data) {
      set((state) => ({
        employees: state.employees.map((e) =>
          e.id === id ? dbEmployeeToEmployee(data as DbEmployee) : e
        ),
      }));
    }
  },

  deleteEmployee: async (id) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting employee:', error);
      return;
    }

    set((state) => ({
      employees: state.employees.filter((e) => e.id !== id),
    }));
  },

  // Laptops
  addLaptop: async (laptop) => {
    const supabase = createClient();
    const dbLaptop = laptopToDbLaptop(laptop);

    const { data, error } = await supabase
      .from('laptops')
      .insert([dbLaptop])
      .select()
      .single();

    if (error) {
      console.error('Error adding laptop:', error);
      return;
    }

    if (data) {
      set((state) => ({
        laptops: [...state.laptops, dbLaptopToLaptop(data as DbLaptop)],
      }));
    }
  },

  updateLaptop: async (id, laptop) => {
    const supabase = createClient();
    const dbLaptop = laptopToDbLaptop(laptop);

    const { data, error } = await supabase
      .from('laptops')
      .update(dbLaptop)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating laptop:', error);
      return;
    }

    if (data) {
      set((state) => ({
        laptops: state.laptops.map((l) =>
          l.id === id ? dbLaptopToLaptop(data as DbLaptop) : l
        ),
      }));
    }
  },

  deleteLaptop: async (id) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('laptops')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting laptop:', error);
      return;
    }

    set((state) => ({
      laptops: state.laptops.filter((l) => l.id !== id),
    }));
  },

  // Cellphones
  addCellphone: async (cellphone) => {
    const supabase = createClient();
    const dbCellphone = cellphoneToDbCellphone(cellphone);

    const { data, error } = await supabase
      .from('cellphones')
      .insert([dbCellphone])
      .select()
      .single();

    if (error) {
      console.error('Error adding cellphone:', error);
      return;
    }

    if (data) {
      set((state) => ({
        cellphones: [...state.cellphones, dbCellphoneToCellphone(data as DbCellphone)],
      }));
    }
  },

  updateCellphone: async (id, cellphone) => {
    const supabase = createClient();
    const dbCellphone = cellphoneToDbCellphone(cellphone);

    const { data, error } = await supabase
      .from('cellphones')
      .update(dbCellphone)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating cellphone:', error);
      return;
    }

    if (data) {
      set((state) => ({
        cellphones: state.cellphones.map((c) =>
          c.id === id ? dbCellphoneToCellphone(data as DbCellphone) : c
        ),
      }));
    }
  },

  deleteCellphone: async (id) => {
    const supabase = createClient();

    const { error} = await supabase
      .from('cellphones')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting cellphone:', error);
      return;
    }

    set((state) => ({
      cellphones: state.cellphones.filter((c) => c.id !== id),
    }));
  },

  // Emails
  addEmail: async (email) => {
    const supabase = createClient();
    const dbEmail = emailToDbEmail(email);

    const { data, error } = await supabase
      .from('emails')
      .insert([dbEmail])
      .select()
      .single();

    if (error) {
      console.error('Error adding email:', error);
      return;
    }

    if (data) {
      set((state) => ({
        emails: [...state.emails, dbEmailToEmail(data as DbEmail)],
      }));
    }
  },

  updateEmail: async (id, email) => {
    const supabase = createClient();
    const dbEmail = emailToDbEmail(email);

    const { data, error } = await supabase
      .from('emails')
      .update(dbEmail)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating email:', error);
      return;
    }

    if (data) {
      set((state) => ({
        emails: state.emails.map((e) =>
          e.id === id ? dbEmailToEmail(data as DbEmail) : e
        ),
      }));
    }
  },

  deleteEmail: async (id) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('emails')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting email:', error);
      return;
    }

    set((state) => ({
      emails: state.emails.filter((e) => e.id !== id),
    }));
  },
}));

// Function to load initial data from Supabase
export async function loadDataFromSupabase() {
  const supabase = createClient();

  const [employeesRes, laptopsRes, cellphonesRes, emailsRes] = await Promise.all([
    supabase.from('employees').select('*'),
    supabase.from('laptops').select('*'),
    supabase.from('cellphones').select('*'),
    supabase.from('emails').select('*'),
  ]);

  const employees = (employeesRes.data || []).map((e: DbEmployee) => dbEmployeeToEmployee(e));
  const laptops = (laptopsRes.data || []).map((l: DbLaptop) => dbLaptopToLaptop(l));
  const cellphones = (cellphonesRes.data || []).map((c: DbCellphone) => dbCellphoneToCellphone(c));
  const emails = (emailsRes.data || []).map((e: DbEmail) => dbEmailToEmail(e));

  useAppStore.setState({
    employees,
    laptops,
    cellphones,
    emails,
  });
}
