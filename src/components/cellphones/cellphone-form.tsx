'use client';

import { useState, useEffect } from 'react';
import { Cellphone } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface CellphoneFormProps {
  cellphone?: Cellphone;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (cellphone: Omit<Cellphone, 'id'>) => Promise<void>;
}

export function CellphoneForm({ cellphone, open, onOpenChange, onSubmit }: CellphoneFormProps) {
  const { employees } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<Omit<Cellphone, 'id'>>({
    name: cellphone?.name || '',
    password: cellphone?.password || '',
    phone: cellphone?.phone || '',
    imei: cellphone?.imei || '',
    assignedTo: cellphone?.assignedTo,
  });

  useEffect(() => {
    if (cellphone) {
      setFormData({
        name: cellphone.name,
        password: cellphone.password,
        phone: cellphone.phone,
        imei: cellphone.imei,
        assignedTo: cellphone.assignedTo,
      });
    } else {
      setFormData({
        name: '',
        password: '',
        phone: '',
        imei: '',
        assignedTo: undefined,
      });
    }
  }, [cellphone]);

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
          <DialogTitle>{cellphone ? 'Editar Celular' : 'Agregar Nuevo Celular'}</DialogTitle>
          <DialogDescription>
            {cellphone ? 'Actualizar información del celular' : 'Agregar un nuevo celular al sistema'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              <Label htmlFor="imei">IMEI *</Label>
              <Input
                id="imei"
                value={formData.imei}
                onChange={(e) => setFormData({ ...formData, imei: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assignedTo">Asignado a</Label>
              <Select
                value={formData.assignedTo || 'unassigned'}
                onValueChange={(value) =>
                  setFormData({ ...formData, assignedTo: value === 'unassigned' ? undefined : value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="unassigned">Sin asignar</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : cellphone ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
