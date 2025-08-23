
"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const MotivationCard = () => {
    const { toast } = useToast();

  return (
    <Card className="p-6 text-center relative overflow-hidden">
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
                <Quote className="mx-auto size-12 text-primary/10 mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold text-primary mb-4 font-headline">
                Motivation du Jour
            </h3>
            <blockquote className="text-foreground/80 italic text-lg leading-relaxed mb-4">
                &quot;Le succès n'est pas définitif, l'échec n'est pas fatal : c'est le courage de continuer qui compte.&quot;
            </blockquote>
            <p className="text-foreground/60 text-sm">- Winston Churchill</p>
            <Button 
                variant="secondary" 
                className="mt-6 bg-accent text-accent-foreground font-semibold rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-accent/90"
                onClick={() => toast({
                    title: "🔥 Tu peux le faire!",
                    description: "Reste motivée!",
                })}
                >
                <Sparkles className="mr-2 h-4 w-4" />
                Boost de motivation
            </Button>
        </div>
    </Card>
  );
};

export default MotivationCard;
