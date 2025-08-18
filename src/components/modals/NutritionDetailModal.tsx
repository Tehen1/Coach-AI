import { useState } from "react";
import { appData } from "@/lib/data";
import type { RecipeCategory, RecipeId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Apple, Beef, Sandwich, Cookie } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";

interface NutritionDetailModalProps {
  initialCategory: RecipeCategory;
  onSelectRecipe: (category: RecipeCategory, recipeId: RecipeId) => void;
  onOpenWaterTracker: () => void;
  onClose: () => void;
}

const categoryInfo = {
    breakfast: { name: 'Petit-déjeuner', icon: <Apple className="size-4 mr-2" />},
    lunch: { name: 'Déjeuner', icon: <Sandwich className="size-4 mr-2" /> },
    dinner: { name: 'Dîner', icon: <Beef className="size-4 mr-2" /> },
    snacks: { name: 'Collations', icon: <Cookie className="size-4 mr-2" /> }
}

const NutritionDetailModal = ({ initialCategory, onSelectRecipe, onOpenWaterTracker }: NutritionDetailModalProps) => {

  return (
    <div className="p-1">
        <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-headline">🥗 Nutrition</h3>
            <p className="text-white/80 text-sm">Découvrez des recettes saines et délicieuses</p>
        </div>
        
        <Tabs defaultValue={initialCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto bg-black/20">
                {(Object.keys(appData.nutritionData.recipes) as RecipeCategory[]).map(cat => (
                    <TabsTrigger key={cat} value={cat} className="flex-1 data-[state=active]:bg-accent/80 data-[state=active]:text-primary-foreground">
                       {categoryInfo[cat].icon} {categoryInfo[cat].name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {(Object.keys(appData.nutritionData.recipes) as RecipeCategory[]).map(cat => (
                <TabsContent key={cat} value={cat}>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2 mt-4">
                        {appData.nutritionData.recipes[cat].map(recipe => (
                            <GlassCard key={recipe.id} className="p-4 cursor-pointer hover:border-accent/80" onClick={() => onSelectRecipe(cat, recipe.id)}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">{recipe.emoji}</span>
                                        <h4 className="font-semibold text-base">{recipe.name}</h4>
                                    </div>
                                    <div className="text-right text-xs">
                                        <div className="text-white/70">⏱️ {recipe.time}</div>
                                        <div className="text-white/50">{recipe.calories} cal</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex space-x-3 text-xs text-white/70">
                                        <span>P: {recipe.macros.protein}g</span>
                                        <span>G: {recipe.macros.carbs}g</span>
                                        <span>L: {recipe.macros.fat}g</span>
                                    </div>
                                    <span className="text-xs text-accent/80">Voir recette →</span>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>

        <div className="mt-6">
            <Button onClick={onOpenWaterTracker} className="w-full bg-gradient-to-r from-blue-500 to-cyan-400">
                <Droplets className="mr-2 size-4" /> Suivi Hydratation
            </Button>
        </div>
    </div>
  );
};

export default NutritionDetailModal;
