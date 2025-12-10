'use client';

import { useState, useEffect } from 'react';
import { Employee } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EmployeeFormProps {
  employee?: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (employee: Omit<Employee, 'id'>) => Promise<void>;
}

export function EmployeeForm({ employee, open, onOpenChange, onSubmit }: EmployeeFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    fullName: '',
    position: '',
    department: 'logistics',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName,
        position: employee.position,
        department: employee.department,
      });
    } else {
      setFormData({
        fullName: '',
        position: '',
        department: 'logistics',
      });
    }
  }, [employee, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{employee ? 'Editar Empleado' : 'Agregar Nuevo Empleado'}</DialogTitle>
          <DialogDescription>
            {employee ? 'Actualizar información del empleado' : 'Agregar un nuevo empleado al sistema. Asigna equipos y correos desde sus respectivas secciones.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nombre Completo *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Puesto *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Gerente de Operaciones"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Departamento *</Label>
              <Select
                value={formData.department}
                onValueChange={(value: 'logistics' | 'finance') =>
                  setFormData({ ...formData, department: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="logistics">Logística</SelectItem>
                  <SelectItem value="finance">Finanzas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : employee ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
