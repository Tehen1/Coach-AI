
"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from 'next/dynamic';
import AnimatedButton from '../components/AnimatedButton';
import type {
  RecipeCategory,
  WorkoutProgramId,
  ExerciseId,
  RecipeId,
  MentalExerciseId,
  AppData,
} from "@/lib/types";

import Header from "@/components/dashboard/Header";
import ProgressCircles from "@/components/dashboard/ProgressCircles";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import WorkoutSections from "@/components/dashboard/WorkoutSections";
import MotivationCard from "@/components/dashboard/MotivationCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { appData as initialAppData } from "@/lib/data";
import { Button } from "@/components/ui/button";

// Affichage du composant d'animation
<AnimatedButton />;

// Définition des options dynamiques pour les modaux
const modalOptions = {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
};

// Lazy load all modals avec les bonnes pratiques
const WorkoutDetailModal = dynamic(
  () => import('@/components/modals/WorkoutDetailModal'),
  modalOptions
);
const ExerciseDetailModal = dynamic(() => import('@/components/modals/ExerciseDetailModal'), {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
});
const NutritionDetailModal = dynamic(() => import('@/components/modals/NutritionDetailModal'), {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
});
const RecipeDetailModal = dynamic(() => import('@/components/modals/RecipeDetailModal'), {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
});
const WaterTrackerModal = dynamic(() => import('@/components/modals/WaterTrackerModal'), {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
});
const MentalWellnessModal = dynamic(() => import('@/components/modals/MentalWellnessModal'), {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
});
const MentalExerciseDetailModal = dynamic(() => import('@/components/modals/MentalExerciseDetailModal'), {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
});
const PersonalizedAnalysis = dynamic(() => import('@/components/dashboard/PersonalizedAnalysis'), {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
});
const HealthConnectModal = dynamic(() => import('@/components/modals/HealthConnectModal'), {
  suspense: true,
  loading: () => <Skeleton className="w-full h-96" />
});


type ModalState =
  | { type: "closed" }
  | { type: "workoutDetail"; programId: WorkoutProgramId }
  | { type: "exerciseDetail"; programId: WorkoutProgramId; exerciseId: ExerciseId }
  | { type: "nutritionDetail"; category: RecipeCategory }
  | { type: "recipeDetail"; category: RecipeCategory; recipeId: RecipeId }
  | { type: "waterTracker" }
  | { type: "mentalWellness" }
  | { type: "mentalExerciseDetail"; exerciseId: MentalExerciseId }
  | { type: "personalizedAnalysis" }
  | { type: "healthConnect" };

const LOCAL_STORAGE_KEY = 'yourCoachAiAppData';

export default function Home() {
  const { toast } = useToast();
  const [modalState, setModalState] = useState<ModalState>({ type: "closed" });
  const [isMounted, setIsMounted] = useState(false);
  const [appData, setAppData] = useState<AppData | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        setAppData(JSON.parse(savedData));
      } else {
        setAppData(initialAppData);
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
      setAppData(initialAppData);
    }
    const timer = setTimeout(() => setIsMounted(true), 500); // Shorter loading time
    return () => clearTimeout(timer);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (appData) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appData));
      } catch (error) {
        console.error("Failed to save data to localStorage:", error);
      }
    }
  }, [appData]);

  const openModal = (state: ModalState) => setModalState(state);
  const closeModal = () => setModalState({ type: "closed" });
  
  const handleWaterGlassesChange = async (newGlasses: any) => {
    if (appData) {
      try {
        setAppData(prevData => {
          if (!prevData) return null;
          return {
            ...prevData,
            nutritionData: {
              ...prevData.nutritionData,
              waterTracker: {
                ...prevData.nutritionData.waterTracker,
                glasses: newGlasses,
              }
            }
          };
        });
        // Toast is now triggered inside the WaterTrackerModal for immediate feedback
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de mettre à jour le suivi d'hydratation.",
        });
      }
    }
  };
  
  const getModalTitle = (): string => {
    if (!appData || modalState.type === 'closed') return "";
  
    switch (modalState.type) {
      case 'workoutDetail':
        return appData.workoutPrograms[modalState.programId]?.name || 'Programme';
      case 'exerciseDetail': {
        const program = appData.workoutPrograms[modalState.programId];
        const exercise = program?.exercises.find(ex => ex.id === modalState.exerciseId);
        return exercise?.name || 'Exercice';
      }
      case 'nutritionDetail':
        return 'Détails de Nutrition';
      case 'recipeDetail': {
        const recipe = appData.nutritionData.recipes[modalState.category]?.find(r => r.id === modalState.recipeId);
        return recipe?.name || 'Recette';
      }
      case 'waterTracker':
        return 'Suivi d\'Hydratation';
      case 'mentalWellness':
        return 'Bien-être Mental';
      case 'mentalExerciseDetail': {
        const exercise = appData.mentalExercises.find(ex => ex.id === modalState.exerciseId);
        return exercise?.name || 'Exercice Mental';
      }
      case 'personalizedAnalysis':
        return 'Analyse Personnalisée';
      case 'healthConnect':
        return 'Santé Connect';
      default:
        return 'YourCoachAi';
    }
  };

  const renderModalContent = () => {
    if (!isMounted || modalState.type === "closed" || !appData) {
      return null;
    }

    switch (modalState.type) {
      case "workoutDetail": {
        const program = appData.workoutPrograms[modalState.programId];
        return <WorkoutDetailModal program={program} onSelectExercise={(exerciseId) => openModal({ type: 'exerciseDetail', programId: modalState.programId, exerciseId })} onClose={closeModal} />;
      }
      case "exerciseDetail": {
        const program = appData.workoutPrograms[modalState.programId];
        const exercise = program?.exercises.find(ex => ex.id === modalState.exerciseId);
        return exercise ? <ExerciseDetailModal exercise={exercise} program={program} onBack={() => openModal({ type: 'workoutDetail', programId: modalState.programId })} onClose={closeModal} /> : null;
      }
      case 'nutritionDetail':
        return <NutritionDetailModal nutritionData={appData.nutritionData} initialCategory={modalState.category} onSelectRecipe={(category, recipeId) => openModal({ type: 'recipeDetail', category, recipeId })} onOpenWaterTracker={() => openModal({ type: 'waterTracker' })} onClose={closeModal} />;
      case 'recipeDetail': {
        const recipe = appData.nutritionData.recipes[modalState.category]?.find(r => r.id === modalState.recipeId);
        return recipe ? <RecipeDetailModal recipe={recipe} category={modalState.category} onBack={() => openModal({ type: 'nutritionDetail', category: modalState.category })} onClose={closeModal} /> : null;
      }
      case 'waterTracker':
        return <WaterTrackerModal waterTrackerData={appData.nutritionData.waterTracker} onGlassesChange={handleWaterGlassesChange} onBack={() => openModal({ type: 'nutritionDetail', category: 'breakfast' })} onClose={closeModal} />;
      case 'mentalWellness':
        return <MentalWellnessModal mentalExercises={appData.mentalExercises} onSelectExercise={(exerciseId) => openModal({ type: 'mentalExerciseDetail', exerciseId })} onClose={closeModal} />;
      case 'mentalExerciseDetail': {
        const exercise = appData.mentalExercises.find(ex => ex.id === modalState.exerciseId);
        return exercise ? <MentalExerciseDetailModal exercise={exercise} onBack={() => openModal({ type: 'mentalWellness' })} onClose={closeModal} /> : null;
      }
      case 'personalizedAnalysis':
        return <PersonalizedAnalysis />;
      case 'healthConnect':
        return <HealthConnectModal onClose={closeModal} />;
      default:
        return null;
    }
  };
  
  if (!isMounted || !appData) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center text-primary"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto"
          >
            <span className="text-4xl">👩🏽‍🦱</span>
          </motion.div>
          <h1 className="text-4xl font-headline font-bold mb-2 text-primary">YourCoachAi</h1>
          <p className="text-primary/70 text-lg">Votre coach personnel IA 🏋️🥗🧘</p>
          <div className="mt-8 w-48 h-1 bg-primary/10 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      <Header />
      <ProgressCircles onCircleClick={(category) => {
        if (category === 'Fitness') openModal({ type: 'workoutDetail', programId: 'beginner' });
        if (category === 'Nutrition') openModal({ type: 'nutritionDetail', category: 'breakfast' });
        if (category === 'Mental') openModal({ type: 'mentalWellness' });
      }} />
      <StatsCards />
      <QuickActions onActionClick={(action) => {
        if (action === 'Programmes') openModal({ type: 'workoutDetail', programId: 'beginner' });
        if (action === 'Pilates') openModal({ type: 'workoutDetail', programId: 'pilates_beginner' });
        if (action === 'Recettes') openModal({ type: 'nutritionDetail', category: 'breakfast' });
        if (action === 'Analyse AI') openModal({ type: 'personalizedAnalysis' });
        if (action === 'Santé Connect') openModal({ type: 'healthConnect' });
      }} />
      <WorkoutSections workoutPrograms={appData.workoutPrograms} onProgramClick={(programId) => openModal({ type: 'workoutDetail', programId })} />
      <MotivationCard />

      <Dialog open={modalState.type !== 'closed'} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <DialogContent className="bg-background text-foreground max-w-2xl" data-testid="main-dialog">
           <DialogHeader>
            <DialogTitle>{getModalTitle()}</DialogTitle>
          </DialogHeader>
          <Suspense fallback={<Skeleton className="w-full h-96" />}>
            {renderModalContent()}
          </Suspense>
        </DialogContent>
      </Dialog>
    </main>
  );
}

    