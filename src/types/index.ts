export interface Employee {
  id: string;
  fullName: string;
  position: string;
  department: 'logistics' | 'finance' | 'management';
}

export interface Laptop {
  id: string;
  name: string;
  password: string;
  serialNumber: string;
  assignedTo?: string;
}

export interface Cellphone {
  id: string;
  name: string;
  password: string;
  phone: string;
  imei: string;
  assignedTo?: string;
}

export interface Email {
  id: string;
  type: 'administrative' | 'gmail' | 'hotmail' | 'icloud' | 'hosting';
  email: string;
  password: string;
  assignedTo: string[];
}

export interface AppStore {
  employees: Employee[];
  laptops: Laptop[];
  cellphones: Cellphone[];
  emails: Email[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addLaptop: (laptop: Omit<Laptop, 'id'>) => void;
  updateLaptop: (id: string, laptop: Partial<Laptop>) => void;
  deleteLaptop: (id: string) => void;
  addCellphone: (cellphone: Omit<Cellphone, 'id'>) => void;
  updateCellphone: (id: string, cellphone: Partial<Cellphone>) => void;
  deleteCellphone: (id: string) => void;
  addEmail: (email: Omit<Email, 'id'>) => void;
  updateEmail: (id: string, email: Partial<Email>) => void;
  deleteEmail: (id: string) => void;
}
