import type { MentalExercise, MentalExerciseId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Smile } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/shared/GlassCard";

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
            <h3 className="text-xl font-bold font-headline">Bien-être Mental</h3>
            <p className="text-white/80 text-sm">Exercices pour la relaxation et la concentration</p>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {mentalExercises.map((exercise) => (
                <GlassCard key={exercise.id} className="p-4 cursor-pointer hover:border-accent/80" onClick={() => onSelectExercise(exercise.id as MentalExerciseId)}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{exercise.icon}</span>
                            <h4 className="font-semibold text-base">{exercise.name}</h4>
                        </div>
                        <div className="text-right text-xs">
                            <div className="text-white/70">⏱️ {exercise.duration}</div>
                            <div className="text-white/50">{exercise.difficulty}</div>
                        </div>
                    </div>
                    <p className="text-sm text-white/80 mb-3">{exercise.description}</p>
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30 text-xs">{exercise.category}</Badge>
                        <span className="text-xs text-accent/80">Commencer →</span>
                    </div>
                </GlassCard>
            ))}
        </div>

        <div className="mt-6">
            <Button onClick={handleMoodTracker} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Smile className="mr-2 size-4" /> Suivi humeur
            </Button>
        </div>
    </div>
  );
};

export default MentalWellnessModal;
