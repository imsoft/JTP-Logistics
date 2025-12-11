-- ============================================================
-- IMPORTACIÓN DE EMPLEADOS
-- Total: 7 empleados (4 Logística, 3 Finanzas)
-- ============================================================

INSERT INTO employees (
  full_name,
  position,
  department,
  gmail,
  icloud,
  administrative_emails,
  phone,
  cellphone,
  password,
  imei,
  laptop,
  laptop_password,
  serial_number
) VALUES
-- LOGÍSTICA
(
  'Maribel Ramirez Areyano',
  'Jefa de Logística',
  'logistics',
  'jtp.jefalogistica@gmail.com',
  'trafico.gdl@icloud.com',
  ARRAY['trafico.gdl@jtp.com.mx', 'competitividad@jtp.com.mx', 'jefa.logistica@jtp.com.mx', 'operaciones@jtp.com.mx'],
  'IPhone 11 (Logística)',
  '3330580733',
  '0.2032.0',
  '356575106984561',
  'Macbook Air (Logística)',
  'OPERACIONES2023',
  'HXJM60AW1WFV'
),
(
  'Susana Cardozo',
  'Ejecutiva',
  'logistics',
  'jtp.auxtrafico@gmail.com',
  'jtp.auxtrafico@gmail.com',
  ARRAY['competitividad@jtp.com.mx', 'trafico.gdl@jtp.com.mx'],
  'IPhone 12',
  '3332431035',
  '151210',
  '351696726005937',
  'ASUS Vivobook Go 14 (Logística)',
  '151210',
  'S2N0CV08R945099'
),
(
  'David Illescas',
  'Ejecutivo',
  'logistics',
  'jtp.monitoreo@gmail.com',
  'jtp.monitoreo@gmail.com',
  ARRAY['monitoreo@jtp.com.mx'],
  'IPhone SE',
  '3313441311',
  '151210',
  '356783113954607',
  'Lenovo IdeaPad 3 (Logística)',
  '151210',
  'PF9XB2427043'
),
(
  'Ivan Hernandez Torres',
  'Auxiliar Tráfico Internacional',
  'logistics',
  'jtp.trafico.internacional@gmail.com',
  'jtp.trafico.internacional@gmail.com',
  ARRAY['competitividad@jtp.com.mx'],
  'IPhone 11 Pro (Nuevo)',
  '3312624830',
  '151210',
  '353840104497021',
  'Laptop Acer Aspire 3 A315-53 (Logística)',
  '15121029',
  'NXHAFAL00290702A163400'
),
(
  'Mario Barajas',
  'Tráfico vespertino',
  'logistics',
  'jtp.traficovespertino@gmail.com',
  'jtp.traficovespertino@gmail.com',
  ARRAY['trafico2@jtp.com.mx'],
  'IPhone 8',
  '3316988299',
  '151210',
  '359496082244135',
  'Lenovo IdeaPad 3 (Logística)',
  '151210',
  'PF9XB2427043'
),

-- FINANZAS
(
  'Isabel Huerta',
  'Jefa de Finanzas',
  'finance',
  'jtp.jefafinanzas@gmail.com',
  'jtp.jefafinanzas@gmail.com',
  ARRAY['jefa.finanzas@jtp.com.mx', 'aux.finanzas@jtp.com.mx', 'creditoycobranza@jtp.com.mx', 'facturacion@jtp.com.mx', 'proveedores@jtp.com.mx'],
  'Iphone 8 Plus',
  '3342100448',
  '151210',
  '352976091566153',
  'Macbook Air (Finanzas)',
  'JFR1512102R9',
  'HXJM2ABQ1WFV'
),
(
  'Lizbeth Murrieta',
  'Ejecutiva',
  'finance',
  'jtp.auxfinanzas@gmail.com',
  'jtp_finanzas@outlook.com',
  ARRAY['competitividad@jtp.com.mx', 'proveedores@jtp.com.mx'],
  'Iphone 7',
  '3318102500',
  '151210',
  '355328085454482',
  'ASUS Vivobook Go 14 (Finanzas)',
  '151210',
  'S3N0CV07633411A'
)
ON CONFLICT (cellphone) DO NOTHING;

-- Nota: Se usa cellphone como criterio de unicidad porque es único por empleado
-- Si el empleado ya existe (mismo número de celular), no se insertará de nuevo

-- ============================================================
-- VERIFICACIÓN
-- ============================================================
-- Ejecuta estas consultas para verificar la importación:

-- Total de empleados por departamento:
-- SELECT department, COUNT(*) as total FROM employees GROUP BY department;
--
-- Resultado esperado:
-- logistics | 5
-- finance   | 2
-- TOTAL     | 7

-- Listar todos los empleados:
-- SELECT full_name, position, department, cellphone FROM employees ORDER BY department, full_name;
