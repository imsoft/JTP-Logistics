-- Migration to make employee fields optional
-- Run this script on your existing Supabase database to update the employees table

-- Make all equipment-related fields nullable with default values
ALTER TABLE public.employees
  ALTER COLUMN gmail DROP NOT NULL,
  ALTER COLUMN gmail SET DEFAULT '',
  ALTER COLUMN icloud DROP NOT NULL,
  ALTER COLUMN icloud SET DEFAULT '',
  ALTER COLUMN phone DROP NOT NULL,
  ALTER COLUMN phone SET DEFAULT '',
  ALTER COLUMN cellphone DROP NOT NULL,
  ALTER COLUMN cellphone SET DEFAULT '',
  ALTER COLUMN password DROP NOT NULL,
  ALTER COLUMN password SET DEFAULT '',
  ALTER COLUMN imei DROP NOT NULL,
  ALTER COLUMN imei SET DEFAULT '',
  ALTER COLUMN laptop DROP NOT NULL,
  ALTER COLUMN laptop SET DEFAULT '',
  ALTER COLUMN laptop_password DROP NOT NULL,
  ALTER COLUMN laptop_password SET DEFAULT '',
  ALTER COLUMN serial_number DROP NOT NULL,
  ALTER COLUMN serial_number SET DEFAULT '';

-- Update existing records to set empty strings where nulls might exist
UPDATE public.employees
SET
  gmail = COALESCE(gmail, ''),
  icloud = COALESCE(icloud, ''),
  phone = COALESCE(phone, ''),
  cellphone = COALESCE(cellphone, ''),
  password = COALESCE(password, ''),
  imei = COALESCE(imei, ''),
  laptop = COALESCE(laptop, ''),
  laptop_password = COALESCE(laptop_password, ''),
  serial_number = COALESCE(serial_number, '')
WHERE
  gmail IS NULL
  OR icloud IS NULL
  OR phone IS NULL
  OR cellphone IS NULL
  OR password IS NULL
  OR imei IS NULL
  OR laptop IS NULL
  OR laptop_password IS NULL
  OR serial_number IS NULL;
