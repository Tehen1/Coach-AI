
"use client";

import { Card } from '@/components/ui/card';
import { Dumbbell, Flower, CookingPot, BrainCircuit, Sparkles, Link } from 'lucide-react';
import { PilatesIcon } from '@/components/icons';
import { motion } from 'framer-motion';

type ActionType = 'Programmes' | 'Pilates' | 'Recettes' | 'Analyse AI' | 'Santé Connect';

interface QuickActionsProps {
    onActionClick: (action: ActionType) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const QuickActions = ({ onActionClick }: QuickActionsProps) => {

    const actions: { label: ActionType; icon: React.ReactNode, testId: string }[] = [
        { label: 'Programmes', icon: <Dumbbell className="size-6" />, testId: 'quick-action-programmes' },
        { label: 'Pilates', icon: <PilatesIcon className="size-6" />, testId: 'quick-action-pilates' },
        { label: 'Recettes', icon: <CookingPot className="size-6" />, testId: 'quick-action-recettes' },
        { label: 'Analyse AI', icon: <Sparkles className="size-6 text-accent" />, testId: 'quick-action-analyse-ai' },
        { label: 'Santé Connect', icon: <Link className="size-6" />, testId: 'quick-action-sante-connect' },
    ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 flex items-center font-headline">
        <motion.span 
          animate={{ scale: [1, 1.2, 1]}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mr-2"
        >
          ⚡
        </motion.span>
        Actions Rapides
      </h3>
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {actions.map((action) => (
          <motion.button
            key={action.label}
            data-testid={action.testId}
            className="bg-primary/5 border border-primary/10 p-4 rounded-xl hover:bg-primary/10 transition-all duration-200 flex flex-col items-center justify-center space-y-2 text-primary"
            onClick={() => onActionClick(action.label)}
            variants={itemVariants}
            whileHover={{ scale: 1.08, y: -5, transition: { type: 'spring', stiffness: 250 } }}
            whileTap={{ scale: 0.95 }}
          >
            {action.icon}
            <div className="text-sm font-medium text-center">{action.label}</div>
          </motion.button>
        ))}
      </motion.div>
    </Card>
  );
};

export default QuickActions;
