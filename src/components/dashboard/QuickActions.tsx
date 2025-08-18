"use client";

import GlassCard from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Dumbbell, Flower, CookingPot, BrainCircuit, Sparkles } from 'lucide-react';
import { PilatesIcon } from '@/components/icons';

type ActionType = 'Programmes' | 'Pilates' | 'Recettes' | 'Analyse AI';

interface QuickActionsProps {
    onActionClick: (action: ActionType) => void;
}

const QuickActions = ({ onActionClick }: QuickActionsProps) => {

    const actions: { label: ActionType; icon: React.ReactNode }[] = [
        { label: 'Programmes', icon: <Dumbbell className="size-6" /> },
        { label: 'Pilates', icon: <PilatesIcon className="size-6" /> },
        { label: 'Recettes', icon: <CookingPot className="size-6" /> },
        { label: 'Analyse AI', icon: <Sparkles className="size-6" /> },
    ];

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center font-headline">
        <span className="mr-2 animate-pulse">⚡</span>
        Actions Rapides
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-200 flex flex-col items-center justify-center space-y-2"
            onClick={() => onActionClick(action.label)}
          >
            {action.icon}
            <div className="text-sm font-medium text-white">{action.label}</div>
          </button>
        ))}
      </div>
    </GlassCard>
  );
};

export default QuickActions;
