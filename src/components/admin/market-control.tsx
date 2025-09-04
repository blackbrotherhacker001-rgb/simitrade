
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
import { Loader2, TrendingUp, TrendingDown, ArrowRightLeft, Zap, Settings, Save, Power, PowerOff } from 'lucide-react';
import { simulateMarketTrend } from '@/ai/flows/simulate-market-trend';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type Trend = 'bullish' | 'bearish' | 'sideways' | 'volatile';
type MarketMode = 'live' | 'manual';

interface TrendConfig {
    label: string;
    description: string;
    icon: React.ReactNode;
}

const trendConfig: Record<Trend, TrendConfig> = {
  bullish: {
    label: 'Bullish',
    description: 'Upward price movement',
    icon: <TrendingUp className="h-5 w-5 text-green-500" />
  },
  bearish: {
    label: 'Bearish',
    description: 'Downward price movement',
    icon: <TrendingDown className="h-5 w-5 text-red-500" />
  },
  sideways: {
    label: 'Sideways',
    description: 'Lateral price movement',
    icon: <ArrowRightLeft className="h-5 w-5 text-yellow-500" />
  },
  volatile: {
    label: 'Volatile',
    description: 'High price fluctuation',
    icon: <Zap className="h-5 w-5 text-purple-500" />
  },
};

const MARKET_TREND_STORAGE_KEY = 'market-trend';
const MARKET_MODE_STORAGE_KEY = 'market-mode';

export function MarketControl() {
  const [activeTrend, setActiveTrend] = useState<Trend>('sideways');
  const [selectedTrend, setSelectedTrend] = useState<Trend>('sideways');
  const [marketMode, setMarketMode] = useState<MarketMode>('live');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const storedTrend = localStorage.getItem(MARKET_TREND_STORAGE_KEY) as Trend;
    if (storedTrend && trendConfig[storedTrend]) {
      setActiveTrend(storedTrend);
      setSelectedTrend(storedTrend);
    }
    const storedMode = localStorage.getItem(MARKET_MODE_STORAGE_KEY) as MarketMode;
    if (storedMode) {
      setMarketMode(storedMode);
    }
  }, []);

  const handleModeChange = (mode: MarketMode) => {
    setMarketMode(mode);
    localStorage.setItem(MARKET_MODE_STORAGE_KEY, mode);
    toast({
        title: "Market Mode Updated",
        description: `Market is now in ${mode === 'live' ? 'Live Simulation' : 'Manual Trend'} mode.`
    });
  }
  
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
      // Switch to manual mode automatically when a trend is saved
      if (marketMode !== 'manual') {
        handleModeChange('manual');
      }
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
            Market Control
        </CardTitle>
        <CardDescription>
            Control the entire platform's market simulation. Choose between a live feed or manually set a specific trend.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h3 className="text-md font-medium mb-2">Market Mode</h3>
            <div className="grid grid-cols-2 gap-4">
                 <div onClick={() => handleModeChange('live')} className={cn("rounded-lg border-2 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors", marketMode === 'live' ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary/50')}>
                    <Power className="mb-2 h-6 w-6" />
                    <p className="font-semibold">Live Simulation</p>
                </div>
                 <div onClick={() => handleModeChange('manual')} className={cn("rounded-lg border-2 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors", marketMode === 'manual' ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary/50')}>
                    <PowerOff className="mb-2 h-6 w-6" />
                    <p className="font-semibold">Manual Trend</p>
                </div>
            </div>
        </div>

        <div className={cn(marketMode === 'live' && 'opacity-50 pointer-events-none')}>
            <h3 className="text-md font-medium mb-2">Manual Trend Control</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {trends.map(trend => (
                <div 
                key={trend} 
                className={cn(
                    "p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2 rounded-lg",
                    selectedTrend === trend 
                    ? "border-primary ring-2 ring-primary/50 shadow-lg bg-primary/10"
                    : "border-muted hover:border-primary/50"
                )}
                onClick={() => setSelectedTrend(trend)}
                >
                    {trendConfig[trend].icon}
                    <p className="font-semibold mt-2">{trendConfig[trend].label}</p>
                    <p className="text-xs text-muted-foreground">{trendConfig[trend].description}</p>
                    {activeTrend === trend && <Badge className="mt-2" variant="outline">Active</Badge>}
                </div>
            ))}
            </div>
        </div>
      </CardContent>
       <CardFooter>
          <Button onClick={handleSaveTrend} disabled={loading || selectedTrend === activeTrend || marketMode === 'live'}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Trend
          </Button>
        </CardFooter>
    </Card>
  );
}
