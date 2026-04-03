import { type Loan, formatCurrency, formatFullCurrency } from '@/data/personas';
import GlassCard from './GlassCard';

interface LoanCardProps {
  loan: Loan;
}

const LoanCard = ({ loan }: LoanCardProps) => {
  const paid = loan.totalAmount - loan.remainingAmount;
  const progress = (paid / loan.totalAmount) * 100;

  return (
    <GlassCard animate={false}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{loan.name}</p>
          <p className="text-xs text-muted-foreground">{loan.interestRate}% p.a.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">EMI: {formatFullCurrency(loan.emiAmount)}</p>
          <p className="text-xs text-muted-foreground">Due: {loan.nextDueDate}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
          <span>Remaining: {formatCurrency(loan.remainingAmount)}</span>
          <span>{progress.toFixed(0)}% paid</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </GlassCard>
  );
};

export default LoanCard;
