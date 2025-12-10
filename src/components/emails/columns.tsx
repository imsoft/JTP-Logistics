"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2, User, Pencil, Eye, EyeOff, Copy, Check } from "lucide-react";
import { Email } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const getTypeLabel = (type: Email['type']) => {
  const labels = {
    administrative: 'Administrativo',
    gmail: 'Gmail',
    hotmail: 'Hotmail',
    icloud: 'iCloud',
    hosting: 'Hosting',
  };
  return labels[type];
};

const getTypeColor = (type: Email['type']) => {
  const colors = {
    administrative: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    gmail: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    hotmail: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    icloud: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    hosting: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };
  return colors[type];
};

export const columns: ColumnDef<Email>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as Email['type'];
      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeColor(type)}`}>
          {getTypeLabel(type)}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "password",
    header: "Contraseña",
    cell: ({ row }) => <PasswordCell password={row.getValue("password")} />,
  },
  {
    id: "assignedTo",
    header: "Asignado a",
    cell: ({ row, table }) => {
      const email = row.original;
      const meta = table.options.meta as { getEmployeeName: (id: string) => string | null };
      const assignedTo = email.assignedTo || [];
      
      if (assignedTo.length === 0) {
        return <span className="text-sm text-muted-foreground">Sin asignar</span>;
      }

      const employeeNames = assignedTo
        .map(id => meta?.getEmployeeName(id))
        .filter(Boolean);

      return (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{employeeNames.join(', ')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (value === "all") return true;
      const assignedTo = row.original.assignedTo || [];
      if (value === "assigned") return assignedTo.length > 0;
      if (value === "unassigned") return assignedTo.length === 0;
      return true;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const email = row.original;
      const meta = table.options.meta as {
        deleteEmail: (id: string) => void;
        onEdit: (email: Email) => void;
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(email.email)}
            >
              Copiar correo
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(email.password)}
            >
              Copiar contraseña
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => meta?.onEdit(email)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Editar correo
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => {
                if (confirm(`¿Estás seguro de eliminar ${email.email}?`)) {
                  meta?.deleteEmail(email.id);
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar correo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
