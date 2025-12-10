# Supabase Database Setup

## Instrucciones para configurar la base de datos

### 1. Ejecutar el esquema de la base de datos

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard/project/agwsxltsdjjuyjwhckly
2. Navega a **SQL Editor** en el menú lateral
3. Haz clic en **New Query**
4. Copia y pega todo el contenido del archivo `schema.sql`
5. Haz clic en **Run** para ejecutar el script

Esto creará:
- Tabla `employees` (empleados)
- Tabla `laptops` (laptops)
- Tabla `cellphones` (celulares)
- Tabla `emails` (correos electrónicos)
- Políticas de RLS (Row Level Security)
- Triggers para `updated_at`

### 2. Cargar los datos iniciales

1. En el **SQL Editor**, crea una nueva query
2. Copia y pega todo el contenido del archivo `seed.sql`
3. Haz clic en **Run** para ejecutar el script

Esto insertará:
- 3 empleados de logística
- 10 laptops (3 asignadas)
- 12 celulares (3 asignados)
- 12 correos electrónicos (3 asignados)

### 3. Verificar los datos

1. Ve a **Table Editor** en el menú lateral
2. Verifica que las siguientes tablas tengan datos:
   - `employees` (3 registros)
   - `laptops` (10 registros)
   - `cellphones` (12 registros)
   - `emails` (12 registros)

## Estructura de la Base de Datos

### Tabla: employees
- `id` (UUID, Primary Key)
- `full_name` (Text)
- `position` (Text)
- `department` (Text: 'logistics' | 'finance')
- `gmail`, `icloud` (Text)
- `administrative_emails` (Text Array)
- `phone`, `cellphone`, `password`, `imei` (Text)
- `laptop`, `laptop_password`, `serial_number` (Text)
- `created_at`, `updated_at` (Timestamp)

### Tabla: laptops
- `id` (UUID, Primary Key)
- `name`, `password`, `serial_number` (Text)
- `cellphone` (Text)
- `assigned_to` (UUID, Foreign Key → employees.id)
- `created_at`, `updated_at` (Timestamp)

### Tabla: cellphones
- `id` (UUID, Primary Key)
- `name`, `password`, `phone`, `imei` (Text)
- `cellphone` (Text)
- `assigned_to` (UUID, Foreign Key → employees.id)
- `created_at`, `updated_at` (Timestamp)

### Tabla: emails
- `id` (UUID, Primary Key)
- `type` (Text: 'administrative' | 'gmail' | 'hotmail' | 'icloud' | 'hosting')
- `email`, `password` (Text)
- `username` (Text, Optional)
- `assigned_to` (UUID, Foreign Key → employees.id)
- `created_at`, `updated_at` (Timestamp)

## Políticas de Seguridad (RLS)

Actualmente, todas las tablas tienen acceso público para lectura, inserción, actualización y eliminación.

**Importante**: En producción, deberías modificar estas políticas para requerir autenticación.
