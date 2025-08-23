
import type { WorkoutProgram, ExerciseId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dumbbell, BarChart, Timer, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface WorkoutDetailModalProps {
  program: WorkoutProgram;
  onSelectExercise: (exerciseId: ExerciseId) => void;
  onClose: () => void;
}

const WorkoutDetailModal = ({ program, onSelectExercise }: WorkoutDetailModalProps) => {
    const { toast } = useToast();

    const handleStartWorkout = () => {
        toast({
            title: `🚀 Début de l'entraînement: ${program.name}`,
        });
    };

  return (
    <div className="p-1">
        <div className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: program.color }} />
                <h3 className="text-xl font-bold font-headline text-primary">{program.name}</h3>
            </div>
            <p className="text-foreground/80 text-sm mb-2">{program.description}</p>
            <div className="flex space-x-4 text-sm text-foreground/70">
                <span className="flex items-center"><Timer className="mr-1"/>{program.duration}</span>
                <span className="flex items-center"><BarChart className="mr-1"/>{program.difficulty}</span>
            </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-4">
            {program.exercises.map(exercise => (
                <Card key={exercise.id} data-testid={`exercise-card-${exercise.id}`} className="p-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectExercise(exercise.id as ExerciseId)}>
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
            ))}
        </div>
        
        <div className="mt-6">
            <Button onClick={handleStartWorkout} data-testid="start-workout-button" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Dumbbell className="mr-2" /> Commencer l&apos;entraînement
            </Button>
        </div>
    </div>
  );
};

export default WorkoutDetailModal;
