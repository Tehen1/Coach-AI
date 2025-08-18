
import GlassCard from '@/components/shared/GlassCard';
import { Flame, Star, Timer, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCards = () => {
    const stats = [
        { icon: <Flame />, value: '1,247', label: 'Calories', color: 'text-orange-400' },
        { icon: <Star />, value: '15', label: 'Série', color: 'text-yellow-400' },
        { icon: <Timer />, value: '47min', label: 'Temps Actif', color: 'text-blue-400' },
        { icon: <HeartPulse />, value: '142', label: 'BPM', color: 'text-red-400' },
    ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
            >
                <GlassCard
                className="p-4 text-center cursor-pointer"
                >
                    <div className={`text-3xl mb-2 mx-auto ${stat.color}`}>{stat.icon}</div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                </GlassCard>
            </motion.div>
        ))}
    </div>
  );
};

export default StatsCards;
