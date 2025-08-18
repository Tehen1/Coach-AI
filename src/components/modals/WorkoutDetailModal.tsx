import type { WorkoutProgram, ExerciseId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dumbbell, BarChart, Timer, ChevronRight } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
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
                <h3 className="text-xl font-bold font-headline">{program.name}</h3>
            </div>
            <p className="text-white/80 text-sm mb-2">{program.description}</p>
            <div className="flex space-x-4 text-sm text-white/70">
                <span className="flex items-center"><Timer className="size-4 mr-1"/>{program.duration}</span>
                <span className="flex items-center"><BarChart className="size-4 mr-1"/>{program.difficulty}</span>
            </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {program.exercises.map(exercise => (
                <GlassCard key={exercise.id} className="p-3 cursor-pointer hover:border-accent/80" onClick={() => onSelectExercise(exercise.id)}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{exercise.icon}</span>
                            <div>
                                <h4 className="font-semibold text-sm">{exercise.name}</h4>
                                <p className="text-xs text-white/70">{exercise.duration} · {exercise.calories} cal</p>
                            </div>
                        </div>
                        <ChevronRight className="text-white/50 size-5"/>
                    </div>
                </GlassCard>
            ))}
        </div>
        
        <div className="mt-6">
            <Button onClick={handleStartWorkout} className="w-full bg-accent hover:bg-accent/90 text-primary-foreground">
                <Dumbbell className="mr-2 size-4" /> Commencer l&apos;entraînement
            </Button>
        </div>
    </div>
  );
};

export default WorkoutDetailModal;
