import GlassCard from './GlassCard';
import { Brain } from 'lucide-react';

interface InsightCardProps {
  insight: string;
  index: number;
}

const InsightCard = ({ insight, index }: InsightCardProps) => {
  return (
    <GlassCard className="flex items-start gap-3 min-w-[280px] snap-start">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
        <Brain className="h-4 w-4 text-primary-foreground" />
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed">{insight}</p>
    </GlassCard>
  );
};

export default InsightCard;
