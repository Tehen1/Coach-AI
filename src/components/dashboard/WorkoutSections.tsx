
import GlassCard from '@/components/shared/GlassCard';
import type { WorkoutProgram, WorkoutProgramId } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PilatesIcon } from '@/components/icons';
import { Dumbbell } from 'lucide-react';

interface WorkoutSectionsProps {
    workoutPrograms: Record<WorkoutProgramId, WorkoutProgram>;
    onProgramClick: (programId: WorkoutProgramId) => void;
}

const WorkoutSections = ({ workoutPrograms, onProgramClick }: WorkoutSectionsProps) => {

    const pilatesPrograms = Object.entries(workoutPrograms).filter(([key]) => key.includes('pilates'));
    const otherPrograms = Object.entries(workoutPrograms).filter(([key]) => !key.includes('pilates'));

  return (
    <div className="space-y-6">
        {/* Pilates Section */}
        <GlassCard className="p-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-300/30">
            <div className="text-center mb-6">
                <PilatesIcon className="mx-auto size-12 text-pink-300 mb-2" />
                <h3 className="text-2xl font-bold text-white mb-2 font-headline">
                    Pilates - Spécial Femmes
                </h3>
                <p className="text-white/80">
                    Découvrez le Pilates : renforcement, flexibilité et bien-être
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pilatesPrograms.map(([key, program]) => (
                    <button
                    key={key}
                    data-testid={`program-card-${key}`}
                    className="text-left p-4 bg-white/15 rounded-lg hover:bg-white/25 transition-all duration-200 hover:scale-105 border border-pink-300/20"
                    onClick={() => onProgramClick(key as WorkoutProgramId)}
                    >
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: (program as WorkoutProgram).color }} />
                            <h4 className="font-semibold text-white">{(program as WorkoutProgram).name}</h4>
                        </div>
                        <p className="text-sm text-white/80 mb-2 h-10">{(program as WorkoutProgram).description}</p>
                        <div className="flex space-x-3 text-xs text-pink-200">
                            <span>⏱️ {(program as WorkoutProgram).duration}</span>
                            <span>📊 {(program as WorkoutProgram).difficulty}</span>
                        </div>
                    </button>
                ))}
            </div>
            <div className="mt-6 text-center">
                <Button data-testid="start-pilates-button" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform" onClick={() => onProgramClick('pilates_beginner')}>
                    <PilatesIcon className="mr-2 h-5 w-5" />
                    Commencer le Pilates
                </Button>
            </div>
        </GlassCard>

        {/* Other Programs */}
        <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center font-headline">
                <Dumbbell className="mr-2 size-5" />
                Autres Programmes d&apos;entraînement
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherPrograms.map(([key, program]) => (
                <button
                    key={key}
                    data-testid={`program-card-${key}`}
                    className="text-left p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 hover:scale-105"
                    onClick={() => onProgramClick(key as WorkoutProgramId)}
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: (program as WorkoutProgram).color }} />
                        <h4 className="font-semibold">{(program as WorkoutProgram).name}</h4>
                    </div>
                    <p className="text-sm text-white/70 mb-2 h-10">{(program as WorkoutProgram).description}</p>
                    <div className="flex space-x-3 text-xs text-white/60">
                        <span>⏱️ {(program as WorkoutProgram).duration}</span>
                        <span>📊 {(program as WorkoutProgram).difficulty}</span>
                    </div>
                </button>
            ))}
            </div>
        </GlassCard>

    </div>
  );
};

export default WorkoutSections;
