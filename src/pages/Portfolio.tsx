import { useFinverseStore } from '@/store/useFinverseStore';
import { formatCurrency } from '@/data/personas';
import PortfolioCard from '@/components/PortfolioCard';
import GlassCard from '@/components/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const data = useFinverseStore((s) => s.getPersonaData());

  const stocks = data.portfolio.filter((a) => a.type === 'stock');
  const crypto = data.portfolio.filter((a) => a.type === 'crypto');
  const mutualFunds = data.portfolio.filter((a) => a.type === 'mutual_fund');

  const totalValue = data.portfolio.reduce((s, a) => s + a.value, 0);
  const totalInvested = data.portfolio.reduce((s, a) => s + a.invested, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercent = ((totalPnl / totalInvested) * 100).toFixed(1);

  const renderAssets = (assets: typeof data.portfolio) => {
    if (assets.length === 0) {
      return <p className="text-sm text-muted-foreground text-center py-8">No assets in this category</p>;
    }
    return (
      <div className="space-y-3">
        {assets.map((asset, i) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <PortfolioCard asset={asset} />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-20 glass-strong px-4 py-4">
        <h1 className="font-display text-xl font-bold">Portfolio</h1>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Portfolio summary */}
        <GlassCard className="relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-secondary/20 blur-3xl" />
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Value</p>
              <p className="mt-1 font-display text-lg font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Invested</p>
              <p className="mt-1 font-display text-lg font-bold">{formatCurrency(totalInvested)}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">P&L</p>
              <p className={`mt-1 font-display text-lg font-bold ${totalPnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                {totalPnl >= 0 ? '+' : ''}{formatCurrency(Math.abs(totalPnl))}
              </p>
              <p className={`text-xs ${totalPnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                ({totalPnl >= 0 ? '+' : ''}{totalPnlPercent}%)
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Tabs */}
        <Tabs defaultValue="stocks" className="w-full">
          <TabsList className="w-full bg-muted/50 border border-border">
            <TabsTrigger value="stocks" className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Stocks ({stocks.length})
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              Crypto ({crypto.length})
            </TabsTrigger>
            <TabsTrigger value="mutual_funds" className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              MF ({mutualFunds.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stocks" className="mt-4">{renderAssets(stocks)}</TabsContent>
          <TabsContent value="crypto" className="mt-4">{renderAssets(crypto)}</TabsContent>
          <TabsContent value="mutual_funds" className="mt-4">{renderAssets(mutualFunds)}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;
