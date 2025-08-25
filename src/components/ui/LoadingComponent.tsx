import { motion } from 'framer-motion';

export default function LoadingComponent() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-center text-primary"
    >
      <motion.div 
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <span className="text-4xl">👩🏽‍🦱</span>
      </motion.div>
      <h1 className="text-4xl font-headline font-bold mb-2 text-primary">Fadma Coach AI</h1>
      <p className="text-primary/70 text-lg">Votre coach personnel IA 🏋️🥗🧘</p>
      <div className="mt-8 w-48 h-1 bg-primary/10 rounded-full mx-auto overflow-hidden">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}