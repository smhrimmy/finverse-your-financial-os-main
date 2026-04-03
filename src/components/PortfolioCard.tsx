import { type Asset, formatCurrency } from '@/data/personas';
import GlassCard from './GlassCard';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface PortfolioCardProps {
  asset: Asset;
}

const PortfolioCard = ({ asset }: PortfolioCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const isProfit = asset.change >= 0;
  const pnl = asset.value - asset.invested;
  const sparkData = asset.sparkline.map((v, i) => ({ i, v }));

  return (
    <GlassCard className="cursor-pointer" onClick={() => setExpanded(!expanded)} animate={false}>
      <div className="flex items-center gap-3">
        {/* Ticker badge */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xs font-bold text-primary">
          {asset.ticker.slice(0, 3)}
        </div>

        {/* Name & ticker */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{asset.name}</p>
          <p className="text-xs text-muted-foreground">{asset.ticker}</p>
        </div>

        {/* Sparkline */}
        <div className="w-16 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={isProfit ? 'hsl(142, 71%, 45%)' : 'hsl(0, 84%, 60%)'}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Value & change */}
        <div className="text-right">
          <p className="text-sm font-semibold">{formatCurrency(asset.value)}</p>
          <p className={`text-xs font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}>
            {isProfit ? '+' : ''}{asset.change}%
          </p>
        </div>

        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-3 grid grid-cols-3 gap-3 border-t border-border pt-3">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Invested</p>
            <p className="text-sm font-semibold">{formatCurrency(asset.invested)}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">Current</p>
            <p className="text-sm font-semibold">{formatCurrency(asset.value)}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase">P&L</p>
            <p className={`text-sm font-semibold ${isProfit ? 'text-profit' : 'text-loss'}`}>
              {isProfit ? '+' : ''}{formatCurrency(Math.abs(pnl))}
            </p>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default PortfolioCard;
