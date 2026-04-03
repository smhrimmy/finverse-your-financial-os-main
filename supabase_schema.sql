create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  persona_type text not null check (persona_type in ('salaried', 'high_earner', 'fresher', 'business_owner')),
  full_name text not null,
  greeting text,
  monthly_income numeric(15,2) not null default 0,
  monthly_expenses numeric(15,2) not null default 0,
  currency_code text not null default 'INR',
  is_default boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists profiles_owner_default_idx
on profiles (owner_id, is_default)
where is_default = true;

create unique index if not exists profiles_owner_persona_idx
on profiles (owner_id, persona_type);

create table if not exists net_worth_snapshots (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  cash_balance numeric(15,2) not null default 0,
  investment_balance numeric(15,2) not null default 0,
  crypto_balance numeric(15,2) not null default 0,
  epf_balance numeric(15,2) not null default 0,
  liabilities_balance numeric(15,2) not null default 0,
  total_net_worth numeric(15,2) generated always as (
    cash_balance + investment_balance + crypto_balance + epf_balance - liabilities_balance
  ) stored,
  recorded_at timestamptz not null default timezone('utc', now())
);

create index if not exists net_worth_snapshots_profile_recorded_idx
on net_worth_snapshots (profile_id, recorded_at desc);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  amount numeric(15,2) not null check (amount >= 0),
  type text not null check (type in ('income', 'expense')),
  category text not null default 'Other',
  notes text,
  transaction_date date not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists transactions_profile_date_idx
on transactions (profile_id, transaction_date desc);

create table if not exists portfolio_assets (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  symbol text,
  asset_type text not null check (asset_type in ('stock', 'crypto', 'mutual_fund')),
  quantity numeric(18,6) not null default 0,
  average_buy_price numeric(15,2) not null default 0,
  current_price numeric(15,2) not null default 0,
  broker_name text,
  exchange_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists portfolio_assets_profile_type_idx
on portfolio_assets (profile_id, asset_type);

create table if not exists loans (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  bank_name text not null,
  total_amount numeric(15,2) not null default 0,
  outstanding_amount numeric(15,2) not null default 0,
  emi_amount numeric(15,2) not null default 0,
  interest_rate numeric(6,2) not null default 0,
  next_due_date date,
  loan_status text not null default 'active' check (loan_status in ('active', 'closed', 'paused')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists loans_profile_status_idx
on loans (profile_id, loan_status);

create table if not exists insurance_policies (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  provider_name text not null,
  policy_type text not null check (policy_type in ('life', 'health', 'motor', 'travel', 'business', 'other')),
  coverage_amount numeric(15,2) not null default 0,
  premium_amount numeric(15,2) not null default 0,
  premium_frequency text not null default 'yearly' check (premium_frequency in ('monthly', 'quarterly', 'half_yearly', 'yearly')),
  next_premium_date date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists insurance_policies_profile_type_idx
on insurance_policies (profile_id, policy_type);

create table if not exists ai_insights (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  insight_type text not null default 'neutral' check (insight_type in ('positive', 'warning', 'negative', 'neutral')),
  amount numeric(15,2),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists ai_insights_profile_created_idx
on ai_insights (profile_id, created_at desc);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at
before update on profiles
for each row
execute function set_updated_at();

drop trigger if exists transactions_set_updated_at on transactions;
create trigger transactions_set_updated_at
before update on transactions
for each row
execute function set_updated_at();

drop trigger if exists portfolio_assets_set_updated_at on portfolio_assets;
create trigger portfolio_assets_set_updated_at
before update on portfolio_assets
for each row
execute function set_updated_at();

drop trigger if exists loans_set_updated_at on loans;
create trigger loans_set_updated_at
before update on loans
for each row
execute function set_updated_at();

drop trigger if exists insurance_policies_set_updated_at on insurance_policies;
create trigger insurance_policies_set_updated_at
before update on insurance_policies
for each row
execute function set_updated_at();

alter table profiles enable row level security;
alter table net_worth_snapshots enable row level security;
alter table transactions enable row level security;
alter table portfolio_assets enable row level security;
alter table loans enable row level security;
alter table insurance_policies enable row level security;
alter table ai_insights enable row level security;

drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own"
on profiles
for select
using (auth.uid() = owner_id);

drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own"
on profiles
for insert
with check (auth.uid() = owner_id);

drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own"
on profiles
for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

drop policy if exists "profiles_delete_own" on profiles;
create policy "profiles_delete_own"
on profiles
for delete
using (auth.uid() = owner_id);

drop policy if exists "net_worth_snapshots_select_own" on net_worth_snapshots;
create policy "net_worth_snapshots_select_own"
on net_worth_snapshots
for select
using (exists (
  select 1 from profiles
  where profiles.id = net_worth_snapshots.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "net_worth_snapshots_insert_own" on net_worth_snapshots;
create policy "net_worth_snapshots_insert_own"
on net_worth_snapshots
for insert
with check (exists (
  select 1 from profiles
  where profiles.id = net_worth_snapshots.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "net_worth_snapshots_update_own" on net_worth_snapshots;
create policy "net_worth_snapshots_update_own"
on net_worth_snapshots
for update
using (exists (
  select 1 from profiles
  where profiles.id = net_worth_snapshots.profile_id
    and profiles.owner_id = auth.uid()
))
with check (exists (
  select 1 from profiles
  where profiles.id = net_worth_snapshots.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "net_worth_snapshots_delete_own" on net_worth_snapshots;
create policy "net_worth_snapshots_delete_own"
on net_worth_snapshots
for delete
using (exists (
  select 1 from profiles
  where profiles.id = net_worth_snapshots.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "transactions_select_own" on transactions;
create policy "transactions_select_own"
on transactions
for select
using (exists (
  select 1 from profiles
  where profiles.id = transactions.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "transactions_insert_own" on transactions;
create policy "transactions_insert_own"
on transactions
for insert
with check (exists (
  select 1 from profiles
  where profiles.id = transactions.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "transactions_update_own" on transactions;
create policy "transactions_update_own"
on transactions
for update
using (exists (
  select 1 from profiles
  where profiles.id = transactions.profile_id
    and profiles.owner_id = auth.uid()
))
with check (exists (
  select 1 from profiles
  where profiles.id = transactions.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "transactions_delete_own" on transactions;
create policy "transactions_delete_own"
on transactions
for delete
using (exists (
  select 1 from profiles
  where profiles.id = transactions.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "portfolio_assets_select_own" on portfolio_assets;
create policy "portfolio_assets_select_own"
on portfolio_assets
for select
using (exists (
  select 1 from profiles
  where profiles.id = portfolio_assets.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "portfolio_assets_insert_own" on portfolio_assets;
create policy "portfolio_assets_insert_own"
on portfolio_assets
for insert
with check (exists (
  select 1 from profiles
  where profiles.id = portfolio_assets.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "portfolio_assets_update_own" on portfolio_assets;
create policy "portfolio_assets_update_own"
on portfolio_assets
for update
using (exists (
  select 1 from profiles
  where profiles.id = portfolio_assets.profile_id
    and profiles.owner_id = auth.uid()
))
with check (exists (
  select 1 from profiles
  where profiles.id = portfolio_assets.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "portfolio_assets_delete_own" on portfolio_assets;
create policy "portfolio_assets_delete_own"
on portfolio_assets
for delete
using (exists (
  select 1 from profiles
  where profiles.id = portfolio_assets.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "loans_select_own" on loans;
create policy "loans_select_own"
on loans
for select
using (exists (
  select 1 from profiles
  where profiles.id = loans.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "loans_insert_own" on loans;
create policy "loans_insert_own"
on loans
for insert
with check (exists (
  select 1 from profiles
  where profiles.id = loans.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "loans_update_own" on loans;
create policy "loans_update_own"
on loans
for update
using (exists (
  select 1 from profiles
  where profiles.id = loans.profile_id
    and profiles.owner_id = auth.uid()
))
with check (exists (
  select 1 from profiles
  where profiles.id = loans.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "loans_delete_own" on loans;
create policy "loans_delete_own"
on loans
for delete
using (exists (
  select 1 from profiles
  where profiles.id = loans.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "insurance_policies_select_own" on insurance_policies;
create policy "insurance_policies_select_own"
on insurance_policies
for select
using (exists (
  select 1 from profiles
  where profiles.id = insurance_policies.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "insurance_policies_insert_own" on insurance_policies;
create policy "insurance_policies_insert_own"
on insurance_policies
for insert
with check (exists (
  select 1 from profiles
  where profiles.id = insurance_policies.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "insurance_policies_update_own" on insurance_policies;
create policy "insurance_policies_update_own"
on insurance_policies
for update
using (exists (
  select 1 from profiles
  where profiles.id = insurance_policies.profile_id
    and profiles.owner_id = auth.uid()
))
with check (exists (
  select 1 from profiles
  where profiles.id = insurance_policies.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "insurance_policies_delete_own" on insurance_policies;
create policy "insurance_policies_delete_own"
on insurance_policies
for delete
using (exists (
  select 1 from profiles
  where profiles.id = insurance_policies.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "ai_insights_select_own" on ai_insights;
create policy "ai_insights_select_own"
on ai_insights
for select
using (exists (
  select 1 from profiles
  where profiles.id = ai_insights.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "ai_insights_insert_own" on ai_insights;
create policy "ai_insights_insert_own"
on ai_insights
for insert
with check (exists (
  select 1 from profiles
  where profiles.id = ai_insights.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "ai_insights_update_own" on ai_insights;
create policy "ai_insights_update_own"
on ai_insights
for update
using (exists (
  select 1 from profiles
  where profiles.id = ai_insights.profile_id
    and profiles.owner_id = auth.uid()
))
with check (exists (
  select 1 from profiles
  where profiles.id = ai_insights.profile_id
    and profiles.owner_id = auth.uid()
));

drop policy if exists "ai_insights_delete_own" on ai_insights;
create policy "ai_insights_delete_own"
on ai_insights
for delete
using (exists (
  select 1 from profiles
  where profiles.id = ai_insights.profile_id
    and profiles.owner_id = auth.uid()
));
