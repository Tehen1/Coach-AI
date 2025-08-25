import { motion } from 'framer-motion';

export default function AnimatedButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05, color: '#4CAF50' }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-lg text-white font-medium bg-blue-500 hover:bg-blue-600 transition-colors"
    >
      Cliquez-moi !
    </motion.button>
  );
}