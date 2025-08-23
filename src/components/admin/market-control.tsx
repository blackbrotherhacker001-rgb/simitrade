
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, TrendingDown, ArrowRightLeft, Zap, Settings, Save } from 'lucide-react';
import { simulateMarketTrend } from '@/ai/flows/simulate-market-trend';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

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
  const [activeTrend, setActiveTrend] = useState<Trend>('sideways');
  const [selectedTrend, setSelectedTrend] = useState<Trend>('sideways');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const storedTrend = localStorage.getItem(MARKET_TREND_STORAGE_KEY) as Trend;
    if (storedTrend && trendConfig[storedTrend]) {
      setActiveTrend(storedTrend);
      setSelectedTrend(storedTrend);
    }
  }, []);
  
  const handleSaveTrend = async () => {
    if (selectedTrend === activeTrend) {
        toast({
            title: "No Changes",
            description: "The selected trend is already active.",
        });
        return;
    }
    setLoading(true);
    try {
      localStorage.setItem(MARKET_TREND_STORAGE_KEY, selectedTrend);
      setActiveTrend(selectedTrend);
      await simulateMarketTrend({ trend: selectedTrend });
      toast({
        title: "Market Trend Updated",
        description: `The market trend is now set to ${selectedTrend}.`,
      });
    } catch (error) {
      console.error('Failed to simulate market trend:', error);
       toast({
        variant: "destructive",
        title: "Update Failed",
        description: `Could not update market trend.`,
      });
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
        <CardDescription>
            Select a market trend and click save to apply it across the simulation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {trends.map(trend => (
            <Card 
              key={trend} 
              className={cn(
                "p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2",
                selectedTrend === trend 
                  ? "border-primary ring-2 ring-primary/50 shadow-lg"
                  : "border-transparent hover:border-muted-foreground/50"
              )}
              onClick={() => setSelectedTrend(trend)}
            >
                {trendConfig[trend].icon}
                <p className="font-semibold mt-2">{trendConfig[trend].label}</p>
                <p className="text-xs text-muted-foreground">{trendConfig[trend].description}</p>
                {activeTrend === trend && <Badge className="mt-2" variant="outline">Active</Badge>}
            </Card>
          ))}
        </div>
      </CardContent>
       <CardFooter>
          <Button onClick={handleSaveTrend} disabled={loading || selectedTrend === activeTrend}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Trend
          </Button>
        </CardFooter>
    </Card>
  );
}
