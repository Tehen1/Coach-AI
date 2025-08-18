"use client";

import { useState, useEffect } from 'react';
import GlassCard from '@/components/shared/GlassCard';
import { Sparkles } from 'lucide-react';

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
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-headline">
          {timeOfDay}, Fadma ! 👩🏽‍🦱
        </h1>
        <p className="text-lg text-white/80 mb-4">
          Prête à conquérir votre journée ?
        </p>
        <div className="flex justify-center items-center space-x-2 mt-4">
          {['💪', '🔥', '⭐', '🚀', '✨'].map((emoji, i) => (
            <span
              key={emoji}
              className="text-lg animate-bounce-sm"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export default Header;
