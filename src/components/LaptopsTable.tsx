'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { columns } from '@/components/laptops/columns';
import { DataTable } from '@/components/laptops/data-table';
import { LaptopForm } from '@/components/laptops/laptop-form';
import { Laptop } from '@/types';

export interface LaptopsTableRef {
  openAddForm: () => void;
}

export const LaptopsTable = forwardRef<LaptopsTableRef>(function LaptopsTable(_, ref) {
  const { laptops, addLaptop, updateLaptop, deleteLaptop, employees } = useAppStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLaptop, setEditingLaptop] = useState<Laptop | undefined>();

  const getEmployeeName = (employeeId?: string) => {
    if (!employeeId) return null;
    const employee = employees.find(emp => emp.id === employeeId);
    return employee?.fullName;
  };

  const handleEdit = (laptop: Laptop) => {
    setEditingLaptop(laptop);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingLaptop(undefined);
    setIsFormOpen(true);
  };

  useImperativeHandle(ref, () => ({
    openAddForm: handleAdd
  }));

  const handleSubmit = async (laptopData: Omit<Laptop, 'id'>) => {
    if (editingLaptop) {
      await updateLaptop(editingLaptop.id, laptopData);
    } else {
      await addLaptop(laptopData);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingLaptop(undefined);
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={laptops}
        meta={{ deleteLaptop, getEmployeeName, onEdit: handleEdit }}
      />
      <LaptopForm
        laptop={editingLaptop}
        open={isFormOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
      />
    </>
  );
});
