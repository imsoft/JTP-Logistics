-- Migration: Remove username column from emails table

ALTER TABLE public.emails DROP COLUMN IF EXISTS username;

