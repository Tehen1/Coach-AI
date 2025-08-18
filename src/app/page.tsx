
"use client";
import React, { useState, useEffect } from "react";
import type {
  WorkoutProgram,
  Exercise,
  Recipe,
  MentalExercise,
  RecipeCategory,
  WorkoutProgramId,
  ExerciseId,
  RecipeId,
  MentalExerciseId,
  AppData,
} from "@/lib/types";

import { useRequireAuth } from "@/hooks/use-auth";
import { getUserData, updateWaterTracker } from "@/services/user-data";

import Header from "@/components/dashboard/Header";
import ProgressCircles from "@/components/dashboard/ProgressCircles";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import WorkoutSections from "@/components/dashboard/WorkoutSections";
import MotivationCard from "@/components/dashboard/MotivationCard";
import PersonalizedAnalysis from "@/components/dashboard/PersonalizedAnalysis";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import WorkoutDetailModal from "@/components/modals/WorkoutDetailModal";
import ExerciseDetailModal from "@/components/modals/ExerciseDetailModal";
import NutritionDetailModal from "@/components/modals/NutritionDetailModal";
import RecipeDetailModal from "@/components/modals/RecipeDetailModal";
import WaterTrackerModal from "@/components/modals/WaterTrackerModal";
import MentalWellnessModal from "@/components/modals/MentalWellnessModal";
import MentalExerciseDetailModal from "@/components/modals/MentalExerciseDetailModal";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";


type ModalState =
  | { type: "closed" }
  | { type: "workoutDetail"; programId: WorkoutProgramId }
  | { type: "exerciseDetail"; programId: WorkoutProgramId; exerciseId: ExerciseId }
  | { type: "nutritionDetail"; category: RecipeCategory }
  | { type: "recipeDetail"; category: RecipeCategory; recipeId: RecipeId }
  | { type: "waterTracker" }
  | { type: "mentalWellness" }
  | { type: "mentalExerciseDetail"; exerciseId: MentalExerciseId }
  | { type: "personalizedAnalysis" };

export default function Home() {
  const { user, loading } = useRequireAuth();
  const { toast } = useToast();
  const [modalState, setModalState] = useState<ModalState>({ type: "closed" });
  const [isMounted, setIsMounted] = useState(false);
  const [appData, setAppData] = useState<AppData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 1500); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const data = await getUserData(user.uid);
        if (data) {
          setAppData(data);
        } else {
           console.log("No user data found, should be handled by auth hook.");
        }
      };
      fetchUserData();
    }
  }, [user]);

  const openModal = (state: ModalState) => setModalState(state);
  const closeModal = () => setModalState({ type: "closed" });
  
  const handleWaterGlassesChange = async (newGlasses: any) => {
    if (user && appData) {
      try {
        await updateWaterTracker(user.uid, newGlasses);
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
          }
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de mettre à jour le suivi d'hydratation.",
        });
      }
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
      default:
        return null;
    }
  };
  
  if (loading || !user || !isMounted || !appData) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center text-white"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto"
          >
            <span className="text-4xl">👩🏽‍🦱</span>
          </motion.div>
          <h1 className="text-4xl font-headline font-bold mb-2">Fadma Coach AI</h1>
          <p className="text-white/70 text-lg">Votre coach personnel IA 🏋️🥗🧘</p>
          <div className="mt-8 w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
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
    <main className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto text-white">
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
      }} />
      <WorkoutSections workoutPrograms={appData.workoutPrograms} onProgramClick={(programId) => openModal({ type: 'workoutDetail', programId })} />
      <MotivationCard />

      <Dialog open={modalState.type !== 'closed'} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <DialogContent className="bg-white/10 backdrop-blur-2xl border-white/20 text-white max-w-2xl">
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </main>
  );
}
