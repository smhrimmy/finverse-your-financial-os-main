// Mock persona data for India (₹)
export const personas = [
  {
    id: 'salaried',
    name: 'Rahul (Salaried)',
    greeting: 'Hi, Rahul',
    netWorth: 1250000,
    breakdown: {
      cash: 150000,
      investments: 600000,
      crypto: 50000,
      epf: 450000,
    },
    insights: [
      { id: '1', title: 'Your SIP returns are up 12%', type: 'positive' },
      { id: '2', title: 'You overspent ₹3,200 this week on Dining', type: 'negative' },
    ],
    transactions: [
      { id: 't1', title: 'Salary', amount: 85000, type: 'income', date: '2023-10-01' },
      { id: 't2', title: 'Rent', amount: -25000, type: 'expense', date: '2023-10-02' },
      { id: 't3', title: 'SIP Auto-pay', amount: -15000, type: 'expense', date: '2023-10-05' },
    ],
  },
  {
    id: 'high_earner',
    name: 'Priya (High Earner)',
    greeting: 'Welcome back, Priya',
    netWorth: 8500000,
    breakdown: {
      cash: 500000,
      investments: 5000000,
      crypto: 1500000,
      epf: 1500000,
    },
    insights: [
      { id: '1', title: 'Bitcoin is up 8% today. Consider booking profit.', type: 'positive' },
      { id: '2', title: 'Tax planning: Invest ₹1.5L in ELSS to save tax.', type: 'neutral' },
    ],
    transactions: [
      { id: 't1', title: 'Business Income', amount: 350000, type: 'income', date: '2023-10-01' },
      { id: 't2', title: 'Stock Purchase', amount: -100000, type: 'expense', date: '2023-10-03' },
    ],
  },
  {
    id: 'fresher',
    name: 'Amit (Fresher)',
    greeting: 'Hey Amit',
    netWorth: 45000,
    breakdown: {
      cash: 30000,
      investments: 10000,
      crypto: 0,
      epf: 5000,
    },
    insights: [
      { id: '1', title: 'Start an SIP with just ₹500/month', type: 'neutral' },
      { id: '2', title: 'You spent 40% of your balance already', type: 'negative' },
    ],
    transactions: [
      { id: 't1', title: 'Salary', amount: 35000, type: 'income', date: '2023-10-01' },
      { id: 't2', title: 'Zomato', amount: -800, type: 'expense', date: '2023-10-02' },
    ],
  },
  {
    id: 'business',
    name: 'Neha (Business Owner)',
    greeting: 'Hello Neha',
    netWorth: 3200000,
    breakdown: {
      cash: 800000,
      investments: 1200000,
      crypto: 200000,
      epf: 0, // Business owners usually don't have EPF, maybe PPF
    },
    insights: [
      { id: '1', title: 'GST Filing due in 5 days', type: 'negative' },
      { id: '2', title: 'Client payment of ₹1.2L received', type: 'positive' },
    ],
    transactions: [
      { id: 't1', title: 'Client Payment', amount: 120000, type: 'income', date: '2023-10-01' },
      { id: 't2', title: 'Office Rent', amount: -40000, type: 'expense', date: '2023-10-02' },
      { id: 't3', title: 'GST Payment', amount: -18000, type: 'expense', date: '2023-10-10' },
    ],
  },
];
