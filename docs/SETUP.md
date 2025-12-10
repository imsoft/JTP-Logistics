# JTP Logistics - Setup Instructions

## 🚀 Pasos para configurar la base de datos en Supabase

### 1. Ejecutar el esquema de la base de datos

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard/project/agwsxltsdjjuyjwhckly
2. Haz clic en **SQL Editor** en el menú lateral izquierdo
3. Haz clic en **New Query** (botón superior derecho)
4. Copia **TODO** el contenido del archivo `supabase/schema.sql`
5. Pégalo en el editor
6. Haz clic en **Run** (o presiona Ctrl/Cmd + Enter)

✅ **Verificación**: Deberías ver un mensaje de éxito. Si hay errores, léelos cuidadosamente.

### 2. Cargar los datos iniciales

1. En el **SQL Editor**, haz clic en **New Query** nuevamente
2. Copia **TODO** el contenido del archivo `supabase/seed.sql`
3. Pégalo en el editor
4. Haz clic en **Run**

✅ **Verificación**: Deberías ver un mensaje indicando que se insertaron las filas.

### 3. Verificar que los datos se cargaron correctamente

1. Ve a **Table Editor** en el menú lateral
2. Verifica cada tabla:
   - **employees**: debería tener 3 registros
   - **laptops**: debería tener 10 registros
   - **cellphones**: debería tener 12 registros
   - **emails**: debería tener 12 registros

### 4. Iniciar la aplicación

Una vez que hayas ejecutado los scripts SQL, puedes iniciar la aplicación:

```bash
pnpm dev
```

La aplicación debería:
1. Mostrar un spinner de "Loading data..."
2. Cargar los datos desde Supabase
3. Mostrar las tablas con todos los datos

## 🔧 Configuración completada

Tu aplicación ahora está conectada a Supabase y:

- ✅ Lee datos desde Supabase al iniciar
- ✅ Crea nuevos registros en Supabase
- ✅ Actualiza registros existentes en Supabase
- ✅ Elimina registros de Supabase
- ✅ Todo se sincroniza en tiempo real

## 📊 Estructura de la Base de Datos

### Employees (Empleados)
- Información personal del empleado
- Departamento (logistics/finance)
- Equipos asignados

### Laptops
- Información de laptops
- Relación con empleados (assigned_to)

### Cellphones (Celulares)
- Información de celulares
- Relación con empleados (assigned_to)

### Emails (Correos)
- Información de correos electrónicos
- Tipo (administrative, gmail, hotmail, icloud, hosting)
- Relación con empleados (assigned_to)

## 🔐 Seguridad

Actualmente, las tablas tienen políticas de RLS (Row Level Security) que permiten acceso público para desarrollo.

**⚠️ IMPORTANTE**: Antes de llevar a producción, debes:
1. Implementar autenticación de usuarios
2. Actualizar las políticas de RLS para requerir autenticación
3. Limitar el acceso basado en roles de usuario

## 🆘 Solución de Problemas

### Error: "relation does not exist"
- Asegúrate de haber ejecutado `schema.sql` primero

### Error: "duplicate key value violates unique constraint"
- Ya ejecutaste `seed.sql` antes. Puedes eliminar los datos y volver a ejecutar, o continuar con los datos existentes.

### No se cargan los datos en la aplicación
1. Verifica que las variables de entorno en `.env.local` sean correctas
2. Revisa la consola del navegador (F12) en busca de errores
3. Verifica que las tablas en Supabase tengan datos

### Error de CORS
- Asegúrate de estar usando `localhost:3000`
- Verifica que las URLs en `.env.local` sean correctas

## 📝 Próximos Pasos

Ahora que tu base de datos está configurada, puedes:

1. Agregar autenticación de usuarios
2. Implementar formularios para crear/editar registros
3. Agregar validaciones de datos
4. Implementar búsqueda en tiempo real
5. Agregar filtros avanzados
6. Implementar exportación de datos a Excel/PDF

