# Equipment and Email Assignment Guide

## Overview

This application manages employees and their assigned equipment (laptops, cellphones, emails). The assignment system works from the equipment side, not from the employee side.

## How It Works

### Employee Management
When creating or editing an employee, you only need to provide:
- **Full Name**: The employee's complete name
- **Position**: Their job title
- **Department**: Either Logistics or Finance

**Note:** You do NOT assign equipment or emails when creating/editing an employee.

### Equipment Assignment

To assign equipment or emails to an employee:

1. **Laptops**: Go to the Laptops section and create/edit a laptop. Select the employee from the "Assigned To" dropdown.
2. **Cellphones**: Go to the Cellphones section and create/edit a cellphone. Select the employee from the "Assigned To" dropdown.
3. **Emails**: Go to the Emails section and create/edit an email. Select the employee from the "Assigned To" dropdown.

## Benefits of This Approach

1. **Cleaner Data**: Employees are simple entities with just basic information
2. **Flexible Assignment**: Equipment can be reassigned easily without modifying employee records
3. **Equipment Tracking**: Each piece of equipment has its own record with full details
4. **Better Relationships**: Clear one-to-many relationships (one employee can have multiple laptops, cellphones, emails)

## Example Workflow

### Creating a New Employee with Equipment

1. Go to **Employees** section
2. Click **"Add Employee"**
3. Fill in:
   - Full Name: "Juan Pérez"
   - Position: "Operations Manager"
   - Department: "Logistics"
4. Click **"Create"**

5. Go to **Laptops** section
6. Click **"Add Laptop"**
7. Fill in:
   - Name: "MacBook Pro 16"
   - Password: "laptop123"
   - Serial Number: "ABC123456"
   - Assigned To: "Juan Pérez"
8. Click **"Create"**

9. Go to **Emails** section
10. Click **"Add Email"**
11. Fill in:
    - Type: "Gmail"
    - Email: "juan.perez@company.com"
    - Password: "email123"
    - Assigned To: "Juan Pérez"
12. Click **"Create"**

Now Juan Pérez has a laptop and an email assigned to him!

## Database Migration

If you have an existing database, run the migration script:

```bash
psql -h your-supabase-host -U postgres -d postgres -f supabase/migration-employees.sql
```

Or execute it directly in the Supabase SQL Editor.

