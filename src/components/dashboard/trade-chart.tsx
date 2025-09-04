
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Line, LineChart } from 'recharts';
import useMarketData from '@/hooks/use-market-data';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TrendingUp, Plus, Settings2, Undo2, Redo2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--primary))',
  },
};

type MarketTrend = 'bullish' | 'bearish' | 'sideways' | 'volatile';
type MarketMode = 'live' | 'manual';
const MARKET_TREND_STORAGE_KEY = 'market-trend';
const MARKET_MODE_STORAGE_KEY = 'market-mode';

export function TradeChart() {
  const [trend, setTrend] = useState<MarketTrend>('sideways');
  const [mode, setMode] = useState<MarketMode>('live');
  
  useEffect(() => {
    // Function to update state from localStorage
    const updateMarketState = () => {
      const storedMode = localStorage.getItem(MARKET_MODE_STORAGE_KEY) as MarketMode;
      setMode(storedMode || 'live');

      if (storedMode === 'manual') {
        const storedTrend = localStorage.getItem(MARKET_TREND_STORAGE_KEY) as MarketTrend;
        setTrend(storedTrend || 'sideways');
      } else {
        // In 'live' mode, we can use a default like 'sideways'
        setTrend('sideways');
      }
    };

    // Initial update
    updateMarketState();

    // Listen for storage changes to update in real-time
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === MARKET_TREND_STORAGE_KEY || event.key === MARKET_MODE_STORAGE_KEY) {
        updateMarketState();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const { data, currentPrice } = useMarketData(mode === 'live' ? 'sideways' : trend);

  const priceHistory = data.map(d => d.price);
  const openPrice = priceHistory[0];
  const change = currentPrice - openPrice;
  const changePercent = (change / openPrice) * 100;

  const { toast } = useToast();

  const handleBuy = () => {
    toast({
      title: 'Order Placed',
      description: `Bought BTC at $${currentPrice.toFixed(2)}`,
    });
  }

  return (
    <div className="h-full flex flex-col">
       <CardHeader className="flex flex-row items-center justify-between gap-4 py-2 border-b border-border">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg" alt="BTC" className="h-6 w-6" />
                <h2 className="text-md font-bold">BTC/USDT</h2>
            </div>
            <div>
                <p className="text-md font-bold text-green-500">${currentPrice.toFixed(2)}</p>
            </div>
             <Badge variant={change >= 0 ? 'default' : 'destructive'} className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3"/>
              {changePercent.toFixed(2)}%
            </Badge>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <div className="flex-grow relative">
        <ChartContainer config={chartConfig} className="w-full h-full absolute inset-0">
            <LineChart accessibilityLayer data={data} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(-5)}
                hide
                />
                <YAxis
                domain={['dataMin - 100', 'dataMax + 100']}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                orientation="right"
                tickFormatter={(value: number) => `$${value.toFixed(0)}`}
                />
                <Tooltip
                cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }}
                content={<ChartTooltipContent indicator="dot" />}
                />
                <Line
                    dataKey="price"
                    type="monotone"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    name="Price"
                />
                 <ReferenceLine y={currentPrice} stroke="hsl(var(--primary))" strokeDasharray="3 3" />
            </LineChart>
        </ChartContainer>
      </div>
      <CardFooter className="py-2 border-t border-border flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Button variant="ghost" size="sm" className="text-xs">Trading History</Button>
            </div>
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <p>%</p>
                <p>log</p>
                <p>auto</p>
            </div>
      </CardFooter>
    </div>
  );
}
