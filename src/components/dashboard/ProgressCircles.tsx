"use client";

import { useState, useEffect } from 'react';
import { Dumbbell, Apple, BrainCircuit } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';

interface ProgressCircleProps {
  label: 'Fitness' | 'Nutrition' | 'Mental';
  value: number;
  color: string;
  size?: number;
  onClick: () => void;
}

const ProgressCircle = ({ label, value, color, size = 140, onClick }: ProgressCircleProps) => {
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

  const getIcon = () => {
    switch (label) {
      case 'Fitness': return <Dumbbell className="size-6 text-white" />;
      case 'Nutrition': return <Apple className="size-6 text-white" />;
      case 'Mental': return <BrainCircuit className="size-6 text-white" />;
      default: return null;
    }
  };

  return (
    <div
      className="flex flex-col items-center space-y-2 cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="relative transform transition-transform group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="8" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeLinecap="round"
            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-1">{getIcon()}</div>
          <span className="text-xl font-bold text-white">{value}%</span>
        </div>
      </div>
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
            <ProgressCircle label="Fitness" value={progress.fitness} color="#3b82f6" onClick={() => onCircleClick('Fitness')} />
            <ProgressCircle label="Nutrition" value={progress.nutrition} color="#10b981" onClick={() => onCircleClick('Nutrition')} />
            <ProgressCircle label="Mental" value={progress.mental} color="#8b5cf6" onClick={() => onCircleClick('Mental')} />
        </div>
    );
};


export default ProgressCircles;
