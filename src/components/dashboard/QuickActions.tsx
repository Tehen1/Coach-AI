
"use client";

import GlassCard from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Dumbbell, Flower, CookingPot, BrainCircuit, Sparkles, Link } from 'lucide-react';
import { PilatesIcon } from '@/components/icons';
import { motion } from 'framer-motion';

type ActionType = 'Programmes' | 'Pilates' | 'Recettes' | 'Analyse AI' | 'Santé Connect';

interface QuickActionsProps {
    onActionClick: (action: ActionType) => void;
}

const QuickActions = ({ onActionClick }: QuickActionsProps) => {

    const actions: { label: ActionType; icon: React.ReactNode, testId: string }[] = [
        { label: 'Programmes', icon: <Dumbbell className="size-6" />, testId: 'quick-action-programmes' },
        { label: 'Pilates', icon: <PilatesIcon className="size-6" />, testId: 'quick-action-pilates' },
        { label: 'Recettes', icon: <CookingPot className="size-6" />, testId: 'quick-action-recettes' },
        { label: 'Analyse AI', icon: <Sparkles className="size-6" />, testId: 'quick-action-analyse-ai' },
        { label: 'Santé Connect', icon: <Link className="size-6" />, testId: 'quick-action-sante-connect' },
    ];

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center font-headline">
        <motion.span 
          animate={{ scale: [1, 1.2, 1]}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mr-2"
        >
          ⚡
        </motion.span>
        Actions Rapides
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            data-testid={action.testId}
            className="bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-all duration-200 flex flex-col items-center justify-center space-y-2"
            onClick={() => onActionClick(action.label)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {action.icon}
            <div className="text-sm font-medium text-white text-center">{action.label}</div>
          </motion.button>
        ))}
      </div>
    </GlassCard>
  );
};

export default QuickActions;
