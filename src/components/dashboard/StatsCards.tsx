import GlassCard from '@/components/shared/GlassCard';
import { Flame, Star, Timer, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedFire, AnimatedHeart, AnimatedClock, AnimatedTrophy } from '@/components/shared/AnimatedIcons';

const StatsCards = () => {
    const stats = [
        { icon: <AnimatedFire size={32} color="#f59e0b" />, value: '1,247', label: 'Calories' },
        { icon: <AnimatedTrophy size={32} color="#fbbf24" />, value: '15', label: 'Série' },
        { icon: <AnimatedClock size={32} color="#3b82f6" />, value: '47min', label: 'Temps Actif' },
        { icon: <AnimatedHeart size={32} color="#ef4444" />, value: '142', label: 'BPM' },
    ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -5 }}
                 whileTap={{ scale: 0.95 }}
            >
                <GlassCard
                className="p-4 text-center cursor-pointer flex flex-col items-center justify-center space-y-2 h-full"
                >
                    <div className="flex-shrink-0">{stat.icon}</div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                </GlassCard>
            </motion.div>
        ))}
    </div>
  );
};

export default StatsCards;
