'use client';

import { useState } from 'react';
import { Employee, Laptop, Cellphone, Email } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Laptop as LaptopIcon, Smartphone, Mail, User, Briefcase, Building2, Eye, EyeOff, Copy, Check } from 'lucide-react';

function PasswordCell({ password }: { password: string }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-sm min-w-[80px]">
        {show ? password : '••••••••'}
      </span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{show ? 'Ocultar' : 'Mostrar'}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? '¡Copiado!' : 'Copiar'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

interface EmployeeDetailsModalProps {
  employee: Employee | null;
  laptops: Laptop[];
  cellphones: Cellphone[];
  emails: Email[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getDepartmentLabel = (department: 'logistics' | 'finance') => {
  return department === 'logistics' ? 'Logística' : 'Finanzas';
};

const getEmailTypeLabel = (type: Email['type']) => {
  const labels = {
    administrative: 'Administrativo',
    gmail: 'Gmail',
    hotmail: 'Hotmail',
    icloud: 'iCloud',
    hosting: 'Hosting',
  };
  return labels[type];
};

export function EmployeeDetailsModal({
  employee,
  laptops,
  cellphones,
  emails,
  open,
  onOpenChange,
}: EmployeeDetailsModalProps) {
  if (!employee) return null;

  const assignedLaptops = laptops.filter(l => l.assignedTo === employee.id);
  const assignedCellphones = cellphones.filter(c => c.assignedTo === employee.id);

  // Orden de prioridad para tipos de correo
  const emailTypeOrder: Record<Email['type'], number> = {
    administrative: 1,
    gmail: 2,
    hotmail: 3,
    icloud: 4,
    hosting: 5,
  };

  const assignedEmails = emails
    .filter(e => e.assignedTo.includes(employee.id))
    .sort((a, b) => emailTypeOrder[a.type] - emailTypeOrder[b.type]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            {employee.fullName}
          </DialogTitle>
          <DialogDescription>
            Información del empleado y recursos asignados
          </DialogDescription>
        </DialogHeader>

        {/* Employee Info */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Puesto:</span>
            <span className="font-medium">{employee.position}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Departamento:</span>
            <span className="font-medium">{getDepartmentLabel(employee.department)}</span>
          </div>
        </div>

        <Separator />

        {/* Laptops Section */}
        <div className="py-4">
          <h3 className="flex items-center gap-2 font-semibold mb-3">
            <LaptopIcon className="h-4 w-4" />
            Laptops ({assignedLaptops.length})
          </h3>
          {assignedLaptops.length > 0 ? (
            <div className="space-y-2">
              {assignedLaptops.map((laptop) => (
                <div
                  key={laptop.id}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{laptop.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Serie: {laptop.serialNumber}
                    </p>
                  </div>
                  <PasswordCell password={laptop.password} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No tiene laptops asignadas
            </p>
          )}
        </div>

        <Separator />

        {/* Cellphones Section */}
        <div className="py-4">
          <h3 className="flex items-center gap-2 font-semibold mb-3">
            <Smartphone className="h-4 w-4" />
            Celulares ({assignedCellphones.length})
          </h3>
          {assignedCellphones.length > 0 ? (
            <div className="space-y-2">
              {assignedCellphones.map((cellphone) => (
                <div
                  key={cellphone.id}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{cellphone.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Tel: {cellphone.phone} • IMEI: {cellphone.imei}
                    </p>
                  </div>
                  <PasswordCell password={cellphone.password} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No tiene celulares asignados
            </p>
          )}
        </div>

        <Separator />

        {/* Emails Section */}
        <div className="py-4">
          <h3 className="flex items-center gap-2 font-semibold mb-3">
            <Mail className="h-4 w-4" />
            Correos ({assignedEmails.length})
          </h3>
          {assignedEmails.length > 0 ? (
            <div className="space-y-2">
              {assignedEmails.map((email) => (
                <div
                  key={email.id}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{email.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Tipo: {getEmailTypeLabel(email.type)}
                    </p>
                  </div>
                  <PasswordCell password={email.password} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No tiene correos asignados
            </p>
          )}
        </div>

        {/* Summary */}
        {assignedLaptops.length === 0 && assignedCellphones.length === 0 && assignedEmails.length === 0 && (
          <div className="py-4 text-center">
            <p className="text-muted-foreground">
              Este empleado no tiene recursos asignados
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

