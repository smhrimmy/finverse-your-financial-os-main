import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
}

const GlassCard = ({ children, className, onClick, animate = true }: GlassCardProps) => {
  const Wrapper = animate ? motion.div : 'div';
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
      }
    : {};

  return (
    <Wrapper
      className={cn('glass rounded-xl p-4', className)}
      onClick={onClick}
      {...animProps}
    >
      {children}
    </Wrapper>
  );
};

export default GlassCard;
