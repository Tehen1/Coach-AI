
import { useState } from "react";
import type { NutritionData, RecipeCategory, RecipeId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Apple, Beef, Sandwich, Cookie, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface NutritionDetailModalProps {
  nutritionData: NutritionData;
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

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const NutritionDetailModal = ({ nutritionData, initialCategory, onSelectRecipe, onOpenWaterTracker }: NutritionDetailModalProps) => {

  return (
    <div className="p-1">
        <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h3 className="text-xl font-bold font-headline text-primary">🥗 Nutrition</h3>
            <p className="text-foreground/80 text-sm">Découvrez des recettes saines et délicieuses</p>
        </motion.div>
        
        <Tabs defaultValue={initialCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                {(Object.keys(nutritionData.recipes) as RecipeCategory[]).map(cat => (
                    <TabsTrigger key={cat} value={cat} data-testid={`nutrition-tab-${cat}`} className="flex-1">
                       {categoryInfo[cat].icon} {categoryInfo[cat].name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {(Object.keys(nutritionData.recipes) as RecipeCategory[]).map(cat => (
                <TabsContent key={cat} value={cat}>
                    <motion.div 
                        className="space-y-3 max-h-80 overflow-y-auto pr-4 mt-4"
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {nutritionData.recipes[cat].map(recipe => (
                             <motion.div 
                                key={recipe.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                             >
                                <Card data-testid={`recipe-card-${recipe.id}`} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectRecipe(cat, recipe.id as RecipeId)}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{recipe.emoji}</span>
                                            <div>
                                                <h4 className="font-semibold text-base">{recipe.name}</h4>
                                                <div className="text-xs text-foreground/70">
                                                    <span>⏱️ {recipe.time}</span>
                                                    <span className="mx-1">·</span>
                                                    <span>🔥 {recipe.calories} cal</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="text-foreground/30 size-5"/>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </TabsContent>
            ))}
        </Tabs>

        <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <Button data-testid="open-water-tracker" onClick={onOpenWaterTracker} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Droplets className="mr-2" /> Suivi Hydratation
            </Button>
        </motion.div>
    </div>
  );
};

export default NutritionDetailModal;
