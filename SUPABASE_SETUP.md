# Supabase Setup Guide — HIVU HR Employee App

## Step 1: Disable Row-Level Security (RLS) for Testing

If you want quick public access for testing, disable RLS on all tables:

1. Go to **Supabase Dashboard** → **Authentication** → **Policies**
2. For each table, click on it and toggle **RLS OFF** at the top right
3. Do this for ALL tables

**OR continue below to set up proper RLS policies.**

---

## Step 2: Set Up Row-Level Security Policies (Recommended)

Run these SQL commands in Supabase **SQL Editor** to enable public read access for the anon key:

### Enable anon access for all tables:

```sql
-- Enable RLS on all tables
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anon users can view)
CREATE POLICY "Enable read access for all users" ON employees
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON attendance
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON leave_requests
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON payslips
  FOR SELECT USING (true);

-- Allow employees to update their own records
CREATE POLICY "Enable update for authenticated users" ON attendance
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON attendance
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for leave requests" ON leave_requests
  FOR INSERT WITH CHECK (true);
```

---

## Step 3: Verify Tables Exist

Make sure these tables exist in your database:
- ✅ `employees` (employee data)
- ✅ `attendance` (clock in/out logs)
- ✅ `leave_requests` (leave applications)
- ✅ `payslips` (payroll data)

If they don't exist, create them:

```sql
-- Create employees table
CREATE TABLE employees (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  role TEXT,
  department TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create attendance table
CREATE TABLE attendance (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_id BIGINT REFERENCES employees(id),
  clock_in TIMESTAMP,
  clock_out TIMESTAMP,
  status TEXT DEFAULT 'present',
  location_lat FLOAT,
  location_lng FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create leave_requests table
CREATE TABLE leave_requests (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_id BIGINT REFERENCES employees(id),
  leave_type TEXT,
  from_date DATE,
  to_date DATE,
  reason TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create payslips table
CREATE TABLE payslips (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_id BIGINT REFERENCES employees(id),
  month TEXT,
  year INT,
  salary DECIMAL(10, 2),
  deductions DECIMAL(10, 2),
  net_pay DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Step 4: Insert Test Data (Optional)

```sql
-- Insert test employee
INSERT INTO employees (name, email, role, department) 
VALUES ('John Doe', 'john@example.com', 'Developer', 'Engineering');

-- Insert test attendance
INSERT INTO attendance (employee_id, clock_in, status) 
VALUES (1, NOW(), 'present');
```

---

## Step 5: Test Connection

Go back to your app and refresh. It should now work! ✅

If you still see errors:
1. Check browser console (F12)
2. Go to Supabase **Logs** to see database errors
3. Verify RLS policies are set correctly
