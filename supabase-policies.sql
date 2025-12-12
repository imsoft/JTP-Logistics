-- Políticas de seguridad para permitir operaciones CRUD en todas las tablas

-- ==================================
-- POLÍTICAS PARA TABLA: employees
-- ==================================

-- Habilitar RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT (lectura)
CREATE POLICY "Enable read access for all users" ON employees
FOR SELECT USING (true);

-- Permitir INSERT (crear)
CREATE POLICY "Enable insert access for all users" ON employees
FOR INSERT WITH CHECK (true);

-- Permitir UPDATE (actualizar)
CREATE POLICY "Enable update access for all users" ON employees
FOR UPDATE USING (true);

-- Permitir DELETE (eliminar)
CREATE POLICY "Enable delete access for all users" ON employees
FOR DELETE USING (true);

-- ==================================
-- POLÍTICAS PARA TABLA: laptops
-- ==================================

-- Habilitar RLS
ALTER TABLE laptops ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT (lectura)
CREATE POLICY "Enable read access for all users" ON laptops
FOR SELECT USING (true);

-- Permitir INSERT (crear)
CREATE POLICY "Enable insert access for all users" ON laptops
FOR INSERT WITH CHECK (true);

-- Permitir UPDATE (actualizar)
CREATE POLICY "Enable update access for all users" ON laptops
FOR UPDATE USING (true);

-- Permitir DELETE (eliminar)
CREATE POLICY "Enable delete access for all users" ON laptops
FOR DELETE USING (true);

-- ==================================
-- POLÍTICAS PARA TABLA: cellphones
-- ==================================

-- Habilitar RLS
ALTER TABLE cellphones ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT (lectura)
CREATE POLICY "Enable read access for all users" ON cellphones
FOR SELECT USING (true);

-- Permitir INSERT (crear)
CREATE POLICY "Enable insert access for all users" ON cellphones
FOR INSERT WITH CHECK (true);

-- Permitir UPDATE (actualizar)
CREATE POLICY "Enable update access for all users" ON cellphones
FOR UPDATE USING (true);

-- Permitir DELETE (eliminar)
CREATE POLICY "Enable delete access for all users" ON cellphones
FOR DELETE USING (true);

-- ==================================
-- POLÍTICAS PARA TABLA: emails
-- ==================================

-- Habilitar RLS
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Permitir SELECT (lectura)
CREATE POLICY "Enable read access for all users" ON emails
FOR SELECT USING (true);

-- Permitir INSERT (crear)
CREATE POLICY "Enable insert access for all users" ON emails
FOR INSERT WITH CHECK (true);

-- Permitir UPDATE (actualizar)
CREATE POLICY "Enable update access for all users" ON emails
FOR UPDATE USING (true);

-- Permitir DELETE (eliminar)
CREATE POLICY "Enable delete access for all users" ON emails
FOR DELETE USING (true);
