-- Migration: Remove redundant cellphone column from cellphones table
-- Keeping only the 'phone' column for the phone number

ALTER TABLE public.cellphones DROP COLUMN IF EXISTS cellphone;

