
"use client";

import { useState, useEffect } from 'react';
import { Dumbbell, Apple, BrainCircuit } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedDumbbell, AnimatedApple, AnimatedBrain } from '@/components/shared/AnimatedIcons';


interface ProgressCircleProps {
  label: 'Fitness' | 'Nutrition' | 'Mental';
  value: number;
  color: string;
  size?: number;
  onClick: () => void;
  testId: string;
}

const ProgressCircle = ({ label, value, color, size = 140, onClick, testId }: ProgressCircleProps) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Delay setting the offset to allow for CSS transition on mount
    const timer = setTimeout(() => {
      setOffset(circumference - (value / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [value, circumference]);

  const getAnimatedIcon = () => {
    switch (label) {
      case 'Fitness': return <AnimatedDumbbell size={28} color={color} />;
      case 'Nutrition': return <AnimatedApple size={28} color={color} />;
      case 'Mental': return <AnimatedBrain size={28} color={color} />;
      default: return null;
    }
  };

  return (
    <div
      className="flex flex-col items-center space-y-2 cursor-pointer group"
      onClick={onClick}
      data-testid={testId}
    >
      <motion.div
        className="relative transform transition-transform group-hover:scale-105"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 }}}
      >
        <svg width={size} height={size} className="transform -rotate-90">
           <defs>
              <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor={`${color}80`} />
              </linearGradient>
           </defs>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="8" fill="none" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#gradient-${label})`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-1">{getAnimatedIcon()}</div>
          <span className="text-xl font-bold text-white">{value}%</span>
        </div>
        <AnimatePresence>
            {value === 100 && (
                <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <span className="text-lg">⭐</span>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
      <span className="font-medium text-sm text-center text-white/90 font-headline">{label}</span>
    </div>
  );
};

const ProgressCircles = ({ onCircleClick }: { onCircleClick: (category: 'Fitness' | 'Nutrition' | 'Mental') => void }) => {
    // These values would typically come from user data
    const progress = {
        fitness: 45,
        nutrition: 70,
        mental: 35
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ProgressCircle label="Fitness" value={progress.fitness} color="#3b82f6" onClick={() => onCircleClick('Fitness')} testId="progress-circle-fitness" />
            <ProgressCircle label="Nutrition" value={progress.nutrition} color="#10b981" onClick={() => onCircleClick('Nutrition')} testId="progress-circle-nutrition" />
            <ProgressCircle label="Mental" value={progress.mental} color="#8b5cf6" onClick={() => onCircleClick('Mental')} testId="progress-circle-mental" />
        </div>
    );
};


export default ProgressCircles;
