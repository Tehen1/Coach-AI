
"use client";

import { useState, useEffect } from 'react';
import { Dumbbell, Apple, BrainCircuit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressCircleProps {
  label: 'Fitness' | 'Nutrition' | 'Mental';
  value: number;
  color: string;
  icon: React.ReactNode;
  size?: number;
  onClick: () => void;
  testId: string;
}

const ProgressCircle = ({ label, value, color, icon, size = 140, onClick, testId }: ProgressCircleProps) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (value / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [value, circumference]);

  return (
    <Card
      className="flex flex-col items-center justify-center p-4 space-y-2 cursor-pointer group transition-shadow duration-300 hover:shadow-xl"
      onClick={onClick}
      data-testid={testId}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 }}}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--border))" strokeWidth="8" fill="transparent" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
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
          <div className="mb-1 text-primary">{icon}</div>
          <span className="text-xl font-bold text-primary">{value}%</span>
        </div>
      </motion.div>
      <span className="font-medium text-sm text-center text-primary/90 font-headline">{label}</span>
    </Card>
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
            <ProgressCircle label="Fitness" value={progress.fitness} color="hsl(var(--primary))" icon={<Dumbbell size={28}/>} onClick={() => onCircleClick('Fitness')} testId="progress-circle-fitness" />
            <ProgressCircle label="Nutrition" value={progress.nutrition} color="#10b981" icon={<Apple size={28} />} onClick={() => onCircleClick('Nutrition')} testId="progress-circle-nutrition" />
            <ProgressCircle label="Mental" value={progress.mental} color="#8b5cf6" icon={<BrainCircuit size={28} />} onClick={() => onCircleClick('Mental')} testId="progress-circle-mental" />
        </div>
    );
};


export default ProgressCircles;
