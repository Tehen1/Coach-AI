export type ExerciseId = 
  | 'pilates_warmup' | 'pilates_hundred' | 'pilates_roll_up' | 'pilates_single_leg' | 'pilates_plank' | 'pilates_stretching'
  | 'pilates_warmup_int' | 'pilates_teaser' | 'pilates_saw' | 'pilates_swan' | 'pilates_corkscrew' | 'pilates_cool_down_int'
  | 'pilates_advanced_warmup' | 'pilates_control_balance' | 'pilates_boomerang' | 'pilates_snake_twist' | 'pilates_star' | 'pilates_integration'
  | 'warmup' | 'bodyweight' | 'cardio' | 'stretch'
  | 'warmup_int' | 'strength' | 'hiit' | 'recovery'
  | 'warmup_adv' | 'strength_adv' | 'conditioning' | 'recovery_adv';

export interface Exercise {
  id: ExerciseId | string;
  name: string;
  duration: string;
  icon: string;
  calories: number;
  sets: number;
  description: string;
  instructions: string[];
}

export type WorkoutProgramId = 
  | 'pilates_beginner' | 'pilates_intermediate' | 'pilates_advanced'
  | 'beginner' | 'intermediate' | 'advanced';

export interface WorkoutProgram {
  name: string;
  description: string;
  duration: string;
  difficulty: 'Facile' | 'Modéré' | 'Difficile' | 'Expert';
  color: string;
  exercises: Exercise[];
}

export type RecipeId = 'avocado_toast' | 'protein_smoothie' | 'quinoa_bowl' | 'salmon_veggies' | 'energy_balls';
export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface Recipe {
  id: RecipeId | string;
  name: string;
  emoji: string;
  time: string;
  difficulty: 'Facile' | 'Modéré' | 'Difficile';
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients: string[];
  instructions: string[];
  tips?: string;
}

export interface WaterGlass {
    time: string;
    amount: number;
    completed: boolean;
}

export interface WaterTrackerData {
  dailyGoal: number;
  currentIntake: number;
  glasses: WaterGlass[];
}

export interface NutritionData {
  recipes: Record<RecipeCategory, Recipe[]>;
  waterTracker: WaterTrackerData;
  macroTargets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export type MentalExerciseId = 'breathing_478' | 'meditation' | 'body_scan' | 'gratitude';
export type MentalCategory = 'respiration' | 'meditation' | 'relaxation' | 'bien-etre';

export interface MentalExercise {
    id: MentalExerciseId | string;
    name: string;
    description: string;
    duration: string;
    icon: string;
    category: MentalCategory;
    difficulty: 'Facile' | 'Modéré' | 'Difficile';
    benefits: string[];
    instructions: string[];
    tips?: string;
}

export interface AppData {
    workoutPrograms: Record<WorkoutProgramId, WorkoutProgram>;
    nutritionData: NutritionData;
    mentalExercises: MentalExercise[];
}