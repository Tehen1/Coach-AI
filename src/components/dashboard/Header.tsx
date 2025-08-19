
"use client";

import { useState, useEffect } from 'react';
import GlassCard from '@/components/shared/GlassCard';
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
    <GlassCard className="p-6 text-center relative overflow-hidden">
      <div className="absolute -inset-20 opacity-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '400% 400%' }}
          />
        </div>
      <div className="relative z-10">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-3xl sm:text-4xl font-bold text-white mb-2 font-headline"
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
          className="text-lg text-white/80 mb-4"
        >
          Prête à conquérir votre journée ?
        </motion.p>
        <div className="flex justify-center items-center space-x-2 mt-4">
          {['💪', '🔥', '⭐', '🚀', '✨'].map((emoji, i) => (
            <motion.span
              key={emoji}
              className="text-lg"
              initial={{ y: 0, scale: 1 }}
              animate={{ y: [-5, 5, -5], scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: i * 0.2
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default Header;
