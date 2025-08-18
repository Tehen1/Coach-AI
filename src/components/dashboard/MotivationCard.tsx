
"use client";

import GlassCard from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const MotivationCard = () => {
    const { toast } = useToast();

  return (
    <GlassCard className="p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% 200%' }}
              />
        </div>
        <div className="relative z-10">
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Quote className="mx-auto size-12 text-white/20 mb-4" />
            </motion.div>
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
        </div>
    </GlassCard>
  );
};

export default MotivationCard;
