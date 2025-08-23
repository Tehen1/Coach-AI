
"use client";

import { Card } from '@/components/ui/card';
import { Flame, Star, Timer, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCards = () => {
    const stats = [
        { icon: <Flame size={24} className="text-orange-500" />, value: '1,247', label: 'Calories' },
        { icon: <Star size={24} className="text-yellow-500" />, value: '15', label: 'Série' },
        { icon: <Timer size={24} className="text-blue-500" />, value: '47min', label: 'Temps Actif' },
        { icon: <HeartPulse size={24} className="text-red-500" />, value: '142', label: 'BPM' },
    ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -5 }}
                 whileTap={{ scale: 0.95 }}
            >
                <Card
                className="p-4 text-center cursor-pointer flex flex-col items-center justify-center space-y-2 h-full transition-shadow hover:shadow-md"
                >
                    <div className="flex-shrink-0">{stat.icon}</div>
                    <div className="text-xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-foreground/70">{stat.label}</div>
                </Card>
            </motion.div>
        ))}
    </div>
  );
};

export default StatsCards;
