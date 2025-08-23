
import type { Recipe, RecipeCategory } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Timer, Flame, CookingPot, ChefHat, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecipeDetailModalProps {
  recipe: Recipe;
  category: RecipeCategory;
  onBack: () => void;
  onClose: () => void;
}

const RecipeDetailModal = ({ recipe, category, onBack }: RecipeDetailModalProps) => {
    const { toast } = useToast();
    
    const handleAddToPlan = () => {
        toast({
            title: '📅 Recette ajoutée!',
            description: `${recipe.name} a été ajouté à votre planning.`
        })
    }

  return (
    <div className="p-1 max-h-[85vh] overflow-y-auto pr-4">
        <div className="mb-6">
            <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{recipe.emoji}</div>
                <div>
                <h3 className="text-xl font-bold font-headline">{recipe.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/80">
                   <div className="flex items-center"><Timer className="mr-1.5"/>{recipe.time}</div>
                   <div className="flex items-center"><Flame className="mr-1.5"/>{recipe.calories} cal</div>
                   <Badge variant="secondary">{recipe.difficulty}</Badge>
                </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-red-100 p-2 rounded-lg text-center border border-red-200"><span className="text-red-600 font-bold">P</span> {recipe.macros.protein}g</div>
                <div className="bg-yellow-100 p-2 rounded-lg text-center border border-yellow-200"><span className="text-yellow-600 font-bold">G</span> {recipe.macros.carbs}g</div>
                <div className="bg-green-100 p-2 rounded-lg text-center border border-green-200"><span className="text-green-600 font-bold">L</span> {recipe.macros.fat}g</div>
            </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
                <h4 className="font-semibold mb-2 flex items-center font-headline"><ShoppingCart className="mr-2"/>Ingrédients</h4>
                <ul className="space-y-1 text-sm list-disc list-inside marker:text-accent">
                    {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-2 flex items-center font-headline"><CookingPot className="mr-2"/>Préparation</h4>
                <ol className="space-y-2 text-sm">
                    {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex items-start space-x-2">
                           <span className="flex-shrink-0 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{index + 1}</span>
                           <span>{step}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>

        {recipe.tips && (
            <div className="bg-accent/10 border-l-4 border-accent p-4 mb-6 text-sm text-accent-foreground">
                 <h4 className="font-semibold mb-1 flex items-center font-headline"><ChefHat className="mr-2"/>Conseil du Chef</h4>
                 <p>{recipe.tips}</p>
            </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 sticky bottom-0 bg-background/80 backdrop-blur-sm py-3 -mx-1 px-1">
            <Button onClick={handleAddToPlan} data-testid="add-to-plan-button" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                Ajouter au planning
            </Button>
            <Button variant="outline" onClick={onBack} data-testid="back-to-recipes-button">
                <ArrowLeft className="mr-2" /> Retour
            </Button>
        </div>
    </div>
  );
};

export default RecipeDetailModal;
