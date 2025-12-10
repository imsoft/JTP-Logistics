'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { columns } from '@/components/emails/columns';
import { DataTable } from '@/components/emails/data-table';
import { EmailForm } from '@/components/emails/email-form';
import { Email } from '@/types';

export interface EmailsTableRef {
  openAddForm: () => void;
}

export const EmailsTable = forwardRef<EmailsTableRef>(function EmailsTable(_, ref) {
  const { emails, addEmail, updateEmail, deleteEmail, employees } = useAppStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmail, setEditingEmail] = useState<Email | undefined>();

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee?.fullName || null;
  };

  const handleEdit = (email: Email) => {
    setEditingEmail(email);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingEmail(undefined);
    setIsFormOpen(true);
  };

  useImperativeHandle(ref, () => ({
    openAddForm: handleAdd
  }));

  const handleSubmit = async (emailData: Omit<Email, 'id'>) => {
    if (editingEmail) {
      await updateEmail(editingEmail.id, emailData);
    } else {
      await addEmail(emailData);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingEmail(undefined);
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={emails}
        meta={{ deleteEmail, getEmployeeName, onEdit: handleEdit }}
      />
      <EmailForm
        email={editingEmail}
        open={isFormOpen}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
      />
    </>
  );
});
