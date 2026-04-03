import { useFinverseStore } from '@/store/useFinverseStore';
import { Plus, X, Wallet, TrendingUp, Shield, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fabActions = [
  { icon: Wallet, label: 'Add Expense', route: '/expenses' },
  { icon: TrendingUp, label: 'Add Investment', route: '/portfolio' },
  { icon: Shield, label: 'Add Insurance', route: '/finance' },
  { icon: CreditCard, label: 'Add Loan', route: '/finance' },
];

const FABButton = () => {
  const { isFabOpen, setFabOpen } = useFinverseStore();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isFabOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setFabOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Action items */}
      <AnimatePresence>
        {isFabOpen && (
          <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-strong rounded-2xl p-3 space-y-1 min-w-[200px]"
            >
              {fabActions.map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { navigate(action.route); setFabOpen(false); }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-primary/20"
                >
                  <action.icon className="h-4 w-4 text-primary" />
                  {action.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FAB button itself — rendered in BottomNav */}
    </>
  );
};

export default FABButton;
