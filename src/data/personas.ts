// Mock persona data — realistic Indian financial profiles
export type PersonaType = 'salaried' | 'high_earner' | 'fresher' | 'business_owner';

export interface Transaction {
  id: string;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  icon: string;
}

export interface Asset {
  id: string;
  name: string;
  ticker: string;
  type: 'stock' | 'crypto' | 'mutual_fund';
  value: number;
  invested: number;
  change: number; // percentage
  sparkline: number[];
}

export interface Loan {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  emiAmount: number;
  interestRate: number;
  nextDueDate: string;
}

export interface Insurance {
  id: string;
  name: string;
  type: string;
  coverage: number;
  premium: number;
  nextPremiumDate: string;
  provider: string;
}

export interface PersonaData {
  name: string;
  label: string;
  avatar: string;
  monthlyIncome: number;
  netWorth: number;
  cash: number;
  investments: number;
  crypto: number;
  epf: number;
  monthlyExpenses: number;
  netWorthHistory: number[];
  transactions: Transaction[];
  portfolio: Asset[];
  loans: Loan[];
  insurance: Insurance[];
  insights: string[];
  expenseBreakdown: { name: string; value: number; color: string }[];
  monthlyData: { month: string; income: number; expenses: number }[];
}

const sparkGen = (base: number, volatility: number): number[] =>
  Array.from({ length: 12 }, () => base + (Math.random() - 0.5) * volatility);

export const personas: Record<PersonaType, PersonaData> = {
  salaried: {
    name: 'Rahul Sharma',
    label: 'Salaried',
    avatar: '👨‍💼',
    monthlyIncome: 95000,
    netWorth: 2850000,
    cash: 320000,
    investments: 1450000,
    crypto: 80000,
    epf: 1000000,
    monthlyExpenses: 62000,
    netWorthHistory: [2100000, 2200000, 2350000, 2400000, 2500000, 2550000, 2600000, 2650000, 2700000, 2750000, 2800000, 2850000],
    transactions: [
      { id: '1', category: 'Food', description: 'Swiggy Order', amount: 450, type: 'expense', date: '2024-03-15', icon: '🍕' },
      { id: '2', category: 'Transport', description: 'Uber Ride', amount: 280, type: 'expense', date: '2024-03-15', icon: '🚗' },
      { id: '3', category: 'Salary', description: 'March Salary', amount: 95000, type: 'income', date: '2024-03-01', icon: '💰' },
      { id: '4', category: 'Shopping', description: 'Amazon Purchase', amount: 2300, type: 'expense', date: '2024-03-14', icon: '🛒' },
      { id: '5', category: 'Bills', description: 'Electricity Bill', amount: 1800, type: 'expense', date: '2024-03-10', icon: '⚡' },
      { id: '6', category: 'Entertainment', description: 'Netflix', amount: 649, type: 'expense', date: '2024-03-05', icon: '🎬' },
      { id: '7', category: 'Health', description: 'Gym Membership', amount: 2500, type: 'expense', date: '2024-03-01', icon: '🏋️' },
      { id: '8', category: 'Investment', description: 'SIP - HDFC Flexi', amount: 10000, type: 'expense', date: '2024-03-05', icon: '📈' },
    ],
    portfolio: [
      { id: '1', name: 'HDFC Flexi Cap', ticker: 'HDFC', type: 'mutual_fund', value: 450000, invested: 360000, change: 12.4, sparkline: sparkGen(450, 50) },
      { id: '2', name: 'Reliance Industries', ticker: 'RELIANCE', type: 'stock', value: 180000, invested: 150000, change: 8.2, sparkline: sparkGen(180, 20) },
      { id: '3', name: 'TCS', ticker: 'TCS', type: 'stock', value: 120000, invested: 100000, change: 5.6, sparkline: sparkGen(120, 15) },
      { id: '4', name: 'Bitcoin', ticker: 'BTC', type: 'crypto', value: 50000, invested: 40000, change: 15.3, sparkline: sparkGen(50, 15) },
      { id: '5', name: 'Ethereum', ticker: 'ETH', type: 'crypto', value: 30000, invested: 25000, change: -3.2, sparkline: sparkGen(30, 10) },
      { id: '6', name: 'Axis Bluechip', ticker: 'AXIS', type: 'mutual_fund', value: 320000, invested: 280000, change: 9.1, sparkline: sparkGen(320, 30) },
    ],
    loans: [
      { id: '1', name: 'Home Loan - SBI', totalAmount: 3500000, remainingAmount: 2800000, emiAmount: 28500, interestRate: 8.5, nextDueDate: '2024-04-05' },
    ],
    insurance: [
      { id: '1', name: 'Term Life Insurance', type: 'Life', coverage: 10000000, premium: 12000, nextPremiumDate: '2024-06-15', provider: 'LIC' },
      { id: '2', name: 'Health Insurance', type: 'Health', coverage: 500000, premium: 8500, nextPremiumDate: '2024-05-01', provider: 'Star Health' },
    ],
    insights: [
      'You overspent ₹3,200 on food this week 🍔',
      'Your SIP returns are up 12.4% — great! 📈',
      'Home loan EMI due in 20 days',
      'Consider increasing SIP by ₹2,000/month',
    ],
    expenseBreakdown: [
      { name: 'Food', value: 12000, color: '#f97316' },
      { name: 'Rent', value: 18000, color: '#3b82f6' },
      { name: 'Transport', value: 5000, color: '#8b5cf6' },
      { name: 'Shopping', value: 8000, color: '#ec4899' },
      { name: 'Bills', value: 6000, color: '#14b8a6' },
      { name: 'EMI', value: 28500, color: '#ef4444' },
      { name: 'SIP', value: 10000, color: '#22c55e' },
    ],
    monthlyData: [
      { month: 'Oct', income: 95000, expenses: 58000 },
      { month: 'Nov', income: 95000, expenses: 65000 },
      { month: 'Dec', income: 95000, expenses: 72000 },
      { month: 'Jan', income: 95000, expenses: 60000 },
      { month: 'Feb', income: 95000, expenses: 55000 },
      { month: 'Mar', income: 95000, expenses: 62000 },
    ],
  },
  high_earner: {
    name: 'Priya Kapoor',
    label: 'High Earner',
    avatar: '👩‍💻',
    monthlyIncome: 350000,
    netWorth: 18500000,
    cash: 2500000,
    investments: 9000000,
    crypto: 3000000,
    epf: 4000000,
    monthlyExpenses: 180000,
    netWorthHistory: [14000000, 14800000, 15200000, 15800000, 16500000, 16800000, 17200000, 17500000, 17800000, 18000000, 18200000, 18500000],
    transactions: [
      { id: '1', category: 'Food', description: 'Fine Dining - Wasabi', amount: 8500, type: 'expense', date: '2024-03-15', icon: '🍣' },
      { id: '2', category: 'Travel', description: 'Flight - Mumbai to Goa', amount: 12000, type: 'expense', date: '2024-03-14', icon: '✈️' },
      { id: '3', category: 'Salary', description: 'March CTC', amount: 350000, type: 'income', date: '2024-03-01', icon: '💰' },
      { id: '4', category: 'Investment', description: 'Stock Purchase - INFY', amount: 50000, type: 'expense', date: '2024-03-12', icon: '📊' },
      { id: '5', category: 'Shopping', description: 'Luxury Watch', amount: 45000, type: 'expense', date: '2024-03-10', icon: '⌚' },
      { id: '6', category: 'Crypto', description: 'BTC Purchase', amount: 100000, type: 'expense', date: '2024-03-08', icon: '₿' },
    ],
    portfolio: [
      { id: '1', name: 'Infosys', ticker: 'INFY', type: 'stock', value: 2500000, invested: 2000000, change: 14.2, sparkline: sparkGen(2500, 200) },
      { id: '2', name: 'Bitcoin', ticker: 'BTC', type: 'crypto', value: 2000000, invested: 1200000, change: 42.5, sparkline: sparkGen(2000, 400) },
      { id: '3', name: 'Ethereum', ticker: 'ETH', type: 'crypto', value: 800000, invested: 600000, change: 18.7, sparkline: sparkGen(800, 150) },
      { id: '4', name: 'Solana', ticker: 'SOL', type: 'crypto', value: 200000, invested: 120000, change: 55.2, sparkline: sparkGen(200, 60) },
      { id: '5', name: 'Mirae Asset Large Cap', ticker: 'MIRAE', type: 'mutual_fund', value: 3500000, invested: 2800000, change: 11.8, sparkline: sparkGen(3500, 300) },
      { id: '6', name: 'HDFC Bank', ticker: 'HDFCBANK', type: 'stock', value: 1800000, invested: 1500000, change: 7.9, sparkline: sparkGen(1800, 150) },
    ],
    loans: [],
    insurance: [
      { id: '1', name: 'Term Plan - Max Life', type: 'Life', coverage: 50000000, premium: 45000, nextPremiumDate: '2024-07-01', provider: 'Max Life' },
      { id: '2', name: 'Super Top-Up Health', type: 'Health', coverage: 2000000, premium: 18000, nextPremiumDate: '2024-05-15', provider: 'ICICI Lombard' },
    ],
    insights: [
      'Your crypto portfolio is up 42% this quarter 🚀',
      'Tax saving: Invest ₹50K more in ELSS before March',
      'Portfolio is overweight in tech — consider diversifying',
      'Emergency fund covers 14 months — excellent! 💪',
    ],
    expenseBreakdown: [
      { name: 'Food', value: 25000, color: '#f97316' },
      { name: 'Rent', value: 45000, color: '#3b82f6' },
      { name: 'Travel', value: 30000, color: '#8b5cf6' },
      { name: 'Shopping', value: 40000, color: '#ec4899' },
      { name: 'Investments', value: 150000, color: '#22c55e' },
      { name: 'Bills', value: 10000, color: '#14b8a6' },
    ],
    monthlyData: [
      { month: 'Oct', income: 350000, expenses: 165000 },
      { month: 'Nov', income: 350000, expenses: 190000 },
      { month: 'Dec', income: 450000, expenses: 220000 },
      { month: 'Jan', income: 350000, expenses: 175000 },
      { month: 'Feb', income: 350000, expenses: 160000 },
      { month: 'Mar', income: 350000, expenses: 180000 },
    ],
  },
  fresher: {
    name: 'Arjun Patel',
    label: 'Fresher',
    avatar: '🧑‍🎓',
    monthlyIncome: 35000,
    netWorth: 180000,
    cash: 85000,
    investments: 60000,
    crypto: 15000,
    epf: 20000,
    monthlyExpenses: 28000,
    netWorthHistory: [50000, 65000, 80000, 95000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000],
    transactions: [
      { id: '1', category: 'Food', description: 'Zomato Order', amount: 320, type: 'expense', date: '2024-03-15', icon: '🍕' },
      { id: '2', category: 'Transport', description: 'Metro Card Recharge', amount: 500, type: 'expense', date: '2024-03-14', icon: '🚇' },
      { id: '3', category: 'Salary', description: 'March Salary', amount: 35000, type: 'income', date: '2024-03-01', icon: '💰' },
      { id: '4', category: 'Entertainment', description: 'Spotify Premium', amount: 119, type: 'expense', date: '2024-03-05', icon: '🎵' },
      { id: '5', category: 'Bills', description: 'Phone Recharge', amount: 599, type: 'expense', date: '2024-03-10', icon: '📱' },
    ],
    portfolio: [
      { id: '1', name: 'Nifty 50 Index Fund', ticker: 'NIFTY50', type: 'mutual_fund', value: 45000, invested: 40000, change: 6.8, sparkline: sparkGen(45, 5) },
      { id: '2', name: 'Dogecoin', ticker: 'DOGE', type: 'crypto', value: 8000, invested: 10000, change: -18.5, sparkline: sparkGen(8, 3) },
      { id: '3', name: 'Polygon', ticker: 'MATIC', type: 'crypto', value: 7000, invested: 5000, change: 22.1, sparkline: sparkGen(7, 2) },
      { id: '4', name: 'Parag Parikh Flexi', ticker: 'PPFAS', type: 'mutual_fund', value: 15000, invested: 12000, change: 10.2, sparkline: sparkGen(15, 3) },
    ],
    loans: [
      { id: '1', name: 'Education Loan', totalAmount: 500000, remainingAmount: 420000, emiAmount: 8500, interestRate: 9.0, nextDueDate: '2024-04-10' },
    ],
    insurance: [
      { id: '1', name: 'Basic Health Insurance', type: 'Health', coverage: 300000, premium: 4500, nextPremiumDate: '2024-08-01', provider: 'Star Health' },
    ],
    insights: [
      'Start a ₹2,000/month SIP to build wealth early 🌱',
      'Your DOGE is down 18% — review crypto strategy',
      'Education loan EMI due in 25 days',
      'Try to save at least 20% of your salary',
    ],
    expenseBreakdown: [
      { name: 'Food', value: 8000, color: '#f97316' },
      { name: 'Rent', value: 10000, color: '#3b82f6' },
      { name: 'Transport', value: 3000, color: '#8b5cf6' },
      { name: 'Entertainment', value: 2000, color: '#ec4899' },
      { name: 'Bills', value: 2500, color: '#14b8a6' },
      { name: 'EMI', value: 8500, color: '#ef4444' },
    ],
    monthlyData: [
      { month: 'Oct', income: 35000, expenses: 26000 },
      { month: 'Nov', income: 35000, expenses: 29000 },
      { month: 'Dec', income: 35000, expenses: 32000 },
      { month: 'Jan', income: 35000, expenses: 27000 },
      { month: 'Feb', income: 35000, expenses: 25000 },
      { month: 'Mar', income: 35000, expenses: 28000 },
    ],
  },
  business_owner: {
    name: 'Meera Gupta',
    label: 'Business Owner',
    avatar: '👩‍💼',
    monthlyIncome: 280000,
    netWorth: 12500000,
    cash: 1800000,
    investments: 5500000,
    crypto: 200000,
    epf: 0,
    monthlyExpenses: 220000,
    netWorthHistory: [9000000, 9500000, 10000000, 10200000, 10800000, 11000000, 11300000, 11600000, 11900000, 12000000, 12200000, 12500000],
    transactions: [
      { id: '1', category: 'Business', description: 'Client Payment Received', amount: 450000, type: 'income', date: '2024-03-15', icon: '🏢' },
      { id: '2', category: 'Business', description: 'Office Rent', amount: 35000, type: 'expense', date: '2024-03-01', icon: '🏠' },
      { id: '3', category: 'Tax', description: 'GST Payment Q4', amount: 85000, type: 'expense', date: '2024-03-12', icon: '🏛️' },
      { id: '4', category: 'Business', description: 'Employee Salaries', amount: 120000, type: 'expense', date: '2024-03-01', icon: '👥' },
      { id: '5', category: 'Food', description: 'Client Dinner', amount: 5500, type: 'expense', date: '2024-03-14', icon: '🍽️' },
      { id: '6', category: 'Business', description: 'Software Subscription', amount: 15000, type: 'expense', date: '2024-03-05', icon: '💻' },
    ],
    portfolio: [
      { id: '1', name: 'Commercial Property', ticker: 'PROP', type: 'stock', value: 3500000, invested: 2800000, change: 8.5, sparkline: sparkGen(3500, 200) },
      { id: '2', name: 'ICICI Pru Value', ticker: 'ICICI', type: 'mutual_fund', value: 1200000, invested: 1000000, change: 11.3, sparkline: sparkGen(1200, 100) },
      { id: '3', name: 'Tata Steel', ticker: 'TATASTEEL', type: 'stock', value: 800000, invested: 700000, change: -2.8, sparkline: sparkGen(800, 80) },
      { id: '4', name: 'Bitcoin', ticker: 'BTC', type: 'crypto', value: 150000, invested: 100000, change: 25.0, sparkline: sparkGen(150, 30) },
      { id: '5', name: 'SBI Small Cap', ticker: 'SBISMALL', type: 'mutual_fund', value: 500000, invested: 400000, change: 15.7, sparkline: sparkGen(500, 50) },
    ],
    loans: [
      { id: '1', name: 'Business Loan - HDFC', totalAmount: 2000000, remainingAmount: 1200000, emiAmount: 45000, interestRate: 10.5, nextDueDate: '2024-04-01' },
      { id: '2', name: 'Vehicle Loan', totalAmount: 800000, remainingAmount: 350000, emiAmount: 18000, interestRate: 9.0, nextDueDate: '2024-04-05' },
    ],
    insurance: [
      { id: '1', name: 'Keyman Insurance', type: 'Life', coverage: 20000000, premium: 35000, nextPremiumDate: '2024-06-01', provider: 'HDFC Life' },
      { id: '2', name: 'Business Insurance', type: 'Business', coverage: 5000000, premium: 22000, nextPremiumDate: '2024-07-15', provider: 'New India Assurance' },
      { id: '3', name: 'Health Insurance', type: 'Health', coverage: 1000000, premium: 15000, nextPremiumDate: '2024-05-01', provider: 'ICICI Lombard' },
    ],
    insights: [
      'GST filing deadline in 5 days — ₹85K pending 🏛️',
      'Business income irregular — maintain 6-month buffer',
      'Vehicle loan 56% paid — consider prepayment',
      'Tax planning: Section 80C limit not fully utilized',
    ],
    expenseBreakdown: [
      { name: 'Salaries', value: 120000, color: '#3b82f6' },
      { name: 'Office Rent', value: 35000, color: '#8b5cf6' },
      { name: 'GST/Tax', value: 85000, color: '#ef4444' },
      { name: 'Software', value: 15000, color: '#14b8a6' },
      { name: 'Food', value: 12000, color: '#f97316' },
      { name: 'EMI', value: 63000, color: '#ec4899' },
    ],
    monthlyData: [
      { month: 'Oct', income: 320000, expenses: 210000 },
      { month: 'Nov', income: 180000, expenses: 195000 },
      { month: 'Dec', income: 450000, expenses: 240000 },
      { month: 'Jan', income: 250000, expenses: 200000 },
      { month: 'Feb', income: 380000, expenses: 215000 },
      { month: 'Mar', income: 280000, expenses: 220000 },
    ],
  },
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatFullCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
