
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
  insights: z.string().describe('Personalized insights based on the analyzed data. Be concise and motivational.'),
  recommendations: z.string().describe('Actionable, personalized recommendations for exercises, recipes, or wellness practices. Use bullet points for clarity.'),
});
export type PersonalizedFitnessAnalysisOutput = z.infer<typeof PersonalizedFitnessAnalysisOutputSchema>;

export async function personalizedFitnessAnalysis(input: PersonalizedFitnessAnalysisInput): Promise<PersonalizedFitnessAnalysisOutput> {
  return personalizedFitnessAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFitnessAnalysisPrompt',
  input: {schema: PersonalizedFitnessAnalysisInputSchema},
  output: {schema: PersonalizedFitnessAnalysisOutputSchema},
  prompt: `You are an AI fitness coach named YourCoach. Your tone is encouraging, positive, and professional. Analyze the user's fitness data and provide personalized insights and recommendations.

User Fitness Goals: {{{fitnessGoals}}}
Activity Data: {{{activityData}}}
Sleep Data: {{{sleepData}}}
Nutrition Data: {{{nutritionData}}}

Based on this information, provide:
1.  **Insights**: A short, insightful summary of their current situation. Highlight a key strength and an area for improvement in a motivational way.
2.  **Recommendations**: A list of 2-3 clear, simple, and actionable recommendations. These can be specific exercises, meal suggestions, or wellness tips. Format this as a bulleted or numbered list.

End with a short, powerful motivational sentence.`, 
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
