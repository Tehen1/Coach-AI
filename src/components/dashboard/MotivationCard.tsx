"use client";

import GlassCard from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

const MotivationCard = () => {
    const { toast } = useToast();

  return (
    <GlassCard className="p-6 text-center">
      <h3 className="text-lg font-semibold text-white mb-4 font-headline">
        Motivation du Jour
      </h3>
      <blockquote className="text-white/80 italic text-lg leading-relaxed mb-4">
        &quot;Le succès n&apos;est pas définitif, l&apos;échec n&apos;est pas fatal : c&apos;est le courage de continuer qui compte.&quot;
      </blockquote>
      <p className="text-white/60 text-sm">- Winston Churchill</p>
      <Button 
        variant="secondary" 
        className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        onClick={() => toast({
            title: "🔥 Tu peux le faire!",
            description: "Reste motivée!",
        })}
        >
        <Sparkles className="mr-2 h-4 w-4" />
        Boost de motivation
      </Button>
    </GlassCard>
  );
};

export default MotivationCard;
