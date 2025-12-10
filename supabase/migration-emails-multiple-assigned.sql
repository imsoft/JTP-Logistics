-- Migration: Change emails.assigned_to from single uuid to array of uuids
-- This allows an email to be assigned to multiple employees

-- Step 1: Add new column for multiple assignments
ALTER TABLE public.emails ADD COLUMN assigned_to_new uuid[] DEFAULT '{}';

-- Step 2: Migrate existing data (convert single uuid to array)
UPDATE public.emails
SET assigned_to_new = CASE
  WHEN assigned_to IS NOT NULL THEN ARRAY[assigned_to]
  ELSE '{}'
END;

-- Step 3: Drop the old column
ALTER TABLE public.emails DROP COLUMN assigned_to;

-- Step 4: Rename new column to original name
ALTER TABLE public.emails RENAME COLUMN assigned_to_new TO assigned_to;

-- Note: The foreign key constraint is removed since we now have an array
-- Application-level validation should ensure employee IDs exist

