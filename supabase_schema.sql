-- Supabase Database Schema for FinVerse

-- Users Table (extends Supabase Auth)
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT,
  persona_type TEXT DEFAULT 'salaried', -- 'salaried', 'high_earner', 'fresher', 'business'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Accounts/Net Worth Table
CREATE TABLE net_worth (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cash_balance DECIMAL(15, 2) DEFAULT 0,
  investment_balance DECIMAL(15, 2) DEFAULT 0,
  crypto_balance DECIMAL(15, 2) DEFAULT 0,
  epf_balance DECIMAL(15, 2) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Transactions Table (Income & Expenses)
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Portfolio Assets Table (Stocks, Crypto, Mutual Funds)
CREATE TABLE portfolio_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  symbol TEXT,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('stock', 'crypto', 'mutual_fund')),
  quantity DECIMAL(15, 6) NOT NULL,
  average_buy_price DECIMAL(15, 2) NOT NULL,
  current_price DECIMAL(15, 2), -- Updated via external API or cron job
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Loans Table
CREATE TABLE loans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  bank_name TEXT,
  total_amount DECIMAL(15, 2) NOT NULL,
  paid_amount DECIMAL(15, 2) DEFAULT 0,
  emi_amount DECIMAL(15, 2) NOT NULL,
  interest_rate DECIMAL(5, 2),
  next_emi_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Insurance Table
CREATE TABLE insurance_policies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  policy_type TEXT NOT NULL, -- e.g., 'Life', 'Health', 'Vehicle'
  coverage_amount DECIMAL(15, 2) NOT NULL,
  premium_amount DECIMAL(15, 2) NOT NULL,
  premium_frequency TEXT DEFAULT 'yearly', -- 'monthly', 'quarterly', 'yearly'
  next_premium_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS Policies (Row Level Security) - Ensure users can only see their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE net_worth ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own net worth" ON net_worth FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own net worth" ON net_worth FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own net worth" ON net_worth FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own transactions" ON transactions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own transactions" ON transactions FOR DELETE USING (auth.uid() = user_id);

-- (Repeat similar policies for portfolio_assets, loans, insurance_policies...)
