'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { columns } from '@/components/cellphones/columns';
import { DataTable } from '@/components/cellphones/data-table';
import { CellphoneForm } from '@/components/cellphones/cellphone-form';
import { Cellphone } from '@/types';

export interface CellphonesTableRef {
  openAddForm: () => void;
}

export const CellphonesTable = forwardRef<CellphonesTableRef>(function CellphonesTable(_, ref) {
  const { cellphones, addCellphone, updateCellphone, deleteCellphone, employees } = useAppStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCellphone, setEditingCellphone] = useState<Cellphone | undefined>();

  const getEmployeeName = (employeeId?: string) => {
    if (!employeeId) return null;
    const employee = employees.find(emp => emp.id === employeeId);
    return employee?.fullName;
  };

  const handleEdit = (cellphone: Cellphone) => {
    setEditingCellphone(cellphone);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingCellphone(undefined);
    setIsFormOpen(true);
  };

  useImperativeHandle(ref, () => ({
    openAddForm: handleAdd
  }));

  const handleSubmit = async (cellphoneData: Omit<Cellphone, 'id'>) => {
    if (editingCellphone) {
      await updateCellphone(editingCellphone.id, cellphoneData);
    } else {
      await addCellphone(cellphoneData);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingCellphone(undefined);
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={cellphones}
        meta={{ deleteCellphone, getEmployeeName, onEdit: handleEdit }}
      />
      <CellphoneForm
        cellphone={editingCellphone}
        open={isFormOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
      />
    </>
  );
});
