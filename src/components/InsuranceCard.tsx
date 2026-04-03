import { type Insurance, formatCurrency } from '@/data/personas';
import GlassCard from './GlassCard';
import { Shield } from 'lucide-react';

interface InsuranceCardProps {
  insurance: Insurance;
}

const InsuranceCard = ({ insurance }: InsuranceCardProps) => {
  return (
    <GlassCard animate={false}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{insurance.name}</p>
          <p className="text-xs text-muted-foreground">{insurance.provider} · {insurance.type}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">Coverage</p>
          <p className="text-sm font-semibold">{formatCurrency(insurance.coverage)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">Premium</p>
          <p className="text-sm font-semibold">{formatCurrency(insurance.premium)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase">Next Due</p>
          <p className="text-sm font-semibold">{insurance.nextPremiumDate.slice(5)}</p>
        </div>
      </div>
    </GlassCard>
  );
};

export default InsuranceCard;
