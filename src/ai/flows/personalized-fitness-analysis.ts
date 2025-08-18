'use server';

/**
 * @fileOverview An AI agent that analyzes user fitness data and provides personalized insights.
 *
 * - personalizedFitnessAnalysis - A function that triggers the fitness analysis flow.
 * - PersonalizedFitnessAnalysisInput - The input type for the personalizedFitnessAnalysis function.
 * - PersonalizedFitnessAnalysisOutput - The return type for the personalizedFitnessAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFitnessAnalysisInputSchema = z.object({
  activityData: z.string().describe('User activity data including steps, workouts, etc.'),
  sleepData: z.string().describe('User sleep data including duration, quality, etc.'),
  nutritionData: z.string().describe('User nutrition data including calorie intake, macros, etc.'),
  fitnessGoals: z.string().describe('User fitness goals such as weight loss, muscle gain, etc.'),
});
export type PersonalizedFitnessAnalysisInput = z.infer<typeof PersonalizedFitnessAnalysisInputSchema>;

const PersonalizedFitnessAnalysisOutputSchema = z.object({
  insights: z.string().describe('Personalized insights based on the analyzed data.'),
  recommendations: z.string().describe('Personalized recommendations for exercises and recipes.'),
});
export type PersonalizedFitnessAnalysisOutput = z.infer<typeof PersonalizedFitnessAnalysisOutputSchema>;

export async function personalizedFitnessAnalysis(input: PersonalizedFitnessAnalysisInput): Promise<PersonalizedFitnessAnalysisOutput> {
  return personalizedFitnessAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFitnessAnalysisPrompt',
  input: {schema: PersonalizedFitnessAnalysisInputSchema},
  output: {schema: PersonalizedFitnessAnalysisOutputSchema},
  prompt: `You are an AI fitness coach. Analyze the user's fitness data and provide personalized insights and recommendations.\n\nUser Fitness Goals: {{{fitnessGoals}}}\n\nActivity Data: {{{activityData}}}\n\nSleep Data: {{{sleepData}}}\n\nNutrition Data: {{{nutritionData}}}\n\nBased on this information, provide personalized insights and recommendations for exercises and recipes. Be concise and actionable. Give motivational pep talk to end the session.`, 
});

const personalizedFitnessAnalysisFlow = ai.defineFlow(
  {
    name: 'personalizedFitnessAnalysisFlow',
    inputSchema: PersonalizedFitnessAnalysisInputSchema,
    outputSchema: PersonalizedFitnessAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
