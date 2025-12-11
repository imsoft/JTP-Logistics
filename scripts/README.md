# Scripts de Importación

## Importación de Empleados

Este script importa todos los empleados desde los datos del Google Sheets directamente a Supabase.

### Requisitos previos

1. Tener las variables de entorno configuradas en `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

### Uso

```bash
pnpm run import:employees
```

### Qué hace el script

1. **Importa empleados** con todos sus datos:
   - Información personal (nombre completo, puesto, departamento)
   - Correos (Gmail, iCloud, correos administrativos)
   - Teléfono y celular
   - Contraseñas de celular
   - IMEI del celular
   - Información de laptop (nombre, contraseña, número de serie)

2. **Genera un archivo de IDs**: `scripts/employee-ids.json` que contiene un mapeo de nombre completo → UUID para futuras referencias

### Datos incluidos

El script incluye los datos de los siguientes empleados:

- Maribel Ramirez Areyano (Jefa de Logística)
- Susana Cardozo (Ejecutiva - Logística)
- David Illescas (Ejecutivo - Logística)
- Ivan Hernandez Torres (Auxiliar Tráfico Internacional)
- Isabel Huerta (Jefa de Finanzas)
- Lizbeth Murrieta (Ejecutiva - Finanzas)
- Mario Barajas (Tráfico vespertino)

### Notas importantes

- **El script NO crea laptops ni celulares como entidades separadas**, solo guarda la información en los campos legacy de la tabla `employees`
- Si necesitas crear laptops y celulares como entidades independientes con relaciones FK, necesitarás un script adicional
- Los correos administrativos se guardan como array en el campo `administrative_emails`
- El script valida que el departamento sea 'logistics' o 'finance'

### Agregar más empleados

Para agregar más empleados, edita el array `employeesData` en `scripts/import-employees.ts` siguiendo la estructura:

```typescript
{
  fullName: 'Nombre Completo',
  position: 'Puesto',
  department: 'logistics' | 'finance',
  gmail: 'correo@gmail.com',
  icloud: 'correo@icloud.com',
  administrativeEmails: ['correo1@jtp.com.mx', 'correo2@jtp.com.mx'],
  phone: 'Modelo del teléfono',
  cellphone: 'número',
  cellphonePassword: 'contraseña',
  imei: 'IMEI',
  laptop: 'Modelo de laptop',
  laptopPassword: 'contraseña',
  serialNumber: 'S/N',
}
```

### Troubleshooting

Si obtienes errores:

1. **Error de conexión a Supabase**: Verifica tus variables de entorno
2. **Error de permisos**: Asegúrate de que las políticas RLS permitan inserciones
3. **Error de duplicados**: Si ya ejecutaste el script, los empleados pueden estar duplicados. Limpia la tabla `employees` primero.

## Script de limpieza (opcional)

Si necesitas limpiar la base de datos antes de volver a importar:

```sql
-- Ejecuta esto en el SQL Editor de Supabase
DELETE FROM employees;
DELETE FROM laptops;
DELETE FROM cellphones;
DELETE FROM emails;
```

⚠️ **ADVERTENCIA**: Esto eliminará TODOS los datos de las tablas.
