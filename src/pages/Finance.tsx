import { useFinverseStore } from '@/store/useFinverseStore';
import LoanCard from '@/components/LoanCard';
import InsuranceCard from '@/components/InsuranceCard';
import { motion } from 'framer-motion';
import { Shield, CreditCard } from 'lucide-react';

const Finance = () => {
  const data = useFinverseStore((s) => s.getPersonaData());

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-20 glass-strong px-4 py-4">
        <h1 className="font-display text-xl font-bold">Finance</h1>
      </div>

      <div className="px-4 pt-4 space-y-6">
        {/* Insurance Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Insurance Policies
            </h3>
          </div>
          {data.insurance.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No insurance policies</p>
          ) : (
            <div className="space-y-3">
              {data.insurance.map((ins, i) => (
                <motion.div
                  key={ins.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <InsuranceCard insurance={ins} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Loans Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Active Loans
            </h3>
          </div>
          {data.loans.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No active loans 🎉</p>
          ) : (
            <div className="space-y-3">
              {data.loans.map((loan, i) => (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <LoanCard loan={loan} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Finance;
