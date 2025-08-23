
import type { MentalExercise, MentalExerciseId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Smile, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface MentalWellnessModalProps {
  mentalExercises: MentalExercise[];
  onSelectExercise: (exerciseId: MentalExerciseId) => void;
  onClose: () => void;
}

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
        <div className="text-center mb-6">
            <BrainCircuit className="mx-auto size-12 text-accent mb-2"/>
            <h3 className="text-xl font-bold font-headline text-primary">Bien-être Mental</h3>
            <p className="text-foreground/80 text-sm">Exercices pour la relaxation et la concentration</p>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto pr-4">
            {mentalExercises.map((exercise) => (
                <Card key={exercise.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectExercise(exercise.id as MentalExerciseId)}>
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
            ))}
        </div>

        <div className="mt-6">
            <Button onClick={handleMoodTracker} className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">
                <Smile className="mr-2" /> Suivi humeur
            </Button>
        </div>
    </div>
  );
};

export default MentalWellnessModal;
