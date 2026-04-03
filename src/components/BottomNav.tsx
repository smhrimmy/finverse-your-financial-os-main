import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart3, Briefcase, Bot, Plus } from 'lucide-react';
import { useFinverseStore } from '@/store/useFinverseStore';
import FABButton from './FABButton';
import { motion } from 'framer-motion';

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: BarChart3, label: 'Expenses', path: '/expenses' },
  { icon: null, label: 'Add', path: null }, // FAB placeholder
  { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
  { icon: Bot, label: 'AI', path: '/ai' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isFabOpen, setFabOpen } = useFinverseStore();

  return (
    <>
      <FABButton />
      <nav className="fixed bottom-0 left-0 right-0 z-30 glass-strong border-t border-white/5">
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
          {tabs.map((tab, i) => {
            if (tab.path === null) {
              // FAB center button
              return (
                <button
                  key="fab"
                  onClick={() => setFabOpen(!isFabOpen)}
                  className="relative -mt-6"
                >
                  <motion.div
                    animate={{ rotate: isFabOpen ? 45 : 0 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-lg shadow-primary/30"
                  >
                    <Plus className="h-6 w-6 text-primary-foreground" />
                  </motion.div>
                </button>
              );
            }

            const isActive = location.pathname === tab.path;
            const Icon = tab.icon!;

            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path!)}
                className="flex flex-col items-center gap-1 px-3 py-1"
              >
                <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-0 h-0.5 w-8 rounded-full gradient-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
