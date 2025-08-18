import type { MentalExercise } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Timer, BarChart, Tag, Sparkles, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MentalExerciseDetailModalProps {
  exercise: MentalExercise;
  onBack: () => void;
  onClose: () => void;
}

const MentalExerciseDetailModal = ({ exercise, onBack }: MentalExerciseDetailModalProps) => {
    const { toast } = useToast();

    const handleStartExercise = () => {
        toast({
            title: `🧘 Début de: ${exercise.name}`,
        });
    }

  return (
    <div className="p-1">
        <div className="mb-6">
            <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{exercise.icon}</div>
                <div>
                <h3 className="text-xl font-bold font-headline">{exercise.name}</h3>
                <p className="text-white/80 text-sm">{exercise.description}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                <div className="bg-white/10 p-2 rounded-lg text-center"><Timer className="mx-auto mb-1 size-5" />{exercise.duration}</div>
                <div className="bg-white/10 p-2 rounded-lg text-center"><BarChart className="mx-auto mb-1 size-5" />{exercise.difficulty}</div>
                <div className="bg-white/10 p-2 rounded-lg text-center"><Tag className="mx-auto mb-1 size-5" />{exercise.category}</div>
            </div>
            <div className="mb-4">
                <h4 className="font-semibold mb-2 flex items-center text-sm font-headline"><Sparkles className="size-4 mr-2 text-accent"/>Bienfaits</h4>
                <div className="flex flex-wrap gap-2">
                {exercise.benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">{benefit}</Badge>
                ))}
                </div>
            </div>
        </div>

        <div className="mb-6">
            <h4 className="font-semibold mb-3 text-base font-headline">Étapes à Suivre</h4>
            <ol className="space-y-3 text-sm">
                {exercise.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 bg-accent text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{index + 1}</span>
                    <span>{instruction}</span>
                </li>
                ))}
            </ol>
        </div>

        {exercise.tips && (
            <div className="bg-accent/20 border-l-4 border-accent p-4 mb-6 text-sm">
                 <h4 className="font-semibold mb-1 font-headline">Conseil</h4>
                 <p>{exercise.tips}</p>
            </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleStartExercise} className="flex-1 bg-accent hover:bg-accent/90 text-primary-foreground">
                <BrainCircuit className="mr-2 size-4" /> Commencer l&apos;exercice
            </Button>
            <Button variant="outline" onClick={onBack} className="bg-white/20 border-white/30 hover:bg-white/30">
                <ArrowLeft className="mr-2 size-4" /> Retour
            </Button>
        </div>
    </div>
  );
};

export default MentalExerciseDetailModal;
