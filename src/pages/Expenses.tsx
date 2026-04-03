import { useFinverseStore } from '@/store/useFinverseStore';
import { formatCurrency, formatFullCurrency } from '@/data/personas';
import TransactionItem from '@/components/TransactionItem';
import GlassCard from '@/components/GlassCard';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { motion } from 'framer-motion';

const Expenses = () => {
  const data = useFinverseStore((s) => s.getPersonaData());
  const totalIncome = data.transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = data.transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass-strong px-4 py-4">
        <h1 className="font-display text-xl font-bold">Expenses & Income</h1>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <GlassCard>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Income</p>
            <p className="mt-1 font-display text-xl font-bold text-profit">{formatCurrency(totalIncome)}</p>
          </GlassCard>
          <GlassCard>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Expenses</p>
            <p className="mt-1 font-display text-xl font-bold text-loss">{formatCurrency(totalExpense)}</p>
          </GlassCard>
        </div>

        {/* Monthly bar chart */}
        <GlassCard>
          <h3 className="mb-3 font-display text-sm font-semibold">Monthly Overview</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyData} barGap={4}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(0,0%,55%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(0,0%,55%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ background: 'hsl(0,0%,8%)', border: '1px solid hsl(0,0%,15%)', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(v: number) => [formatFullCurrency(v)]}
                />
                <Bar dataKey="income" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-profit" /> Income</div>
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-loss" /> Expenses</div>
          </div>
        </GlassCard>

        {/* Pie chart — category breakdown */}
        <GlassCard>
          <h3 className="mb-3 font-display text-sm font-semibold">Spending Breakdown</h3>
          <div className="flex items-center gap-4">
            <div className="h-36 w-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.expenseBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: 'hsl(0,0%,8%)', border: '1px solid hsl(0,0%,15%)', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(v: number) => [formatFullCurrency(v)]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5">
              {data.expenseBreakdown.map((e) => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: e.color }} />
                    <span className="text-muted-foreground">{e.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(e.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Transaction list */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            All Transactions
          </h3>
          <div className="space-y-2">
            {data.transactions.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <TransactionItem transaction={t} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
