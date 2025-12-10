-- Insert employees (will be referenced by laptops, cellphones, and emails)
insert into public.employees (id, full_name, position, department, gmail, icloud, administrative_emails, phone, cellphone, password, imei, laptop, laptop_password, serial_number)
values
  (
    '00000000-0000-0000-0000-000000000001',
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
    '00000000-0000-0000-0000-000000000002',
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
    '00000000-0000-0000-0000-000000000003',
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
  );

-- Insert laptops
insert into public.laptops (name, cellphone, password, serial_number, assigned_to)
values
  ('Laptop Acer Aspire 3 A315-53 (Logística)', '', '15121029', 'NXHAFAL00290702A163400', null),
  ('ASUS Vivobook Go 14 (Finanzas)', '', '151210', 'S3N0CV0763341IA', null),
  ('ASUS Vivobook Go 14 (Finanzas 2)', '', '151210', 'S3N0CV07630O118', null),
  ('ASUS Vivobook Go 14 (Logística)', '', '151210', 'S2N0CV08R945099', '00000000-0000-0000-0000-000000000002'),
  ('Laptop Acer Aspire 3 A315-53', '', '151210', 'NXHAFAL00290702BC23400', null),
  ('Macbook Air (Finanzas)', '', 'JFR15I2I02R9', 'HXJM2A8Q1WFV', null),
  ('Macbook Air (Pricing)', '', 'mica2024', 'C02KG39KQ6LR', null),
  ('Macbook Air (Logística)', '', 'OPERACIONES2023', 'HXJM60AW1WFV', '00000000-0000-0000-0000-000000000001'),
  ('Lenovo IdeaPad 3', '', '151210', 'PF9XB2506004', null),
  ('Lenovo IdeaPad 3 (Logística)', '', '151210', 'PF9XB2427043', '00000000-0000-0000-0000-000000000003');

-- Insert cellphones
insert into public.cellphones (name, cellphone, password, phone, imei, assigned_to)
values
  ('IPhone SE', '', '151210', '3313441311', '356783113954607', '00000000-0000-0000-0000-000000000003'),
  ('IPhone 8', '', '151210', '3316988299', '359496082244135', null),
  ('IPhone 8 (Finanzas)', '', '', '3327408947', '352990099533099', null),
  ('IPhone 7', '', '151210', '3318102500', '355328085454482', null),
  ('IPhone 6s', '', '151210', '3327408947', '358565071910426', null),
  ('IPhone 6', '', '1512', '', '359300067556697', null),
  ('IPhone 8 Plus', '', '151210', '3342100448', '352976091566153', null),
  ('IPhone 11 Pro', '', '182792', '3315841738', '353833103467509', null),
  ('IPhone 11 (Logística)', '', '0.2032.0', '3330580733', '356575106984561', '00000000-0000-0000-0000-000000000001'),
  ('IPhone 12', '', '151210', '3332431035', '351696726005937', '00000000-0000-0000-0000-000000000002'),
  ('Moto G8 Power', '', '151210', '3322370586', '359099106829277', null),
  ('IPhone 11 Pro (Nuevo)', '', '151210', '3312624830', '353840104497021', null);

-- Insert emails
insert into public.emails (type, email, password, username, assigned_to)
values
  ('administrative', 'admin@jtp.com.mx', 'admin.jtp.2487', null, null),
  ('administrative', 'atencionaclientes@jtp.com.mx', 'atencionaclientes.jtp.2487', null, null),
  ('administrative', 'aux.finanzas@jtp.com.mx', 'aux.finanzas.jtp.2487', null, null),
  ('administrative', 'competitividad@jtp.com.mx', 'competitividad.jtp.2487', null, '00000000-0000-0000-0000-000000000001'),
  ('administrative', 'contabilidad@jtp.com.mx', 'contabilidad.jtp.2487', null, null),
  ('gmail', 'jtp.jefalogistica@gmail.com', 'Maribeljfr151210', null, '00000000-0000-0000-0000-000000000001'),
  ('gmail', 'jtp.auxfinanzas@gmail.com', 'auxfinanzas2023', null, null),
  ('gmail', 'aux.finanzas.jtplogistics@gmail.com', 'Creditojfr151210', null, null),
  ('hotmail', 'jtp_direccion@hotmail.com', 'Bucerias2025', null, null),
  ('hotmail', 'jtp.correos@hotmail.com', 'Bucerias2025', null, null),
  ('icloud', 'jtp.gerencia@icloud.com', 'Karma8812', null, null),
  ('icloud', 'trafico.gdl@icloud.com', 'Trafico2020', null, '00000000-0000-0000-0000-000000000001');
