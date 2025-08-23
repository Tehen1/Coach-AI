
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { WaterTrackerData, WaterGlass } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Droplets, Check, Plus, RefreshCw, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

interface WaterTrackerModalProps {
    waterTrackerData: WaterTrackerData;
    onGlassesChange: (glasses: WaterGlass[]) => void;
    onBack: () => void;
    onClose: () => void;
}

const WaterTrackerModal = ({ waterTrackerData, onGlassesChange, onBack }: WaterTrackerModalProps) => {
    const { toast } = useToast();
    const [glasses, setGlasses] = useState(waterTrackerData.glasses);

    useEffect(() => {
        setGlasses(waterTrackerData.glasses);
    }, [waterTrackerData.glasses]);

    const completedGlasses = useMemo(() => glasses.filter(g => g.completed).length, [glasses]);
    const totalGlasses = glasses.length;
    const progressPercent = (completedGlasses / totalGlasses) * 100;

    const toggleGlass = (index: number) => {
        const newGlasses = [...glasses];
        const wasCompleted = newGlasses[index].completed;
        newGlasses[index].completed = !newGlasses[index].completed;
        setGlasses(newGlasses);
        onGlassesChange(newGlasses);

        if (!wasCompleted) {
            toast({
                title: '💧 Verre d\'eau bu!',
                description: `${completedGlasses + 1}/${totalGlasses} verres complétés aujourd'hui.`
            });
            if (completedGlasses + 1 === totalGlasses) {
                setTimeout(() => toast({
                    title: '🎉 Objectif hydratation atteint!',
                    description: 'Félicitations!'
                }), 500);
            }
        }
    };
    
    const resetTracker = () => {
        const resetGlasses = glasses.map(g => ({ ...g, completed: false }));
        setGlasses(resetGlasses);
        onGlassesChange(resetGlasses);
        toast({ title: '🔄 Suivi réinitialisé.' });
    };

    return (
        <div className="p-1">
            <div className="text-center mb-6">
                <Droplets className="mx-auto size-12 text-accent mb-2"/>
                <h3 className="text-xl font-bold font-headline text-primary">Suivi Hydratation</h3>
                <p className="text-foreground/80 text-sm">Objectif: {waterTrackerData.dailyGoal}ml par jour</p>
            </div>

            <div className="bg-muted rounded-full h-4 mb-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="text-center mb-6">
                <span className="font-bold">{completedGlasses}/{totalGlasses}</span>
                <span className="text-sm text-foreground/70 ml-1">verres bus</span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-4">
                {glasses.map((glass, index) => (
                    <Card key={index} className="p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{glass.completed ? '💧' : '🥛'}</span>
                            <div>
                                <div className="font-medium text-sm">{glass.time}</div>
                                <div className="text-xs text-foreground/70">{glass.amount}ml</div>
                            </div>
                        </div>
                        <Button size="sm" variant={glass.completed ? "default" : "outline"} onClick={() => toggleGlass(index)} data-testid={`water-glass-${index}`} className={glass.completed ? "bg-green-600 hover:bg-green-700" : ""}>
                            {glass.completed ? <Check /> : <Plus />}
                            <span className="ml-2 text-xs">{glass.completed ? 'Bu' : 'Boire'}</span>
                        </Button>
                    </Card>
                ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button onClick={resetTracker} variant="outline" data-testid="reset-water-tracker" className="flex-1">
                    <RefreshCw className="mr-2" /> Réinitialiser
                </Button>
                <Button onClick={onBack} variant="outline" data-testid="back-to-nutrition-button" className="flex-1">
                    <ArrowLeft className="mr-2" /> Retour
                </Button>
            </div>
        </div>
    );
};

export default WaterTrackerModal;
