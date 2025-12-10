'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { columns } from '@/components/employees/columns';
import { DataTable } from '@/components/employees/data-table';
import { EmployeeForm } from '@/components/employees/employee-form';
import { EmployeeDetailsModal } from '@/components/employees/employee-details-modal';
import { Employee } from '@/types';

export interface EmployeesTableRef {
  openAddForm: () => void;
}

export const EmployeesTable = forwardRef<EmployeesTableRef>(function EmployeesTable(_, ref) {
  const { employees, laptops, cellphones, emails, addEmployee, updateEmployee, deleteEmployee } = useAppStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleViewDetails = (employee: Employee) => {
    setViewingEmployee(employee);
    setIsDetailsOpen(true);
  };

  const handleAdd = () => {
    setEditingEmployee(undefined);
    setIsFormOpen(true);
  };

  useImperativeHandle(ref, () => ({
    openAddForm: handleAdd
  }));

  const handleSubmit = async (employeeData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, employeeData);
    } else {
      await addEmployee(employeeData);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingEmployee(undefined);
    }
  };

  const handleDetailsOpenChange = (open: boolean) => {
    setIsDetailsOpen(open);
    if (!open) {
      setViewingEmployee(null);
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={employees}
        meta={{ deleteEmployee, onEdit: handleEdit, onViewDetails: handleViewDetails }}
      />
      <EmployeeForm
        employee={editingEmployee}
        open={isFormOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
      />
      <EmployeeDetailsModal
        employee={viewingEmployee}
        laptops={laptops}
        cellphones={cellphones}
        emails={emails}
        open={isDetailsOpen}
        onOpenChange={handleDetailsOpenChange}
      />
    </>
  );
});
