import { formatFullCurrency } from '@/data/personas';
import { type Transaction } from '@/data/personas';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete?: (id: string) => void;
}

const TransactionItem = ({ transaction, onDelete }: TransactionItemProps) => {
  const isIncome = transaction.type === 'income';

  return (
    <div className="group flex items-center gap-3 rounded-xl bg-muted/30 p-3 transition-all hover:bg-muted/50">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-lg">
        {transaction.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{transaction.description}</p>
        <p className="text-xs text-muted-foreground">{transaction.category} · {transaction.date}</p>
      </div>

      {/* Amount */}
      <p className={`text-sm font-semibold ${isIncome ? 'text-profit' : 'text-loss'}`}>
        {isIncome ? '+' : '-'}{formatFullCurrency(transaction.amount)}
      </p>

      {/* Delete button (shown on hover) */}
      {onDelete && (
        <button
          onClick={() => onDelete(transaction.id)}
          className="ml-1 opacity-0 group-hover:opacity-100 text-xs text-loss transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default TransactionItem;
