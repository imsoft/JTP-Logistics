'use client';

import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CellphonesTable, CellphonesTableRef } from '@/components/CellphonesTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CellphonesPage() {
  const tableRef = useRef<CellphonesTableRef>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                Celulares
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Inventario de celulares y smartphones
              </p>
            </div>
            <Button onClick={() => tableRef.current?.openAddForm()} className="sm:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Celular
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dispositivos Móviles</CardTitle>
            <CardDescription>
              Ver y gestionar inventario de celulares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CellphonesTable ref={tableRef} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
