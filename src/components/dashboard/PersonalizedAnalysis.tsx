"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { personalizedFitnessAnalysis, PersonalizedFitnessAnalysisOutput } from "@/ai/flows/personalized-fitness-analysis";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  activityData: z.string().min(10, "Veuillez décrire vos activités récentes."),
  sleepData: z.string().min(10, "Veuillez décrire la qualité de votre sommeil."),
  nutritionData: z.string().min(10, "Veuillez décrire votre alimentation récente."),
  fitnessGoals: z.string().min(5, "Veuillez indiquer vos objectifs."),
});

type FormData = z.infer<typeof formSchema>;

export default function PersonalizedAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<PersonalizedFitnessAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityData: "3 séances de course à pied de 5km, 2 séances de musculation (haut du corps).",
      sleepData: "En moyenne 7h par nuit, mais sommeil parfois agité.",
      nutritionData: "J'essaie de manger équilibré, mais je craque souvent pour des sucreries le soir.",
      fitnessGoals: "Perdre 5kg et améliorer mon endurance.",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await personalizedFitnessAnalysis(data);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error getting analysis:", error);
      toast({
        variant: "destructive",
        title: "Erreur d'analyse",
        description: "Une erreur s'est produite lors de l'analyse de vos données.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sparkles className="text-accent" />
          Analyse Personnalisée par IA
        </CardTitle>
        <CardDescription className="text-white/70">
          Remplissez vos données pour recevoir des conseils sur mesure de votre coach IA.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fitnessGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vos objectifs fitness</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: Perdre 5kg, courir un 10km..." {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activityData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vos activités récentes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: 3 joggings, 2 séances de yoga..." {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sleepData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualité de votre sommeil</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: 7h par nuit, réveils fréquents..." {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="nutritionData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre alimentation récente</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: Repas équilibrés, quelques écarts sucrés..." {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/60"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-primary-foreground hover:bg-accent/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Obtenir mon analyse
                </>
              )}
            </Button>
          </form>
        </Form>
        {analysisResult && (
          <div className="mt-6 space-y-4 text-sm">
            <div className="p-4 bg-black/20 rounded-lg">
                <h3 className="font-bold mb-2 font-headline">💡 Idées Clés</h3>
                <p className="text-white/90">{analysisResult.insights}</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
                <h3 className="font-bold mb-2 font-headline">🎯 Recommandations</h3>
                <p className="text-white/90 whitespace-pre-wrap">{analysisResult.recommendations}</p>
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
}
