import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuración de Supabase (asegúrate de tener las variables de entorno)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface EmployeeData {
  fullName: string;
  position: string;
  department: 'logistics' | 'finance';
  gmail: string;
  icloud: string;
  administrativeEmails: string[];
  phone: string;
  cellphone: string;
  cellphonePassword: string;
  imei: string;
  laptop: string;
  laptopPassword: string;
  serialNumber: string;
}

// Datos de los empleados extraídos de las imágenes
const employeesData: EmployeeData[] = [
  {
    fullName: 'Maribel Ramirez Areyano',
    position: 'Jefa de Logística',
    department: 'logistics',
    gmail: 'jtp.jefalogistica@gmail.com',
    icloud: 'trafico.gdl@icloud.com',
    administrativeEmails: [
      'trafico.gdl@jtp.com.mx',
      'competitividad@jtp.com.mx',
      'jefa.logistica@jtp.com.mx',
      'operaciones@jtp.com.mx',
    ],
    phone: 'IPhone 11 (Logística)',
    cellphone: '3330580733',
    cellphonePassword: '0.2032.0',
    imei: '356575106984561',
    laptop: 'Macbook Air (Logística)',
    laptopPassword: 'OPERACIONES2023',
    serialNumber: 'HXJM60AW1WFV',
  },
  {
    fullName: 'Susana Cardozo',
    position: 'Ejecutiva',
    department: 'logistics',
    gmail: 'jtp.auxtrafico@gmail.com',
    icloud: 'jtp.auxtrafico@gmail.com',
    administrativeEmails: [
      'competitividad@jtp.com.mx',
      'trafico.gdl@jtp.com.mx',
    ],
    phone: 'IPhone 12',
    cellphone: '3332431035',
    cellphonePassword: '151210',
    imei: '351696726005937',
    laptop: 'ASUS Vivobook Go 14 (Logística)',
    laptopPassword: '151210',
    serialNumber: 'S2N0CV08R945099',
  },
  {
    fullName: 'David Illescas',
    position: 'Ejecutivo',
    department: 'logistics',
    gmail: 'jtp.monitoreo@gmail.com',
    icloud: 'jtp.monitoreo@gmail.com',
    administrativeEmails: ['monitoreo@jtp.com.mx'],
    phone: 'IPhone SE',
    cellphone: '3313441311',
    cellphonePassword: '151210',
    imei: '356783113954607',
    laptop: 'Lenovo IdeaPad 3 (Logística)',
    laptopPassword: '151210',
    serialNumber: 'PF9XB2427043',
  },
  {
    fullName: 'Ivan Hernandez Torres',
    position: 'Auxiliar Tráfico Internacional',
    department: 'logistics',
    gmail: 'jtp.trafico.internacional@gmail.com',
    icloud: 'jtp.trafico.internacional@gmail.com',
    administrativeEmails: ['competitividad@jtp.com.mx'],
    phone: 'IPhone 11 Pro (Nuevo)',
    cellphone: '3312624830',
    cellphonePassword: '151210',
    imei: '353840104497021',
    laptop: 'Laptop Acer Aspire 3 A315-53 (Logística)',
    laptopPassword: '15121029',
    serialNumber: 'NXHAFAL00290702A163400',
  },
  {
    fullName: 'Isabel Huerta',
    position: 'Jefa de Finanzas',
    department: 'finance',
    gmail: 'jtp.jefafinanzas@gmail.com',
    icloud: 'jtp.jefafinanzas@gmail.com',
    administrativeEmails: [
      'jefa.finanzas@jtp.com.mx',
      'aux.finanzas@jtp.com.mx',
      'creditoycobranza@jtp.com.mx',
      'facturacion@jtp.com.mx',
      'proveedores@jtp.com.mx',
    ],
    phone: 'Iphone 8 Plus',
    cellphone: '3342100448',
    cellphonePassword: '151210',
    imei: '352976091566153',
    laptop: 'Macbook Air (Finanzas)',
    laptopPassword: 'JFR1512102R9',
    serialNumber: 'HXJM2ABQ1WFV',
  },
  {
    fullName: 'Lizbeth Murrieta',
    position: 'Ejecutiva',
    department: 'finance',
    gmail: 'jtp.auxfinanzas@gmail.com',
    icloud: 'jtp_finanzas@outlook.com',
    administrativeEmails: [
      'competitividad@jtp.com.mx',
      'proveedores@jtp.com.mx',
    ],
    phone: 'Iphone 7',
    cellphone: '3318102500',
    cellphonePassword: '151210',
    imei: '355328085454482',
    laptop: 'ASUS Vivobook Go 14 (Finanzas)',
    laptopPassword: '151210',
    serialNumber: 'S3N0CV07633411A',
  },
  {
    fullName: 'Mario Barajas',
    position: 'Tráfico vespertino',
    department: 'logistics',
    gmail: 'jtp.traficovespertino@gmail.com',
    icloud: 'jtp.traficovespertino@gmail.com',
    administrativeEmails: ['trafico2@jtp.com.mx'],
    phone: 'IPhone 8',
    cellphone: '3316988299',
    cellphonePassword: '151210',
    imei: '359496082244135',
    laptop: 'Lenovo IdeaPad 3 (Logística)',
    laptopPassword: '151210',
    serialNumber: 'PF9XB2427043',
  },
];

async function importEmployees() {
  console.log('🚀 Iniciando importación de empleados...\n');

  const results = {
    success: 0,
    errors: 0,
    employeeIds: new Map<string, string>(),
  };

  // Paso 1: Insertar empleados
  console.log('📝 Paso 1: Insertando empleados...');
  for (const emp of employeesData) {
    try {
      const { data: employee, error } = await supabase
        .from('employees')
        .insert([
          {
            full_name: emp.fullName,
            position: emp.position,
            department: emp.department,
            gmail: emp.gmail,
            icloud: emp.icloud,
            administrative_emails: emp.administrativeEmails,
            phone: emp.phone,
            cellphone: emp.cellphone,
            password: emp.cellphonePassword,
            imei: emp.imei,
            laptop: emp.laptop,
            laptop_password: emp.laptopPassword,
            serial_number: emp.serialNumber,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(`❌ Error al insertar ${emp.fullName}:`, error.message);
        results.errors++;
      } else {
        console.log(`✅ ${emp.fullName} insertado correctamente`);
        results.success++;
        results.employeeIds.set(emp.fullName, employee.id);
      }
    } catch (err) {
      console.error(`❌ Excepción al insertar ${emp.fullName}:`, err);
      results.errors++;
    }
  }

  console.log(
    `\n📊 Resultado: ${results.success} éxitos, ${results.errors} errores\n`
  );
  console.log('✨ Importación completada!');

  // Exportar IDs para referencia
  const idsFile = path.join(__dirname, 'employee-ids.json');
  fs.writeFileSync(
    idsFile,
    JSON.stringify(Object.fromEntries(results.employeeIds), null, 2)
  );
  console.log(`\n📄 IDs guardados en: ${idsFile}`);
}

// Ejecutar importación
importEmployees().catch(console.error);
