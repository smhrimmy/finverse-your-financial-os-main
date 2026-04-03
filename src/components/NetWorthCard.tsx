import { useFinverseStore } from '@/store/useFinverseStore';
import { formatCurrency } from '@/data/personas';
import GlassCard from './GlassCard';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';

const NetWorthCard = () => {
  const data = useFinverseStore((s) => s.getPersonaData());
  const chartData = data.netWorthHistory.map((v, i) => ({ month: i, value: v }));

  const breakdown = [
    { label: 'Cash', value: data.cash, color: 'from-blue-400 to-blue-600' },
    { label: 'Investments', value: data.investments, color: 'from-purple-400 to-purple-600' },
    { label: 'Crypto', value: data.crypto, color: 'from-orange-400 to-orange-600' },
    { label: 'EPF', value: data.epf, color: 'from-green-400 to-green-600' },
  ].filter((b) => b.value > 0);

  return (
    <GlassCard className="relative overflow-hidden">
      {/* Gradient glow accent */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Net Worth</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-foreground">
            {formatCurrency(data.netWorth)}
          </h2>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-profit/20 px-2.5 py-1 text-xs font-semibold text-profit">
          <TrendingUp className="h-3 w-3" />
          +8.2%
        </div>
      </div>

      {/* Mini line chart */}
      <div className="mt-3 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="nwGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                <stop offset="100%" stopColor="hsl(263, 90%, 66%)" />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{ background: 'hsl(0,0%,8%)', border: '1px solid hsl(0,0%,15%)', borderRadius: '8px', fontSize: '12px' }}
              labelStyle={{ display: 'none' }}
              formatter={(v: number) => [formatCurrency(v), 'Worth']}
            />
            <Line type="monotone" dataKey="value" stroke="url(#nwGrad)" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown pills */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {breakdown.map((b) => (
          <div key={b.label} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${b.color}`} />
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground">{b.label}</p>
              <p className="text-xs font-semibold">{formatCurrency(b.value)}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default NetWorthCard;
