-- Create employees table
create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  position text not null,
  department text not null check (department in ('logistics', 'finance')),
  -- Legacy fields kept for backward compatibility but not used in the app
  gmail text default '',
  icloud text default '',
  administrative_emails text[] default '{}',
  phone text default '',
  cellphone text default '',
  password text default '',
  imei text default '',
  laptop text default '',
  laptop_password text default '',
  serial_number text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create laptops table
create table if not exists public.laptops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  password text not null,
  serial_number text not null unique,
  assigned_to uuid references public.employees(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create cellphones table
create table if not exists public.cellphones (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  password text not null,
  phone text not null,
  imei text not null unique,
  assigned_to uuid references public.employees(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create emails table
-- Note: assigned_to is an array to allow multiple employee assignments
create table if not exists public.emails (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('administrative', 'gmail', 'hotmail', 'icloud', 'hosting')),
  email text not null unique,
  password text not null,
  assigned_to uuid[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.employees enable row level security;
alter table public.laptops enable row level security;
alter table public.cellphones enable row level security;
alter table public.emails enable row level security;

-- Create policies for public access (you can modify these later for authentication)
create policy "Allow public read access on employees"
  on public.employees for select
  to anon, authenticated
  using (true);

create policy "Allow public insert access on employees"
  on public.employees for insert
  to anon, authenticated
  with check (true);

create policy "Allow public update access on employees"
  on public.employees for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Allow public delete access on employees"
  on public.employees for delete
  to anon, authenticated
  using (true);

-- Laptops policies
create policy "Allow public read access on laptops"
  on public.laptops for select
  to anon, authenticated
  using (true);

create policy "Allow public insert access on laptops"
  on public.laptops for insert
  to anon, authenticated
  with check (true);

create policy "Allow public update access on laptops"
  on public.laptops for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Allow public delete access on laptops"
  on public.laptops for delete
  to anon, authenticated
  using (true);

-- Cellphones policies
create policy "Allow public read access on cellphones"
  on public.cellphones for select
  to anon, authenticated
  using (true);

create policy "Allow public insert access on cellphones"
  on public.cellphones for insert
  to anon, authenticated
  with check (true);

create policy "Allow public update access on cellphones"
  on public.cellphones for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Allow public delete access on cellphones"
  on public.cellphones for delete
  to anon, authenticated
  using (true);

-- Emails policies
create policy "Allow public read access on emails"
  on public.emails for select
  to anon, authenticated
  using (true);

create policy "Allow public insert access on emails"
  on public.emails for insert
  to anon, authenticated
  with check (true);

create policy "Allow public update access on emails"
  on public.emails for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Allow public delete access on emails"
  on public.emails for delete
  to anon, authenticated
  using (true);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger set_employees_updated_at
  before update on public.employees
  for each row
  execute function public.handle_updated_at();

create trigger set_laptops_updated_at
  before update on public.laptops
  for each row
  execute function public.handle_updated_at();

create trigger set_cellphones_updated_at
  before update on public.cellphones
  for each row
  execute function public.handle_updated_at();

create trigger set_emails_updated_at
  before update on public.emails
  for each row
  execute function public.handle_updated_at();
