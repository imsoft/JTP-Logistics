'use client';

import { useState, useEffect } from 'react';
import { Email } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
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

interface EmailFormProps {
  email?: Email;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (email: Omit<Email, 'id'>) => Promise<void>;
}

export function EmailForm({ email, open, onOpenChange, onSubmit }: EmailFormProps) {
  const { employees } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<Omit<Email, 'id'>>({
    type: email?.type || 'gmail',
    email: email?.email || '',
    password: email?.password || '',
    assignedTo: email?.assignedTo || [],
  });

  useEffect(() => {
    if (email) {
      setFormData({
        type: email.type,
        email: email.email,
        password: email.password,
        assignedTo: email.assignedTo || [],
      });
    } else {
      setFormData({
        type: 'gmail',
        email: '',
        password: '',
        assignedTo: [],
      });
    }
  }, [email]);

  const toggleEmployee = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(employeeId)
        ? prev.assignedTo.filter(id => id !== employeeId)
        : [...prev.assignedTo, employeeId]
    }));
  };

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
          <DialogTitle>{email ? 'Editar Correo' : 'Agregar Nuevo Correo'}</DialogTitle>
          <DialogDescription>
            {email ? 'Actualizar información del correo' : 'Agregar un nuevo correo al sistema'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Correo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: 'administrative' | 'gmail' | 'hotmail' | 'icloud' | 'hosting') =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="administrative">Administrativo</SelectItem>
                  <SelectItem value="gmail">Gmail</SelectItem>
                  <SelectItem value="hotmail">Hotmail</SelectItem>
                  <SelectItem value="icloud">iCloud</SelectItem>
                  <SelectItem value="hosting">Hosting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Dirección de Correo *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Asignado a</Label>
              <div className="border rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
                {employees.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hay empleados disponibles</p>
                ) : (
                  employees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`employee-${employee.id}`}
                        checked={formData.assignedTo.includes(employee.id)}
                        onCheckedChange={() => toggleEmployee(employee.id)}
                      />
                      <label
                        htmlFor={`employee-${employee.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {employee.fullName}
                      </label>
                    </div>
                  ))
                )}
              </div>
              {formData.assignedTo.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {formData.assignedTo.length} empleado(s) seleccionado(s)
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : email ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
