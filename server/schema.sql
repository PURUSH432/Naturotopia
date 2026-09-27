CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  farm_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  operation_type TEXT,
  primary_crop TEXT,
  farm_acres NUMERIC,
  delivery_address TEXT,
  state TEXT,
  account_type TEXT NOT NULL DEFAULT 'retail',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  sku TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  category_name TEXT,
  image TEXT,
  gallery JSONB NOT NULL DEFAULT '[]',
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  unit TEXT,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  rating NUMERIC(2, 1),
  reviews_count INTEGER NOT NULL DEFAULT 0,
  badge TEXT,
  badge_type TEXT,
  highlight TEXT,
  description TEXT,
  npk JSONB NOT NULL DEFAULT '{}',
  specs JSONB NOT NULL DEFAULT '{}',
  volume_tiers JSONB NOT NULL DEFAULT '[]',
  tags JSONB NOT NULL DEFAULT '[]',
  application_method TEXT,
  certifications JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cart_items (
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (cart_id, product_id)
);

CREATE TABLE IF NOT EXISTS payment_methods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  payment_method_id TEXT NOT NULL REFERENCES payment_methods(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'processing', 'dispatched', 'completed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'not_required')),
  subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
  discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  freight_cost NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (freight_cost >= 0),
  total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS payment_details JSONB NOT NULL DEFAULT '{}';

CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  product_name TEXT NOT NULL,
  unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  line_total NUMERIC(12, 2) NOT NULL CHECK (line_total >= 0)
);

INSERT INTO payment_methods (id, name, description) VALUES
  ('upi', 'UPI', 'Pay using a UPI ID or supported UPI app.'),
  ('card', 'Debit / Credit Card', 'Secure card payment processing.'),
  ('cod', 'Cash on Delivery', 'Pay when the order is delivered or collected.'),
  ('invoice', 'Net 30 Commercial Invoice', 'Available for approved commercial accounts.'),
  ('wire', 'Bank Wire / ACH Transfer', 'Payment instructions will be provided with the order.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, active = TRUE;
