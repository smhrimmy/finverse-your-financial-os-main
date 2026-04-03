import { personas as fallbackPersonas } from '../data/personas';
import { isSupabaseConfigured, supabase } from '../utils/supabase';

const categoryColors = {
  Salary: '#22C55E',
  Food: '#F97316',
  Dining: '#F97316',
  Housing: '#3B82F6',
  Rent: '#3B82F6',
  Transport: '#8B5CF6',
  Travel: '#8B5CF6',
  Shopping: '#EC4899',
  Bills: '#14B8A6',
  Utilities: '#14B8A6',
  EMI: '#EF4444',
  SIP: '#22C55E',
  Investment: '#22C55E',
  Crypto: '#A855F7',
  Insurance: '#B026FF',
  Tax: '#F59E0B',
  Business: '#06B6D4',
  Other: '#94A3B8',
};

const seedProfiles = [
  {
    id: 'salaried',
    personaType: 'salaried',
    fullName: 'Rahul Sharma',
    greeting: 'Hi, Rahul',
    monthlyIncome: 95000,
    monthlyExpenses: 62000,
    netWorth: { cash: 320000, investments: 1450000, crypto: 80000, epf: 1000000 },
    netWorthHistory: [2100000, 2200000, 2350000, 2400000, 2500000, 2550000, 2600000, 2650000, 2700000, 2750000, 2800000, 2850000],
    transactions: [
      { title: 'March Salary', amount: 95000, type: 'income', category: 'Salary', transaction_date: '2026-04-01' },
      { title: 'Home Rent', amount: 25000, type: 'expense', category: 'Housing', transaction_date: '2026-04-03' },
      { title: 'SIP - HDFC Flexi Cap', amount: 10000, type: 'expense', category: 'SIP', transaction_date: '2026-04-05' },
      { title: 'Swiggy Order', amount: 1450, type: 'expense', category: 'Food', transaction_date: '2026-04-08' },
      { title: 'Electricity Bill', amount: 2200, type: 'expense', category: 'Bills', transaction_date: '2026-04-10' },
    ],
    portfolio: [
      { name: 'HDFC Flexi Cap', symbol: 'HDFC', asset_type: 'mutual_fund', quantity: 1, average_buy_price: 360000, current_price: 450000 },
      { name: 'Reliance Industries', symbol: 'RELIANCE', asset_type: 'stock', quantity: 100, average_buy_price: 1500, current_price: 1800 },
      { name: 'Bitcoin', symbol: 'BTC', asset_type: 'crypto', quantity: 0.85, average_buy_price: 4700000, current_price: 5882353 },
    ],
    loans: [
      { name: 'Home Loan', bank_name: 'SBI', total_amount: 3500000, outstanding_amount: 2800000, emi_amount: 28500, interest_rate: 8.5, next_due_date: '2026-04-25' },
    ],
    insurance: [
      { name: 'Term Life Insurance', provider_name: 'LIC', policy_type: 'life', coverage_amount: 10000000, premium_amount: 12000, premium_frequency: 'yearly', next_premium_date: '2026-06-15' },
      { name: 'Health Insurance', provider_name: 'Star Health', policy_type: 'health', coverage_amount: 500000, premium_amount: 8500, premium_frequency: 'yearly', next_premium_date: '2026-05-01' },
    ],
    insights: [
      { title: 'You overspent on food this week', insight_type: 'warning', amount: 3200 },
      { title: 'Your SIP returns are trending higher', insight_type: 'positive', amount: 12.4 },
    ],
  },
  {
    id: 'high_earner',
    personaType: 'high_earner',
    fullName: 'Priya Kapoor',
    greeting: 'Welcome back, Priya',
    monthlyIncome: 350000,
    monthlyExpenses: 180000,
    netWorth: { cash: 2500000, investments: 9000000, crypto: 3000000, epf: 4000000 },
    netWorthHistory: [14000000, 14800000, 15200000, 15800000, 16500000, 16800000, 17200000, 17500000, 17800000, 18000000, 18200000, 18500000],
    transactions: [
      { title: 'April Salary', amount: 350000, type: 'income', category: 'Salary', transaction_date: '2026-04-01' },
      { title: 'Stock Purchase - INFY', amount: 50000, type: 'expense', category: 'Investment', transaction_date: '2026-04-03' },
      { title: 'Fine Dining', amount: 8500, type: 'expense', category: 'Dining', transaction_date: '2026-04-04' },
      { title: 'Flight Tickets', amount: 24000, type: 'expense', category: 'Travel', transaction_date: '2026-04-06' },
    ],
    portfolio: [
      { name: 'Infosys', symbol: 'INFY', asset_type: 'stock', quantity: 1000, average_buy_price: 2000, current_price: 2500 },
      { name: 'Bitcoin', symbol: 'BTC', asset_type: 'crypto', quantity: 0.4, average_buy_price: 3000000, current_price: 5000000 },
      { name: 'Mirae Asset Large Cap', symbol: 'MIRAE', asset_type: 'mutual_fund', quantity: 1, average_buy_price: 2800000, current_price: 3500000 },
    ],
    loans: [],
    insurance: [
      { name: 'Term Plan', provider_name: 'Max Life', policy_type: 'life', coverage_amount: 50000000, premium_amount: 45000, premium_frequency: 'yearly', next_premium_date: '2026-07-01' },
    ],
    insights: [
      { title: 'Crypto portfolio is up sharply this quarter', insight_type: 'positive', amount: 42 },
      { title: 'You can still save tax with ELSS this year', insight_type: 'neutral', amount: 50000 },
    ],
  },
  {
    id: 'fresher',
    personaType: 'fresher',
    fullName: 'Arjun Patel',
    greeting: 'Hey Arjun',
    monthlyIncome: 35000,
    monthlyExpenses: 28000,
    netWorth: { cash: 85000, investments: 60000, crypto: 15000, epf: 20000 },
    netWorthHistory: [50000, 65000, 80000, 95000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000],
    transactions: [
      { title: 'April Salary', amount: 35000, type: 'income', category: 'Salary', transaction_date: '2026-04-01' },
      { title: 'Metro Card Recharge', amount: 500, type: 'expense', category: 'Transport', transaction_date: '2026-04-02' },
      { title: 'Zomato Order', amount: 320, type: 'expense', category: 'Food', transaction_date: '2026-04-03' },
      { title: 'Phone Recharge', amount: 599, type: 'expense', category: 'Bills', transaction_date: '2026-04-04' },
    ],
    portfolio: [
      { name: 'Nifty 50 Index Fund', symbol: 'NIFTY50', asset_type: 'mutual_fund', quantity: 1, average_buy_price: 40000, current_price: 45000 },
      { name: 'Polygon', symbol: 'MATIC', asset_type: 'crypto', quantity: 1, average_buy_price: 5000, current_price: 7000 },
    ],
    loans: [
      { name: 'Education Loan', bank_name: 'HDFC Credila', total_amount: 500000, outstanding_amount: 420000, emi_amount: 8500, interest_rate: 9, next_due_date: '2026-04-20' },
    ],
    insurance: [
      { name: 'Basic Health Insurance', provider_name: 'Star Health', policy_type: 'health', coverage_amount: 300000, premium_amount: 4500, premium_frequency: 'yearly', next_premium_date: '2026-08-01' },
    ],
    insights: [
      { title: 'Start a ₹2,000 SIP to build long-term wealth', insight_type: 'neutral', amount: 2000 },
      { title: 'Education loan EMI is coming up soon', insight_type: 'warning', amount: 8500 },
    ],
  },
  {
    id: 'business_owner',
    personaType: 'business_owner',
    fullName: 'Meera Gupta',
    greeting: 'Hello Meera',
    monthlyIncome: 280000,
    monthlyExpenses: 220000,
    netWorth: { cash: 1800000, investments: 5500000, crypto: 200000, epf: 0 },
    netWorthHistory: [9000000, 9500000, 10000000, 10200000, 10800000, 11000000, 11300000, 11600000, 11900000, 12000000, 12200000, 12500000],
    transactions: [
      { title: 'Client Payment Received', amount: 450000, type: 'income', category: 'Business', transaction_date: '2026-04-01' },
      { title: 'Office Rent', amount: 35000, type: 'expense', category: 'Housing', transaction_date: '2026-04-02' },
      { title: 'GST Payment', amount: 85000, type: 'expense', category: 'Tax', transaction_date: '2026-04-05' },
      { title: 'Software Subscription', amount: 15000, type: 'expense', category: 'Business', transaction_date: '2026-04-08' },
    ],
    portfolio: [
      { name: 'Parag Parikh Flexi Cap', symbol: 'PPFAS', asset_type: 'mutual_fund', quantity: 1, average_buy_price: 4200000, current_price: 5000000 },
      { name: 'Gold ETF', symbol: 'GOLDBEES', asset_type: 'stock', quantity: 1000, average_buy_price: 50, current_price: 62 },
    ],
    loans: [
      { name: 'Business Working Capital', bank_name: 'ICICI Bank', total_amount: 1200000, outstanding_amount: 650000, emi_amount: 32000, interest_rate: 11.2, next_due_date: '2026-04-18' },
    ],
    insurance: [
      { name: 'Keyman Insurance', provider_name: 'HDFC Life', policy_type: 'life', coverage_amount: 15000000, premium_amount: 28000, premium_frequency: 'yearly', next_premium_date: '2026-09-01' },
    ],
    insights: [
      { title: 'GST outflow is high this month', insight_type: 'warning', amount: 85000 },
      { title: 'Client collections improved your cash position', insight_type: 'positive', amount: 450000 },
    ],
  },
];

const formatMonthLabel = (date) =>
  date.toLocaleDateString('en-IN', {
    month: 'short',
  });

const buildSparkline = (currentValue, investedValue) => {
  const base = investedValue > 0 ? investedValue : currentValue;
  return [
    base * 0.82,
    base * 0.9,
    base * 0.96,
    currentValue * 0.98,
    currentValue,
  ].map((value, index) => ({
    x: index + 1,
    y: Number(value.toFixed(2)),
  }));
};

const getInsightType = (value) => {
  if (value === 'positive' || value === 'warning' || value === 'negative' || value === 'neutral') {
    return value === 'warning' ? 'negative' : value;
  }
  return 'neutral';
};

const buildGeneratedInsights = ({ transactions, portfolio, loans }) => {
  const expenses = transactions.filter((item) => item.type === 'expense');
  const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const outgoing = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const topExpense = expenses.reduce(
    (top, item) => (Number(item.amount || 0) > Number(top.amount || 0) ? item : top),
    { amount: 0, category: 'Spending' }
  );
  const portfolioPnl = portfolio.reduce((sum, item) => {
    const currentValue = Number(item.current_price || 0) * Number(item.quantity || 0);
    const investedValue = Number(item.average_buy_price || 0) * Number(item.quantity || 0);
    return sum + (currentValue - investedValue);
  }, 0);
  const nextLoan = loans
    .filter((item) => item.next_due_date)
    .sort((a, b) => new Date(a.next_due_date) - new Date(b.next_due_date))[0];

  const insights = [];

  if (topExpense.amount > 0) {
    insights.push({
      id: `generated-expense-${topExpense.category}`,
      title: `${topExpense.category} is your top expense at ₹${Math.round(topExpense.amount).toLocaleString('en-IN')}`,
      type: 'negative',
    });
  }

  if (income > outgoing) {
    insights.push({
      id: 'generated-savings',
      title: `You saved ₹${Math.round(income - outgoing).toLocaleString('en-IN')} this month`,
      type: 'positive',
    });
  }

  if (portfolioPnl !== 0) {
    insights.push({
      id: 'generated-portfolio',
      title: `Portfolio ${portfolioPnl >= 0 ? 'gains' : 'drawdown'} are ₹${Math.round(Math.abs(portfolioPnl)).toLocaleString('en-IN')}`,
      type: portfolioPnl >= 0 ? 'positive' : 'negative',
    });
  }

  if (nextLoan?.emi_amount) {
    insights.push({
      id: `generated-loan-${nextLoan.id}`,
      title: `${nextLoan.name} EMI of ₹${Math.round(nextLoan.emi_amount).toLocaleString('en-IN')} is due soon`,
      type: 'neutral',
    });
  }

  return insights.slice(0, 4);
};

const buildExpenseBreakdown = (transactions) => {
  const totals = transactions
    .filter((item) => item.type === 'expense')
    .reduce((accumulator, item) => {
      const key = item.category || 'Other';
      accumulator[key] = (accumulator[key] || 0) + Number(item.amount || 0);
      return accumulator;
    }, {});

  return Object.entries(totals)
    .map(([name, value]) => ({
      name,
      value,
      color: categoryColors[name] || categoryColors.Other,
    }))
    .sort((left, right) => right.value - left.value);
};

const buildMonthlyData = (transactions) => {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    return {
      key,
      month: formatMonthLabel(date),
      income: 0,
      expenses: 0,
    };
  });

  transactions.forEach((item) => {
    const date = new Date(item.transaction_date || item.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const match = months.find((month) => month.key === key);

    if (!match) {
      return;
    }

    if (item.type === 'income') {
      match.income += Number(item.amount || 0);
      return;
    }

    match.expenses += Number(item.amount || 0);
  });

  return months.map(({ key, ...rest }) => rest);
};

const buildFallbackPersona = (persona) => {
  const transactions = (persona.transactions || []).map((item) => ({
    id: item.id,
    title: item.title,
    amount: Math.abs(Number(item.amount || 0)),
    type: item.type,
    date: item.date,
    category: item.category || 'Other',
  }));

  return {
    id: persona.id,
    name: persona.name,
    greeting: persona.greeting,
    personaType: persona.id,
    monthlyIncome: 0,
    monthlyExpenses: transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0),
    netWorth: persona.netWorth,
    breakdown: persona.breakdown || {
      cash: 0,
      investments: 0,
      crypto: 0,
      epf: 0,
    },
    insights: (persona.insights || []).map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type || 'neutral',
    })),
    transactions,
    portfolio: persona.portfolio || [],
    loans: persona.loans || [],
    insurance: persona.insurance || [],
    expenseBreakdown: buildExpenseBreakdown(transactions),
    monthlyData: buildMonthlyData(transactions),
    netWorthHistory: persona.netWorthHistory || [persona.netWorth || 0],
    isRemote: false,
  };
};

const buildRemotePersona = ({
  profile,
  snapshot,
  history,
  transactions,
  portfolio,
  loans,
  insurance,
  insights,
}) => {
  const breakdown = {
    cash: Number(snapshot?.cash_balance || 0),
    investments: Number(snapshot?.investment_balance || 0),
    crypto: Number(snapshot?.crypto_balance || 0),
    epf: Number(snapshot?.epf_balance || 0),
  };

  const netWorth = Number(snapshot?.total_net_worth || Object.values(breakdown).reduce((sum, value) => sum + value, 0));

  const mappedTransactions = transactions.map((item) => ({
    id: item.id,
    title: item.title,
    amount: Math.abs(Number(item.amount || 0)),
    type: item.type,
    date: item.transaction_date,
    category: item.category || 'Other',
  }));

  const mappedPortfolio = portfolio.map((item) => {
    const quantity = Number(item.quantity || 0);
    const currentPrice = Number(item.current_price || 0);
    const averageBuyPrice = Number(item.average_buy_price || 0);
    const currentValue = Number((quantity * currentPrice).toFixed(2));
    const investedValue = Number((quantity * averageBuyPrice).toFixed(2));
    const profitLoss = Number((currentValue - investedValue).toFixed(2));
    const profitLossPercentage = investedValue > 0 ? Number(((profitLoss / investedValue) * 100).toFixed(2)) : 0;

    return {
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      value: currentValue,
      invested: investedValue,
      profitLoss,
      profitLossPercentage,
      quantity,
      type: item.asset_type,
      sparkline: buildSparkline(currentValue, investedValue),
    };
  });

  const mappedLoans = loans.map((item) => ({
    id: item.id,
    name: item.name,
    bank: item.bank_name,
    totalAmount: Number(item.total_amount || 0),
    paidAmount: Number((Number(item.total_amount || 0) - Number(item.outstanding_amount || 0)).toFixed(2)),
    emiAmount: Number(item.emi_amount || 0),
    interestRate: Number(item.interest_rate || 0),
    nextEmiDate: item.next_due_date,
  }));

  const mappedInsurance = insurance.map((item) => ({
    id: item.id,
    name: item.name,
    type: item.policy_type,
    coverage: Number(item.coverage_amount || 0),
    nextPremiumDate: item.next_premium_date,
    premiumAmount: Number(item.premium_amount || 0),
    frequency: item.premium_frequency,
    provider: item.provider_name,
  }));

  const mappedInsights =
    insights.length > 0
      ? insights.map((item) => ({
          id: item.id,
          title: item.title,
          type: getInsightType(item.insight_type),
        }))
      : buildGeneratedInsights({ transactions, portfolio, loans });

  return {
    id: profile.id,
    name: profile.full_name,
    greeting: profile.greeting || `Hi, ${String(profile.full_name || 'there').split(' ')[0]}`,
    personaType: profile.persona_type,
    isDefault: Boolean(profile.is_default),
    monthlyIncome: Number(profile.monthly_income || 0),
    monthlyExpenses: Number(profile.monthly_expenses || 0),
    netWorth,
    breakdown,
    insights: mappedInsights,
    transactions: mappedTransactions,
    portfolio: mappedPortfolio,
    loans: mappedLoans,
    insurance: mappedInsurance,
    expenseBreakdown: buildExpenseBreakdown(transactions),
    monthlyData: buildMonthlyData(transactions),
    netWorthHistory: history.map((item) => Number(item.total_net_worth || 0)),
    isRemote: true,
  };
};

const ensureSupabaseResponse = ({ data, error }) => {
  if (error) {
    throw error;
  }
  return data;
};

const insertRows = async (table, rows) => {
  if (!rows.length) {
    return [];
  }

  return ensureSupabaseResponse(await supabase.from(table).insert(rows).select());
};

export const getFallbackPersonas = () => fallbackPersonas.map(buildFallbackPersona);

export const getCurrentSession = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const sessionResponse = await supabase.auth.getSession();
  return sessionResponse?.data?.session || null;
};

export const getCurrentUser = async () => {
  const session = await getCurrentSession();
  return session?.user || null;
};

export const listenToAuthChanges = (callback) => {
  if (!supabase) {
    return () => {};
  }

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session || null);
  });

  return () => {
    data?.subscription?.unsubscribe();
  };
};

export const signInWithEmail = async ({ email, password }) => {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const response = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (response.error) {
    throw response.error;
  }

  if (response.data?.user) {
    const existingProfiles = await fetchProfilesWithData(response.data.user.id);

    if (existingProfiles.length === 0) {
      await seedDefaultProfiles(response.data.user.id);
    }
  }

  return response.data;
};

export const signUpWithEmail = async ({ fullName, email, password }) => {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const response = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: fullName?.trim(),
      },
    },
  });

  if (response.error) {
    throw response.error;
  }

  if (response.data?.user && response.data?.session) {
    const existingProfiles = await fetchProfilesWithData(response.data.user.id);

    if (existingProfiles.length === 0) {
      await seedDefaultProfiles(response.data.user.id);
    }
  }

  return response.data;
};

export const signOutUser = async () => {
  if (!supabase) {
    return;
  }

  const response = await supabase.auth.signOut();

  if (response.error) {
    throw response.error;
  }
};

export const subscribeToFinverseRealtime = ({ userId, onChange }) => {
  if (!supabase || !userId) {
    return () => {};
  }

  const channel = supabase
    .channel(`finverse-realtime-${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `owner_id=eq.${userId}` }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_assets' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'loans' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'insurance_policies' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'net_worth_snapshots' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ai_insights' }, onChange)
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

const insertSeedProfile = async (userId, profileSeed, isDefault) => {
  const profileRows = ensureSupabaseResponse(
    await supabase
      .from('profiles')
      .insert({
        owner_id: userId,
        persona_type: profileSeed.personaType,
        full_name: profileSeed.fullName,
        greeting: profileSeed.greeting,
        monthly_income: profileSeed.monthlyIncome,
        monthly_expenses: profileSeed.monthlyExpenses,
        is_default: isDefault,
      })
      .select()
      .limit(1)
  );

  const profile = profileRows[0];

  await Promise.all([
    insertRows(
      'net_worth_snapshots',
      profileSeed.netWorthHistory.map((value, index) => {
        const currentTotal =
          Number(profileSeed.netWorth.cash || 0) +
          Number(profileSeed.netWorth.investments || 0) +
          Number(profileSeed.netWorth.crypto || 0) +
          Number(profileSeed.netWorth.epf || 0);
        const ratio = currentTotal > 0 ? value / currentTotal : 1;

        return {
          profile_id: profile.id,
          cash_balance: Number((profileSeed.netWorth.cash * ratio).toFixed(2)),
          investment_balance: Number((profileSeed.netWorth.investments * ratio).toFixed(2)),
          crypto_balance: Number((profileSeed.netWorth.crypto * ratio).toFixed(2)),
          epf_balance: Number((profileSeed.netWorth.epf * ratio).toFixed(2)),
          recorded_at: new Date(Date.now() - (profileSeed.netWorthHistory.length - index) * 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
      })
    ),
    insertRows(
      'transactions',
      profileSeed.transactions.map((item) => ({
        profile_id: profile.id,
        title: item.title,
        amount: item.amount,
        type: item.type,
        category: item.category,
        transaction_date: item.transaction_date,
      }))
    ),
    insertRows(
      'portfolio_assets',
      profileSeed.portfolio.map((item) => ({
        profile_id: profile.id,
        name: item.name,
        symbol: item.symbol,
        asset_type: item.asset_type,
        quantity: item.quantity,
        average_buy_price: item.average_buy_price,
        current_price: item.current_price,
      }))
    ),
    insertRows(
      'loans',
      profileSeed.loans.map((item) => ({
        profile_id: profile.id,
        name: item.name,
        bank_name: item.bank_name,
        total_amount: item.total_amount,
        outstanding_amount: item.outstanding_amount,
        emi_amount: item.emi_amount,
        interest_rate: item.interest_rate,
        next_due_date: item.next_due_date,
      }))
    ),
    insertRows(
      'insurance_policies',
      profileSeed.insurance.map((item) => ({
        profile_id: profile.id,
        name: item.name,
        provider_name: item.provider_name,
        policy_type: item.policy_type,
        coverage_amount: item.coverage_amount,
        premium_amount: item.premium_amount,
        premium_frequency: item.premium_frequency,
        next_premium_date: item.next_premium_date,
      }))
    ),
    insertRows(
      'ai_insights',
      profileSeed.insights.map((item) => ({
        profile_id: profile.id,
        title: item.title,
        insight_type: item.insight_type,
        amount: item.amount,
      }))
    ),
  ]);
};

export const seedDefaultProfiles = async (userId) => {
  if (!supabase) {
    return [];
  }

  for (let index = 0; index < seedProfiles.length; index += 1) {
    await insertSeedProfile(userId, seedProfiles[index], index === 0);
  }

  return fetchProfilesWithData(userId);
};

export const fetchProfilesWithData = async (userId) => {
  if (!supabase || !userId) {
    return [];
  }

  const profiles = ensureSupabaseResponse(
    await supabase
      .from('profiles')
      .select('*')
      .eq('owner_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: true })
  );

  const personaData = await Promise.all(
    profiles.map(async (profile) => {
      const [history, transactions, portfolio, loans, insurance, insights] = await Promise.all([
        ensureSupabaseResponse(
          await supabase
            .from('net_worth_snapshots')
            .select('*')
            .eq('profile_id', profile.id)
            .order('recorded_at', { ascending: true })
        ),
        ensureSupabaseResponse(
          await supabase
            .from('transactions')
            .select('*')
            .eq('profile_id', profile.id)
            .order('transaction_date', { ascending: false })
        ),
        ensureSupabaseResponse(
          await supabase
            .from('portfolio_assets')
            .select('*')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: true })
        ),
        ensureSupabaseResponse(
          await supabase
            .from('loans')
            .select('*')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: true })
        ),
        ensureSupabaseResponse(
          await supabase
            .from('insurance_policies')
            .select('*')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: true })
        ),
        ensureSupabaseResponse(
          await supabase
            .from('ai_insights')
            .select('*')
            .eq('profile_id', profile.id)
            .order('created_at', { ascending: false })
        ),
      ]);

      const latestSnapshot = history[history.length - 1];

      return buildRemotePersona({
        profile,
        snapshot: latestSnapshot,
        history,
        transactions,
        portfolio,
        loans,
        insurance,
        insights,
      });
    })
  );

  return personaData;
};

export const bootstrapRemotePersonas = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return {
      personas: [],
      source: 'auth',
      user: null,
    };
  }

  const remotePersonas = await fetchProfilesWithData(user.id);

  if (remotePersonas.length > 0) {
    return {
      personas: remotePersonas,
      source: 'remote',
      user,
    };
  }

  const seededPersonas = await seedDefaultProfiles(user.id);

  return {
    personas: seededPersonas.length > 0 ? seededPersonas : getFallbackPersonas(),
    source: seededPersonas.length > 0 ? 'remote' : 'mock',
    user,
  };
};

const getLatestSnapshot = async (profileId) => {
  const rows = ensureSupabaseResponse(
    await supabase
      .from('net_worth_snapshots')
      .select('*')
      .eq('profile_id', profileId)
      .order('recorded_at', { ascending: false })
      .limit(1)
  );

  return rows[0] || null;
};

const getProfileById = async (profileId) => {
  const rows = ensureSupabaseResponse(
    await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .limit(1)
  );

  return rows[0] || null;
};

const getProfilesForUser = async (userId) => {
  return ensureSupabaseResponse(
    await supabase
      .from('profiles')
      .select('*')
      .eq('owner_id', userId)
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: true })
  );
};

const clearDefaultProfile = async (userId, excludeProfileId = null) => {
  let query = supabase
    .from('profiles')
    .update({ is_default: false })
    .eq('owner_id', userId)
    .eq('is_default', true);

  if (excludeProfileId) {
    query = query.neq('id', excludeProfileId);
  }

  ensureSupabaseResponse(await query);
};

const getProfileNetWorthContext = async (profileId) => {
  const [latestSnapshot, assets, loans] = await Promise.all([
    getLatestSnapshot(profileId),
    ensureSupabaseResponse(
      await supabase
        .from('portfolio_assets')
        .select('*')
        .eq('profile_id', profileId)
    ),
    ensureSupabaseResponse(
      await supabase
        .from('loans')
        .select('*')
        .eq('profile_id', profileId)
        .neq('loan_status', 'closed')
    ),
  ]);

  const balances = assets.reduce(
    (accumulator, item) => {
      const currentValue = Number(item.current_price || 0) * Number(item.quantity || 0);

      if (item.asset_type === 'crypto') {
        accumulator.crypto += currentValue;
      } else {
        accumulator.investments += currentValue;
      }

      return accumulator;
    },
    { investments: 0, crypto: 0 }
  );

  const liabilities = loans.reduce((sum, item) => sum + Number(item.outstanding_amount || 0), 0);

  return {
    latestSnapshot,
    investments: Number(balances.investments.toFixed(2)),
    crypto: Number(balances.crypto.toFixed(2)),
    liabilities: Number(liabilities.toFixed(2)),
  };
};

const insertSnapshot = async (profileId, values) => {
  return ensureSupabaseResponse(
    await supabase
      .from('net_worth_snapshots')
      .insert({
        profile_id: profileId,
        cash_balance: Number(values.cash_balance || 0),
        investment_balance: Number(values.investment_balance || 0),
        crypto_balance: Number(values.crypto_balance || 0),
        epf_balance: Number(values.epf_balance || 0),
        liabilities_balance: Number(values.liabilities_balance || 0),
      })
      .select()
      .limit(1)
  );
};

export const saveProfile = async ({ userId, profileId, values }) => {
  if (!supabase || !userId) {
    throw new Error('Supabase is not configured.');
  }

  const payload = {
    owner_id: userId,
    full_name: values.fullName.trim(),
    greeting: values.greeting?.trim() || `Hi, ${values.fullName.trim().split(' ')[0]}`,
    persona_type: values.personaType,
    monthly_income: Number(values.monthlyIncome || 0),
    monthly_expenses: Number(values.monthlyExpenses || 0),
    is_default: Boolean(values.isDefault),
  };

  if (payload.is_default) {
    await clearDefaultProfile(userId, profileId || null);
  }

  if (profileId) {
    ensureSupabaseResponse(
      await supabase
        .from('profiles')
        .update(payload)
        .eq('id', profileId)
    );

    await insertSnapshot(profileId, {
      cash_balance: Number(values.cashBalance || 0),
      investment_balance: Number(values.investmentBalance || 0),
      crypto_balance: Number(values.cryptoBalance || 0),
      epf_balance: Number(values.epfBalance || 0),
      liabilities_balance: Number(values.liabilitiesBalance || 0),
    });

    return profileId;
  }

  const insertedRows = ensureSupabaseResponse(
    await supabase
      .from('profiles')
      .insert(payload)
      .select()
      .limit(1)
  );

  const insertedProfile = insertedRows[0];

  await insertSnapshot(insertedProfile.id, {
    cash_balance: Number(values.cashBalance || 0),
    investment_balance: Number(values.investmentBalance || 0),
    crypto_balance: Number(values.cryptoBalance || 0),
    epf_balance: Number(values.epfBalance || 0),
    liabilities_balance: Number(values.liabilitiesBalance || 0),
  });

  return insertedProfile.id;
};

export const deleteProfile = async ({ userId, profileId }) => {
  if (!supabase || !userId || !profileId) {
    throw new Error('Supabase is not configured.');
  }

  const existingProfiles = await getProfilesForUser(userId);

  if (existingProfiles.length <= 1) {
    throw new Error('At least one profile must remain.');
  }

  const removedProfile = existingProfiles.find((item) => item.id === profileId);

  ensureSupabaseResponse(
    await supabase
      .from('profiles')
      .delete()
      .eq('id', profileId)
  );

  if (removedProfile?.is_default) {
    const remainingProfiles = await getProfilesForUser(userId);
    const nextDefault = remainingProfiles[0];

    if (nextDefault) {
      ensureSupabaseResponse(
        await supabase
          .from('profiles')
          .update({ is_default: true })
          .eq('id', nextDefault.id)
      );
    }
  }
};

export const setDefaultProfile = async ({ userId, profileId }) => {
  if (!supabase || !userId || !profileId) {
    throw new Error('Supabase is not configured.');
  }

  await clearDefaultProfile(userId, profileId);

  ensureSupabaseResponse(
    await supabase
      .from('profiles')
      .update({ is_default: true })
      .eq('id', profileId)
      .eq('owner_id', userId)
  );
};

const syncProfileAggregates = async (profileId, transactionImpact = 0) => {
  const [profile, netWorthContext] = await Promise.all([
    getProfileById(profileId),
    getProfileNetWorthContext(profileId),
  ]);

  const baseSnapshot = netWorthContext.latestSnapshot || {
    cash_balance: 0,
    epf_balance: 0,
  };

  const nextCashBalance = Number((Number(baseSnapshot.cash_balance || 0) + Number(transactionImpact || 0)).toFixed(2));

  await insertSnapshot(profileId, {
    cash_balance: nextCashBalance,
    investment_balance: netWorthContext.investments,
    crypto_balance: netWorthContext.crypto,
    epf_balance: Number(baseSnapshot.epf_balance || 0),
    liabilities_balance: netWorthContext.liabilities,
  });

  if (profile) {
    const monthlyRows = ensureSupabaseResponse(
      await supabase
        .from('transactions')
        .select('*')
        .eq('profile_id', profileId)
    );

    const monthlyIncome = monthlyRows
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const monthlyExpenses = monthlyRows
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    ensureSupabaseResponse(
      await supabase
        .from('profiles')
        .update({
          monthly_income: Number(monthlyIncome.toFixed(2)),
          monthly_expenses: Number(monthlyExpenses.toFixed(2)),
        })
        .eq('id', profileId)
    );
  }
};

export const saveRecord = async ({ profileId, recordType, values, recordId }) => {
  if (!supabase || !profileId) {
    throw new Error('Supabase is not configured.');
  }

  if (recordType === 'expense') {
    const payload = {
      profile_id: profileId,
      title: values.title.trim(),
      amount: Number(values.amount),
      type: values.transactionType || 'expense',
      category: values.category?.trim() || 'Other',
      notes: values.notes?.trim() || null,
      transaction_date: values.transactionDate,
    };

    let previousRow = null;

    if (recordId) {
      previousRow = ensureSupabaseResponse(
        await supabase
          .from('transactions')
          .select('*')
          .eq('id', recordId)
          .limit(1)
      )[0];

      ensureSupabaseResponse(
        await supabase
          .from('transactions')
          .update(payload)
          .eq('id', recordId)
      );
    } else {
      ensureSupabaseResponse(await supabase.from('transactions').insert(payload));
    }

    const previousImpact = previousRow
      ? previousRow.type === 'income'
        ? Number(previousRow.amount || 0)
        : -Number(previousRow.amount || 0)
      : 0;
    const nextImpact = payload.type === 'income' ? Number(payload.amount || 0) : -Number(payload.amount || 0);

    await syncProfileAggregates(profileId, nextImpact - previousImpact);
    return;
  }

  if (recordType === 'investment') {
    const payload = {
      profile_id: profileId,
      name: values.name.trim(),
      symbol: values.symbol?.trim() || null,
      asset_type: values.assetType,
      quantity: Number(values.quantity),
      average_buy_price: Number(values.averageBuyPrice),
      current_price: Number(values.currentPrice),
      broker_name: values.brokerName?.trim() || null,
      exchange_name: values.exchangeName?.trim() || null,
    };

    if (recordId) {
      ensureSupabaseResponse(
        await supabase
          .from('portfolio_assets')
          .update(payload)
          .eq('id', recordId)
      );
    } else {
      ensureSupabaseResponse(await supabase.from('portfolio_assets').insert(payload));
    }

    await syncProfileAggregates(profileId, 0);
    return;
  }

  if (recordType === 'loan') {
    const payload = {
      profile_id: profileId,
      name: values.name.trim(),
      bank_name: values.bankName.trim(),
      total_amount: Number(values.totalAmount),
      outstanding_amount: Number(values.outstandingAmount),
      emi_amount: Number(values.emiAmount),
      interest_rate: Number(values.interestRate),
      next_due_date: values.nextDueDate,
      loan_status: values.loanStatus || 'active',
    };

    if (recordId) {
      ensureSupabaseResponse(
        await supabase
          .from('loans')
          .update(payload)
          .eq('id', recordId)
      );
    } else {
      ensureSupabaseResponse(await supabase.from('loans').insert(payload));
    }

    await syncProfileAggregates(profileId, 0);
    return;
  }

  if (recordType === 'insurance') {
    const payload = {
      profile_id: profileId,
      name: values.name.trim(),
      provider_name: values.providerName.trim(),
      policy_type: values.policyType,
      coverage_amount: Number(values.coverageAmount),
      premium_amount: Number(values.premiumAmount),
      premium_frequency: values.premiumFrequency,
      next_premium_date: values.nextPremiumDate,
    };

    if (recordId) {
      ensureSupabaseResponse(
        await supabase
          .from('insurance_policies')
          .update(payload)
          .eq('id', recordId)
      );
    } else {
      ensureSupabaseResponse(await supabase.from('insurance_policies').insert(payload));
    }
  }
};

export const deleteRecord = async ({ profileId, recordType, recordId }) => {
  if (!supabase || !profileId || !recordId) {
    throw new Error('Missing required delete data.');
  }

  if (recordType === 'expense') {
    const previousRow = ensureSupabaseResponse(
      await supabase
        .from('transactions')
        .select('*')
        .eq('id', recordId)
        .limit(1)
    )[0];

    ensureSupabaseResponse(
      await supabase
        .from('transactions')
        .delete()
        .eq('id', recordId)
    );

    const previousImpact = previousRow
      ? previousRow.type === 'income'
        ? Number(previousRow.amount || 0)
        : -Number(previousRow.amount || 0)
      : 0;

    await syncProfileAggregates(profileId, -previousImpact);
    return;
  }

  const tableByType = {
    investment: 'portfolio_assets',
    loan: 'loans',
    insurance: 'insurance_policies',
  };

  const table = tableByType[recordType];

  if (!table) {
    throw new Error('Unsupported record type.');
  }

  ensureSupabaseResponse(
    await supabase
      .from(table)
      .delete()
      .eq('id', recordId)
  );

  if (recordType === 'investment' || recordType === 'loan') {
    await syncProfileAggregates(profileId, 0);
  }
};
