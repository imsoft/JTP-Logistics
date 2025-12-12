-- Update department check constraint to include 'management'
ALTER TABLE employees
DROP CONSTRAINT IF EXISTS employees_department_check;

ALTER TABLE employees
ADD CONSTRAINT employees_department_check
CHECK (department = ANY (ARRAY['logistics'::text, 'finance'::text, 'management'::text]));
