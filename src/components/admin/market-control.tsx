
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, TrendingDown, ArrowRightLeft, Zap, Settings } from 'lucide-react';
import { simulateMarketTrend } from '@/ai/flows/simulate-market-trend';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type Trend = 'bullish' | 'bearish' | 'sideways' | 'volatile';

interface TrendConfig {
    label: string;
    description: string;
    icon: React.ReactNode;
}

const trendConfig: Record<Trend, TrendConfig> = {
  bullish: {
    label: 'Bullish',
    description: 'Upward price movement',
    icon: <TrendingUp className="h-6 w-6 text-green-500" />
  },
  bearish: {
    label: 'Bearish',
    description: 'Downward price movement',
    icon: <TrendingDown className="h-6 w-6 text-red-500" />
  },
  sideways: {
    label: 'Sideways',
    description: 'Lateral price movement',
    icon: <ArrowRightLeft className="h-6 w-6 text-yellow-500" />
  },
  volatile: {
    label: 'Volatile',
    description: 'High price fluctuation',
    icon: <Zap className="h-6 w-6 text-purple-500" />
  },
};

const MARKET_TREND_STORAGE_KEY = 'market-trend';

export function MarketControl() {
  const [selectedTrend, setSelectedTrend] = useState<Trend>('sideways');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string>('The market is currently stable with minor fluctuations.');
  
  useEffect(() => {
    const storedTrend = localStorage.getItem(MARKET_TREND_STORAGE_KEY) as Trend;
    if (storedTrend && trendConfig[storedTrend]) {
      handleTrendChange(storedTrend, true);
    }
  }, []);
  
  const handleTrendChange = async (trend: Trend, isInitialLoad = false) => {
    setSelectedTrend(trend);
    if (!isInitialLoad) {
      localStorage.setItem(MARKET_TREND_STORAGE_KEY, trend);
    }
    
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
        <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5"/>
            Market Trend Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {trends.map(trend => (
            <Card 
              key={trend} 
              className={cn(
                "p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
                selectedTrend === trend 
                  ? "border-primary ring-2 ring-primary shadow-lg"
                  : "border-border hover:border-muted-foreground/50"
              )}
              onClick={() => handleTrendChange(trend)}
            >
                {trendConfig[trend].icon}
                <p className="font-semibold mt-2">{trendConfig[trend].label}</p>
                <p className="text-xs text-muted-foreground">{trendConfig[trend].description}</p>
                {selectedTrend === trend && <Badge className="mt-2">Active</Badge>}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
