
import type { MentalExercise, MentalExerciseId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Smile, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface MentalWellnessModalProps {
  mentalExercises: MentalExercise[];
  onSelectExercise: (exerciseId: MentalExerciseId) => void;
  onClose: () => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  },
};

const MentalWellnessModal = ({ mentalExercises, onSelectExercise }: MentalWellnessModalProps) => {
    const { toast } = useToast();

    const handleMoodTracker = () => {
        toast({
            title: '😊 Suivi d\'humeur activé!',
            description: 'Notez votre humeur chaque jour pour suivre votre bien-être.'
        })
    }

  return (
    <div className="p-1">
        <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [-5, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              className="inline-block"
            >
              <BrainCircuit className="mx-auto size-12 text-accent mb-2"/>
            </motion.div>

            <h3 className="text-xl font-bold font-headline text-primary">Bien-être Mental</h3>
            <p className="text-foreground/80 text-sm">Exercices pour la relaxation et la concentration</p>
        </motion.div>
        
        <motion.div 
          className="space-y-3 max-h-80 overflow-y-auto pr-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            {mentalExercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectExercise(exercise.id as MentalExerciseId)}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{exercise.icon}</span>
                                <div>
                                    <h4 className="font-semibold text-base">{exercise.name}</h4>
                                    <p className="text-xs text-foreground/70">{exercise.duration} · {exercise.difficulty}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-foreground/30 size-5"/>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </motion.div>

        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
            <Button onClick={handleMoodTracker} className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">
                <Smile className="mr-2" /> Suivi humeur
            </Button>
        </motion.div>
    </div>
  );
};

export default MentalWellnessModal;
