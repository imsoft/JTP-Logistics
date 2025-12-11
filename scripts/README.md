# Scripts de Importación

Hay dos formas de importar datos a Supabase:
1. **Scripts TypeScript** (usando `tsx`) - Recomendado para desarrollo local
2. **Scripts SQL** (usando SQL Editor de Supabase) - Recomendado para importación rápida en producción

---

## Opción 1: Scripts TypeScript

### Importación de Empleados

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

## Importación de Correos Electrónicos

Este script importa todos los correos electrónicos (administrative, gmail, hotmail, icloud, hosting) directamente a Supabase.

### Uso

```bash
pnpm run import:emails
```

### Qué hace el script

1. **Importa correos electrónicos** organizados por tipo:
   - **Administrative** (35 correos): Correos corporativos @jtp.com.mx
   - **Gmail** (12 correos): Cuentas de Gmail de trabajo
   - **Hotmail** (2 correos): Cuentas de Hotmail
   - **iCloud** (17 correos): Cuentas de iCloud y Outlook
   - **Hosting** (1 correo): Cuenta de hosting/web

2. **Valida duplicados**: Verifica si un correo ya existe antes de insertarlo

3. **Muestra estadísticas** por tipo al finalizar

### Datos incluidos

**Total: 67 correos electrónicos** organizados por tipo:

- 📋 **Administrative**: admin@jtp.com.mx, competitividad@jtp.com.mx, facturacion@jtp.com.mx, etc.
- 📬 **Gmail**: jtp.jefalogistica@gmail.com, jtp.jefafinanzas@gmail.com, etc.
- 📧 **Hotmail**: jtp_direccion@hotmail.com, jtp.correos@hotmail.com
- ☁️ **iCloud**: jtp_gerencia@icloud.com, trafico.gdl@icloud.com, etc.
- 🌐 **Hosting**: arhurweb@gmail.com

### Notas importantes

- Los correos se insertan SIN ASIGNAR a empleados (`assigned_to: []`)
- Para asignar correos a empleados, usa la interfaz de la aplicación o un script adicional
- El script valida que no haya duplicados usando el campo `email` (único)
- Algunos correos de iCloud no tienen contraseña en los datos originales (se insertan con string vacío)

### Troubleshooting

Si obtienes errores:

1. **Error de duplicado de email**: El correo ya existe en la base de datos (se salta automáticamente)
2. **Error de tipo inválido**: Verifica que el tipo sea uno de: 'administrative', 'gmail', 'hotmail', 'icloud', 'hosting'
3. **Error de conexión**: Verifica tus variables de entorno

---

## Opción 2: Scripts SQL (Recomendado para importación rápida)

### Archivos SQL disponibles

1. **`supabase/seed-employees.sql`** - Importa los 7 empleados
2. **`supabase/seed-emails.sql`** - Importa los 67 correos electrónicos

### Cómo usar los scripts SQL

1. Abre el **SQL Editor** en tu dashboard de Supabase
2. Copia y pega el contenido del archivo SQL que desees ejecutar
3. Haz clic en **Run** o presiona `Ctrl/Cmd + Enter`
4. Verifica la importación ejecutando las queries de verificación incluidas al final de cada archivo

### Ventajas de usar SQL directo

- ✅ **Más rápido** - Se ejecuta directamente en la base de datos
- ✅ **Sin dependencias** - No necesitas variables de entorno configuradas
- ✅ **Más confiable** - Menos puntos de fallo
- ✅ **Transaccional** - Se ejecuta todo o nada
- ✅ **Ideal para producción** - Perfectos para deployments

### Ejemplo de uso

```sql
-- 1. Abre SQL Editor en Supabase
-- 2. Copia el contenido de supabase/seed-employees.sql
-- 3. Ejecuta el script
-- 4. Verifica con:
SELECT department, COUNT(*) as total FROM employees GROUP BY department;

-- Resultado esperado:
-- logistics | 5
-- finance   | 2
```

### Importación de Correos con SQL

```sql
-- 1. Copia el contenido de supabase/seed-emails.sql
-- 2. Ejecuta el script
-- 3. Verifica con:
SELECT type, COUNT(*) as total FROM emails GROUP BY type ORDER BY type;

-- Resultado esperado:
-- administrative | 35
-- gmail          | 12
-- hotmail        | 2
-- icloud         | 17
-- hosting        | 1
```

---

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
