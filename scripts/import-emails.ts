import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface EmailData {
  type: 'administrative' | 'gmail' | 'hotmail' | 'icloud' | 'hosting';
  email: string;
  password: string;
}

// Datos de correos electrónicos extraídos de las imágenes
const emailsData: EmailData[] = [
  // ADMINISTRATIVE EMAILS
  {
    type: 'administrative',
    email: 'admin@jtp.com.mx',
    password: 'admin.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'atencionaclientes@jtp.com.mx',
    password: 'atencionaclientes.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'aux.finanzas@jtp.com.mx',
    password: 'aux.finanzas.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'competitividad@jtp.com.mx',
    password: 'competitividad.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'contabilidad@jtp.com.mx',
    password: 'contabilidad.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'creditoycobranza@jtp.com.mx',
    password: 'creditoycobranza.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'direccion@jtp.com.mx',
    password: 'direccion.jtp.8810',
  },
  {
    type: 'administrative',
    email: 'facturacion@jtp.com.mx',
    password: 'facturacion.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'gerencia@jtp.com.mx',
    password: 'gerencia.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'jefa.finanzas@jtp.com.mx',
    password: 'jefa.finanzas.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'jefa.logistica@jtp.com.mx',
    password: 'jefa.logistica.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'legal@jtp.com.mx',
    password: 'legal.jtp.8810',
  },
  {
    type: 'administrative',
    email: 'monitoreo@jtp.com.mx',
    password: 'monitoreo.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'notificaciones@jtp.com.mx',
    password: 'notificaciones.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'octavio.tirado@jtp.com.mx',
    password: 'octavio.tirado.jtp.8810',
  },
  {
    type: 'administrative',
    email: 'operaciones@jtp.com.mx',
    password: 'operaciones.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'pagos@jtp.com.mx',
    password: 'pagos.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'peter.maxwell@jtp.com.mx',
    password: 'peter.maxwell.jtp.8810',
  },
  {
    type: 'administrative',
    email: 'pricing@jtp.com.mx',
    password: 'pricing.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'proveedores@jtp.com.mx',
    password: 'proveedores.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'software@jtp.com.mx',
    password: 'software.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico@jtp.com.mx',
    password: 'trafico.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico.gdl@jtp.com.mx',
    password: 'trafico.gdl.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico.mexico@jtp.com.mx',
    password: 'trafico.mexico.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico.monterrey@jtp.com.mx',
    password: 'trafico.monterrey.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico1@jtp.com.mx',
    password: 'trafico1.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico2@jtp.com.mx',
    password: 'trafico2.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico3@jtp.com.mx',
    password: 'trafico3.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico4@jtp.com.mx',
    password: 'trafico4.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'ventas@jtp.com.mx',
    password: 'ventas.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'trafico.vespertino@jtp.com.mx',
    password: 'trafico.vespertino.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'bancos@jtp.com.mx',
    password: 'bancos.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'importaciones@jtp.com.mx',
    password: 'importaciones.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'calidad@jtp.com.mx',
    password: 'calidad.jtp.2487',
  },
  {
    type: 'administrative',
    email: 'gerencia.operativa@jtp.com.mx',
    password: 'gerencia.operativa.2487',
  },

  // GMAIL
  {
    type: 'gmail',
    email: 'jtp.jefafinanzas@gmail.com',
    password: 'Finanzas2024*',
  },
  {
    type: 'gmail',
    email: 'jtp.auxfinanzas@gmail.com',
    password: 'auxfinanzas2023',
  },
  {
    type: 'gmail',
    email: 'aux.finanzas.jtplogistics@gmail.com',
    password: 'Creditojfr151210',
  },
  {
    type: 'gmail',
    email: 'jtp.gerencia@gmail.com',
    password: 'Micaela2024!',
  },
  {
    type: 'gmail',
    email: 'jtp.jefalogistica@gmail.com',
    password: 'Maribeljfr151210',
  },
  {
    type: 'gmail',
    email: 'jtp.monitoreo@gmail.com',
    password: 'Davidjfr151210',
  },
  {
    type: 'gmail',
    email: 'jtp.pricing@gmail.com',
    password: 'liztjfr151210',
  },
  {
    type: 'gmail',
    email: 'nubejtpjtplogistics@gmail.com',
    password: 'Contajfr151210',
  },
  {
    type: 'gmail',
    email: 'jtp.auxtrafico@gmail.com',
    password: 'Susanajfr151210',
  },
  {
    type: 'gmail',
    email: 'jtp.traficovespertino@gmail.com',
    password: 'Tardejfr151210',
  },
  {
    type: 'gmail',
    email: 'jtp.trafico3@gmail.com',
    password: 'Trafico3jfr151210',
  },
  {
    type: 'gmail',
    email: 'jtp.trafico.internacional@gmail.com',
    password: 'TraficoInternacionaljfr151210',
  },

  // HOTMAIL
  {
    type: 'hotmail',
    email: 'jtp_direccion@hotmail.com',
    password: 'Bucerias2025',
  },
  {
    type: 'hotmail',
    email: 'jtp.correos@hotmail.com',
    password: 'Bucerias2025',
  },

  // ICLOUD
  {
    type: 'icloud',
    email: 'jtp_gerencia@icloud.com',
    password: 'Karma8812',
  },
  {
    type: 'icloud',
    email: 'trafico.gdl@icloud.com',
    password: 'Trafico2020',
  },
  {
    type: 'icloud',
    email: 'trafico.aux@gmail.com',
    password: 'Caballos88',
  },
  {
    type: 'icloud',
    email: 'jtp.finanzas@icloud.com',
    password: 'Moroleon88',
  },
  {
    type: 'icloud',
    email: 'jtpf1@icloud.com',
    password: 'Sofia2788',
  },
  {
    type: 'icloud',
    email: 'jtp_finanzas@outlook.com',
    password: 'Proveedores88',
  },
  {
    type: 'icloud',
    email: 'jtp.pricing@gmail.com',
    password: 'Compras88',
  },
  {
    type: 'icloud',
    email: 'jtp.monitoreo@gmail.com',
    password: 'Monitoreo2023',
  },
  {
    type: 'icloud',
    email: 'jtp.trafico3@gmail.com',
    password: 'Trafico3.jfr151210',
  },
  {
    type: 'icloud',
    email: 'jtp.auxfinanzas@gmail.com',
    password: 'aux.Finanzas.2025',
  },
  {
    type: 'icloud',
    email: 'aux.finanzas.jtplogistics@gmail.com',
    password: 'Creditojfr151210',
  },
  {
    type: 'icloud',
    email: 'jtp.auxtrafico@gmail.com',
    password: '',
  },
  {
    type: 'icloud',
    email: 'jtp.jefafinanzas@gmail.com',
    password: '',
  },
  {
    type: 'icloud',
    email: 'gerencia@jtp.com.mx',
    password: '',
  },
  {
    type: 'icloud',
    email: 'jtp.trafico.internacional@gmail.com',
    password: 'Jtp.Traf.Int151210',
  },
  {
    type: 'icloud',
    email: 'jtp.traficovespertino@gmail.com',
    password: '',
  },

  // HOSTING
  {
    type: 'hosting',
    email: 'arhurweb@gmail.com',
    password: 'JTP~2021pr0',
  },
];

async function importEmails() {
  console.log('📧 Iniciando importación de correos electrónicos...\n');

  const results = {
    success: 0,
    errors: 0,
    skipped: 0,
    byType: {
      administrative: 0,
      gmail: 0,
      hotmail: 0,
      icloud: 0,
      hosting: 0,
    },
  };

  for (const emailData of emailsData) {
    try {
      // Verificar si el correo ya existe
      const { data: existing } = await supabase
        .from('emails')
        .select('id, email')
        .eq('email', emailData.email)
        .single();

      if (existing) {
        console.log(`⏭️  ${emailData.email} ya existe, saltando...`);
        results.skipped++;
        continue;
      }

      // Insertar el correo
      const { data: email, error } = await supabase
        .from('emails')
        .insert([
          {
            type: emailData.type,
            email: emailData.email,
            password: emailData.password,
            assigned_to: [], // Sin asignar inicialmente
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(`❌ Error al insertar ${emailData.email}:`, error.message);
        results.errors++;
      } else {
        console.log(`✅ ${emailData.email} (${emailData.type}) insertado correctamente`);
        results.success++;
        results.byType[emailData.type]++;
      }
    } catch (err) {
      console.error(`❌ Excepción al insertar ${emailData.email}:`, err);
      results.errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE IMPORTACIÓN');
  console.log('='.repeat(60));
  console.log(`✅ Éxitos: ${results.success}`);
  console.log(`❌ Errores: ${results.errors}`);
  console.log(`⏭️  Saltados (ya existen): ${results.skipped}`);
  console.log('\nPor tipo:');
  console.log(`  📋 Administrative: ${results.byType.administrative}`);
  console.log(`  📬 Gmail: ${results.byType.gmail}`);
  console.log(`  📧 Hotmail: ${results.byType.hotmail}`);
  console.log(`  ☁️  iCloud: ${results.byType.icloud}`);
  console.log(`  🌐 Hosting: ${results.byType.hosting}`);
  console.log('='.repeat(60));
  console.log('\n✨ Importación completada!');
}

// Ejecutar importación
importEmails().catch(console.error);
