import Image from "next/image";
import type { Exercise, WorkoutProgram } from "@/lib/types";
import { Button } from "@/components/ui/button";
import ExerciseIllustration from "@/components/shared/ExerciseIllustration";
import { ArrowLeft, Timer, Flame, Repeat, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ExerciseDetailModalProps {
  exercise: Exercise;
  program: WorkoutProgram;
  onBack: () => void;
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    },
  },
};


const ExerciseDetailModal = ({ exercise, program, onBack }: ExerciseDetailModalProps) => {
    const { toast } = useToast();

    const handleStartExercise = () => {
        toast({
            title: `💪 Exercice commencé: ${exercise.name}`,
        });
    }

  return (
    <motion.div 
      className="p-1 max-h-[85vh] overflow-y-auto pr-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
        <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-start space-x-4 mb-4">
                <motion.div 
                  className="text-4xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 150}}
                >
                  {exercise.icon}
                </motion.div>
                <div>
                <h3 className="text-xl font-bold font-headline">{exercise.name}</h3>
                <p className="text-foreground/80 text-sm">{exercise.description}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <Badge variant="secondary"><Timer className="mr-1.5"/>{exercise.duration}</Badge>
                <Badge variant="secondary"><Flame className="mr-1.5"/>{exercise.calories} cal</Badge>
                <Badge variant="secondary"><Repeat className="mr-1.5"/>{exercise.sets} série{exercise.sets > 1 ? 's' : ''}</Badge>
                <Badge variant="secondary"><BarChart className="mr-1.5"/>{program.difficulty}</Badge>
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <h4 className="font-semibold mb-2 text-base font-headline">Démonstration Visuelle</h4>
          <div className="p-2 bg-muted rounded-lg overflow-hidden">
             {exercise.imageUrl ? (
                <Image 
                    src={exercise.imageUrl} 
                    alt={`Illustration pour ${exercise.name}`}
                    width={600}
                    height={400}
                    data-ai-hint={`${exercise.name.split(' ')[0].toLowerCase()} exercise`}
                    className="w-full h-auto rounded-md object-cover"
                />
             ) : (
                <ExerciseIllustration exerciseId={exercise.id} />
             )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
            <h4 className="font-semibold mb-3 text-base font-headline">Instructions Détaillées</h4>
            <ul className="space-y-2 text-sm">
                {exercise.instructions.map((instruction, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start space-x-3"
                  custom={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={(i) => ({ 
                    opacity: 1, 
                    x: 0, 
                    transition: { delay: i * 0.1 } 
                  })}
                >
                    <span className="text-accent font-bold mt-1">{index + 1}.</span>
                    <span>{instruction}</span>
                </motion.li>
                ))}
            </ul>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2 sticky bottom-0 bg-background/80 backdrop-blur-sm py-3 -mx-1 px-1">
            <Button data-testid="start-exercise-button" onClick={handleStartExercise} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                Démarrer cet exercice
            </Button>
            <Button data-testid="back-to-program-button" variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2" /> Retour
            </Button>
        </motion.div>
    </motion.div>
  );
};

export default ExerciseDetailModal;
