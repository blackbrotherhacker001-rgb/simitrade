'use server';

/**
 * @fileOverview AI tool to simulate different market trends (bullish, bearish, sideways, volatile).
 *
 * - simulateMarketTrend - A function that simulates market trends.
 * - SimulateMarketTrendInput - The input type for the simulateMarketTrend function.
 * - SimulateMarketTrendOutput - The return type for the simulateMarketTrend function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateMarketTrendInputSchema = z.object({
  trend: z
    .enum(['bullish', 'bearish', 'sideways', 'volatile'])
    .describe('The type of market trend to simulate.'),
});

export type SimulateMarketTrendInput = z.infer<typeof SimulateMarketTrendInputSchema>;

const SimulateMarketTrendOutputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the simulated market trend.'),
});

export type SimulateMarketTrendOutput = z.infer<typeof SimulateMarketTrendOutputSchema>;

export async function simulateMarketTrend(input: SimulateMarketTrendInput): Promise<SimulateMarketTrendOutput> {
  return simulateMarketTrendFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateMarketTrendPrompt',
  input: {schema: SimulateMarketTrendInputSchema},
  output: {schema: SimulateMarketTrendOutputSchema},
  prompt: `You are an expert financial analyst. Based on the desired market trend, generate a detailed description of how the market will behave.

Market Trend: {{{trend}}}

Description:`,
});

const simulateMarketTrendFlow = ai.defineFlow(
  {
    name: 'simulateMarketTrendFlow',
    inputSchema: SimulateMarketTrendInputSchema,
    outputSchema: SimulateMarketTrendOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
