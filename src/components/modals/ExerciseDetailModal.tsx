import type { Exercise, WorkoutProgram } from "@/lib/types";
import { Button } from "@/components/ui/button";
import ExerciseIllustration from "@/components/shared/ExerciseIllustration";
import { ArrowLeft, Timer, Flame, Repeat, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="p-1 max-h-[85vh] overflow-y-auto pr-2">
        <div className="mb-6">
            <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{exercise.icon}</div>
                <div>
                <h3 className="text-xl font-bold font-headline">{exercise.name}</h3>
                <p className="text-white/80 text-sm">{exercise.description}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">
                <div className="bg-white/10 p-2 rounded-lg text-center"><Timer className="mx-auto mb-1 size-5"/>{exercise.duration}</div>
                <div className="bg-white/10 p-2 rounded-lg text-center"><Flame className="mx-auto mb-1 size-5"/>{exercise.calories} cal</div>
                <div className="bg-white/10 p-2 rounded-lg text-center"><Repeat className="mx-auto mb-1 size-5"/>{exercise.sets} série{exercise.sets > 1 ? 's' : ''}</div>
                <div className="bg-white/10 p-2 rounded-lg text-center"><BarChart className="mx-auto mb-1 size-5"/>{program.difficulty}</div>
            </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-base font-headline">Démonstration Visuelle</h4>
          <div className="p-2 bg-black/20 rounded-lg">
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
        
        <div className="flex flex-col sm:flex-row gap-2 sticky bottom-0 bg-white/10 backdrop-blur-sm py-2 -mx-1 px-1">
            <Button onClick={handleStartExercise} className="flex-1 bg-accent hover:bg-accent/90 text-primary-foreground">
                Démarrer cet exercice
            </Button>
            <Button variant="outline" onClick={onBack} className="bg-white/20 border-white/30 hover:bg-white/30">
                <ArrowLeft className="mr-2 size-4" /> Retour
            </Button>
        </div>
    </div>
  );
};

export default ExerciseDetailModal;
