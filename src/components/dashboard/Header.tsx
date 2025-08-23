
"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Bonjour');
    else if (hour < 18) setTimeOfDay('Bon après-midi');
    else setTimeOfDay('Bonsoir');
  }, []);

  return (
    <Card className="p-6 text-center relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute -inset-10 bg-primary opacity-80" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--accent) / 0.1), transparent 60%)'
      }} />
      <div className="relative z-10">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-3xl sm:text-4xl font-bold mb-2 font-headline"
        >
          {timeOfDay} ! 
           <motion.span
              className="inline-block ml-2"
              animate={{ 
                rotateZ: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👩🏽‍🦱
            </motion.span>
        </motion.h1>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="text-lg text-primary-foreground/80"
        >
          Prête à conquérir votre journée ?
        </motion.p>
      </div>
    </Card>
  );
};

export default Header;
