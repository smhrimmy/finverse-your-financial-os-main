import { useFinverseStore } from '@/store/useFinverseStore';
import PersonaSwitcher from '@/components/PersonaSwitcher';
import NetWorthCard from '@/components/NetWorthCard';
import InsightCard from '@/components/InsightCard';
import GlassCard from '@/components/GlassCard';
import { Bell, Wallet, TrendingUp, CreditCard, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const quickActions = [
  { icon: Wallet, label: 'Add Expense', route: '/expenses', color: 'bg-orange-500/20 text-orange-400' },
  { icon: TrendingUp, label: 'Add Investment', route: '/portfolio', color: 'bg-green-500/20 text-green-400' },
  { icon: CreditCard, label: 'Pay EMI', route: '/finance', color: 'bg-blue-500/20 text-blue-400' },
  { icon: Shield, label: 'Insurance', route: '/finance', color: 'bg-purple-500/20 text-purple-400' },
];

const Home = () => {
  const data = useFinverseStore((s) => s.getPersonaData());
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 glass-strong px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-lg">
              {data.avatar}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Good morning</p>
              <h1 className="font-display text-lg font-bold">Hi, {data.name.split(' ')[0]}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PersonaSwitcher />
            <button className="relative rounded-lg bg-muted p-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Net Worth */}
        <NetWorthCard />

        {/* AI Insights — horizontal scroll */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            🧠 AI Insights
          </h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x pb-1">
            {data.insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} index={i} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            ⚡ Quick Actions
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(action.route)}
                className="flex flex-col items-center gap-2 rounded-xl bg-muted/50 p-3 transition-all hover:bg-muted"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Transactions preview */}
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-sm font-semibold">Recent Transactions</h3>
            <button onClick={() => navigate('/expenses')} className="text-xs text-primary font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {data.transactions.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center gap-3 py-1.5">
                <span className="text-lg">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                </div>
                <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-profit' : 'text-loss'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Home;
