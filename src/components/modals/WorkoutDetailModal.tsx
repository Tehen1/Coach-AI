
import type { WorkoutProgram, ExerciseId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dumbbell, BarChart, Timer, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";


interface WorkoutDetailModalProps {
  program: WorkoutProgram;
  onSelectExercise: (exerciseId: ExerciseId) => void;
  onClose: () => void;
}

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const WorkoutDetailModal = ({ program, onSelectExercise }: WorkoutDetailModalProps) => {
    const { toast } = useToast();

    const handleStartWorkout = () => {
        toast({
            title: `🚀 Début de l'entraînement: ${program.name}`,
        });
    };

  return (
    <motion.div 
        className="p-1"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
        <motion.div variants={itemVariants} className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
                <motion.div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: program.color }}
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    transition={{duration: 0.5}}
                />
                <h3 className="text-xl font-bold font-headline text-primary">{program.name}</h3>
            </div>
            <p className="text-foreground/80 text-sm mb-2">{program.description}</p>
            <div className="flex space-x-4 text-sm text-foreground/70">
                <span className="flex items-center"><Timer className="mr-1"/>{program.duration}</span>
                <span className="flex items-center"><BarChart className="mr-1"/>{program.difficulty}</span>
            </div>
        </motion.div>

        <motion.div 
            className="space-y-3 max-h-80 overflow-y-auto pr-4"
            variants={listVariants}
        >
            {program.exercises.map(exercise => (
                <motion.div
                    key={exercise.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                >
                    <Card data-testid={`exercise-card-${exercise.id}`} className="p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectExercise(exercise.id as ExerciseId)}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{exercise.icon}</span>
                                <div>
                                    <h4 className="font-semibold text-sm">{exercise.name}</h4>
                                    <p className="text-xs text-foreground/70">{exercise.duration} · {exercise.calories} cal</p>
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
            <Button onClick={handleStartWorkout} data-testid="start-workout-button" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Dumbbell className="mr-2" /> Commencer l&apos;entraînement
            </Button>
        </motion.div>
    </motion.div>
  );
};

export default WorkoutDetailModal;
