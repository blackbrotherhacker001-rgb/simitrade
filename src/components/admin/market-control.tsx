'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Zap } from 'lucide-react';
import { simulateMarketTrend } from '@/ai/flows/simulate-market-trend';

type Trend = 'bullish' | 'bearish' | 'sideways' | 'volatile';

export function MarketControl() {
  const [selectedTrend, setSelectedTrend] = useState<Trend>('sideways');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string>('The market is currently stable with minor fluctuations.');
  
  const handleTrendChange = async (trend: Trend) => {
    setSelectedTrend(trend);
    setLoading(true);
    setDescription('');
    try {
      const result = await simulateMarketTrend({ trend });
      setDescription(result.description);
    } catch (error) {
      console.error('Failed to simulate market trend:', error);
      setDescription(`Error generating description for ${trend} trend.`);
    } finally {
      setLoading(false);
    }
  };

  const trends: Trend[] = ['bullish', 'bearish', 'sideways', 'volatile'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Control</CardTitle>
        <CardDescription>
          Influence the live market trend for all users.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {trends.map(trend => (
            <Button
              key={trend}
              variant={selectedTrend === trend ? 'default' : 'outline'}
              onClick={() => handleTrendChange(trend)}
              className="capitalize"
            >
              {trend}
            </Button>
          ))}
        </div>
        
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            AI Generated Market Outlook
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </AlertTitle>
          <AlertDescription>
            {description || 'Generating new market outlook...'}
          </AlertDescription>
        </Alert>

        <Button disabled>
            Generate Next Tick
        </Button>
        <p className="text-xs text-muted-foreground">Note: Chart updates automatically every few seconds. Manual tick generation is disabled for this demo.</p>

      </CardContent>
    </Card>
  );
}
