-- Migration: Remove cellphone column from laptops table

ALTER TABLE public.laptops DROP COLUMN IF EXISTS cellphone;

