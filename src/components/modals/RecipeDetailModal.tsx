
import type { Recipe, RecipeCategory } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Timer, Flame, CookingPot, ChefHat, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface RecipeDetailModalProps {
  recipe: Recipe;
  category: RecipeCategory;
  onBack: () => void;
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const RecipeDetailModal = ({ recipe, category, onBack }: RecipeDetailModalProps) => {
    const { toast } = useToast();
    
    const handleAddToPlan = () => {
        toast({
            title: '📅 Recette ajoutée!',
            description: `${recipe.name} a été ajouté à votre planning.`
        })
    }

  return (
    <motion.div 
      className="p-1 max-h-[85vh] overflow-y-auto pr-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-start space-x-4 mb-4">
                <motion.div 
                  className="text-4xl"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  {recipe.emoji}
                </motion.div>
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
                <motion.div initial={{scale:0.8}} animate={{scale:1}} transition={{delay:0.1}} className="bg-red-100 p-2 rounded-lg text-center border border-red-200"><span className="text-red-600 font-bold">P</span> {recipe.macros.protein}g</motion.div>
                <motion.div initial={{scale:0.8}} animate={{scale:1}} transition={{delay:0.2}} className="bg-yellow-100 p-2 rounded-lg text-center border border-yellow-200"><span className="text-yellow-600 font-bold">G</span> {recipe.macros.carbs}g</motion.div>
                <motion.div initial={{scale:0.8}} animate={{scale:1}} transition={{delay:0.3}} className="bg-green-100 p-2 rounded-lg text-center border border-green-200"><span className="text-green-600 font-bold">L</span> {recipe.macros.fat}g</motion.div>
            </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
                <h4 className="font-semibold mb-2 flex items-center font-headline"><ShoppingCart className="mr-2"/>Ingrédients</h4>
                <ul className="space-y-1 text-sm list-disc list-inside marker:text-accent">
                    {recipe.ingredients.map((item, index) => <motion.li custom={index} initial={{opacity:0, x:-10}} animate={(i) => ({opacity:1, x:0, transition:{delay:i*0.05}})} key={index}>{item}</motion.li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-2 flex items-center font-headline"><CookingPot className="mr-2"/>Préparation</h4>
                <ol className="space-y-2 text-sm">
                    {recipe.instructions.map((step, index) => (
                        <motion.li 
                            key={index}
                            custom={index}
                            initial={{opacity:0, x:-10}}
                            animate={(i) => ({opacity:1, x:0, transition:{delay:i*0.05}})}
                            className="flex items-start space-x-2">
                           <span className="flex-shrink-0 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{index + 1}</span>
                           <span>{step}</span>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </motion.div>

        {recipe.tips && (
            <motion.div variants={itemVariants} className="bg-accent/10 border-l-4 border-accent p-4 mb-6 text-sm text-accent-foreground">
                 <h4 className="font-semibold mb-1 flex items-center font-headline"><ChefHat className="mr-2"/>Conseil du Chef</h4>
                 <p>{recipe.tips}</p>
            </motion.div>
        )}

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-2 sticky bottom-0 bg-background/80 backdrop-blur-sm py-3 -mx-1 px-1">
            <Button onClick={handleAddToPlan} data-testid="add-to-plan-button" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                Ajouter au planning
            </Button>
            <Button variant="outline" onClick={onBack} data-testid="back-to-recipes-button">
                <ArrowLeft className="mr-2" /> Retour
            </Button>
        </motion.div>
    </motion.div>
  );
};

export default RecipeDetailModal;
