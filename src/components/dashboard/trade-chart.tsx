
'use client';

import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import useMarketData from '@/hooks/use-market-data';
import { Badge } from '../ui/badge';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--primary))',
  },
};

type MarketTrend = 'bullish' | 'bearish' | 'sideways' | 'volatile';
const MARKET_TREND_STORAGE_KEY = 'market-trend';

export function TradeChart() {
  const [trend, setTrend] = useState<MarketTrend>('sideways');
  
  useEffect(() => {
    const storedTrend = localStorage.getItem(MARKET_TREND_STORAGE_KEY) as MarketTrend;
    if (storedTrend) {
      setTrend(storedTrend);
    }

    const handleStorageChange = () => {
      const newTrend = localStorage.getItem(MARKET_TREND_STORAGE_KEY) as MarketTrend;
       if (newTrend) {
        setTrend(newTrend);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const { data, currentPrice } = useMarketData(trend);

  const priceHistory = data.map(d => d.price);
  const high24h = Math.max(...priceHistory);
  const low24h = Math.min(...priceHistory);
  const openPrice = priceHistory[0];
  const change = currentPrice - openPrice;
  const changePercent = (change / openPrice) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">BTC/USD</h2>
            <Badge variant={change >= 0 ? 'default' : 'destructive'} className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3"/>
              {changePercent.toFixed(2)}%
            </Badge>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">${currentPrice.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              {change.toFixed(2)} (24h)
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-right">
                <p>24h High</p>
                <p className="font-semibold text-foreground">${high24h.toFixed(2)}</p>
            </div>
            <div className="text-center md:text-right">
                <p>24h Low</p>
                <p className="font-semibold text-foreground">${low24h.toFixed(2)}</p>
            </div>
             <div className="text-center md:text-right">
                <p>24h Volume</p>
                <p className="font-semibold text-foreground">1,234.56 BTC</p>
            </div>
        </div>
      </CardHeader>
      <CardContent className="h-96 w-full p-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <AreaChart accessibilityLayer data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
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
                <Area
                dataKey="price"
                type="natural"
                fill="url(#colorPrice)"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                />
            </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
