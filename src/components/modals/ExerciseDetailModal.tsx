
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
        <div className="mb-6">
            <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{exercise.icon}</div>
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
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-base font-headline">Démonstration Visuelle</h4>
          <div className="p-2 bg-muted rounded-lg">
             <ExerciseIllustration exerciseId={exercise.id} />
          </div>
        </div>

        <div className="mb-6">
            <h4 className="font-semibold mb-3 text-base font-headline">Instructions Détaillées</h4>
            <ul className="space-y-2 text-sm">
                {exercise.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                    <span className="text-accent font-bold mt-1">{index + 1}.</span>
                    <span>{instruction}</span>
                </li>
                ))}
            </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sticky bottom-0 bg-background/80 backdrop-blur-sm py-3 -mx-1 px-1">
            <Button data-testid="start-exercise-button" onClick={handleStartExercise} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                Démarrer cet exercice
            </Button>
            <Button data-testid="back-to-program-button" variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2" /> Retour
            </Button>
        </div>
    </motion.div>
  );
};

export default ExerciseDetailModal;
