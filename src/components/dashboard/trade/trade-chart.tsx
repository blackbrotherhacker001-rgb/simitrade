
'use client';

import { useState, useEffect } from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { CandlestickChart, HardDrive, Repeat, Settings, Undo, Upload } from 'lucide-react';
import useMarketData from '@/hooks/use-market-data';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
};

export function TradeChart() {
  const [marketTrend, setMarketTrend] = useState<'bullish' | 'bearish' | 'sideways' | 'volatile'>('sideways');
  
  useEffect(() => {
    const storedTrend = localStorage.getItem('market-trend') as any;
    if (storedTrend) {
      setMarketTrend(storedTrend);
    }
    
    const handleStorageChange = () => {
        const newTrend = localStorage.getItem('market-trend') as any;
        if(newTrend) setMarketTrend(newTrend)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
        window.removeEventListener('storage', handleStorageChange)
    }
  }, []);

  const { data, currentPrice } = useMarketData(marketTrend);
  
  const yDomain = [
    Math.min(...data.map(d => d.price)) * 0.995,
    Math.max(...data.map(d => d.price)) * 1.005,
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getPriceColor = () => {
      if (data.length < 2) return "text-muted-foreground";
      const secondLastPrice = data[data.length - 2].price;
      if (currentPrice > secondLastPrice) return "text-green-500";
      if (currentPrice < secondLastPrice) return "text-red-500";
      return "text-muted-foreground";
  }

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between gap-4 p-2 border-b border-border">
            <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold">BTC/USDT</h2>
                <p className={`text-sm font-semibold ${getPriceColor()}`}>{formatPrice(currentPrice)}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <p><span className="text-muted-foreground">24h Change</span> -1.57%</p>
                <p><span className="text-muted-foreground">24h High</span> {formatPrice(69420.69)}</p>
                <p><span className="text-muted-foreground">24h Low</span> {formatPrice(67123.45)}</p>
                <p><span className="text-muted-foreground">24h Volume</span> 1.28B USDT</p>
            </div>
      </div>
       <div className="flex items-center justify-between gap-4 p-2 border-b border-border">
            <ToggleGroup type="single" defaultValue="1m" size="sm">
                <ToggleGroupItem value="1m" className="text-xs px-2 h-7">1m</ToggleGroupItem>
                <ToggleGroupItem value="5m" className="text-xs px-2 h-7">5m</ToggleGroupItem>
                <ToggleGroupItem value="15m" className="text-xs px-2 h-7">15m</ToggleGroupItem>
                <ToggleGroupItem value="1h" className="text-xs px-2 h-7">1h</ToggleGroupItem>
                <ToggleGroupItem value="1d" className="text-xs px-2 h-7">1d</ToggleGroupItem>
            </ToggleGroup>
            <div className="flex items-center gap-1">
                 <Button variant="ghost" size="sm" className="h-7 px-2">
                    <CandlestickChart className="h-4 w-4 mr-1" />
                    <span className="text-xs">Indicators</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Undo className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Repeat className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><HardDrive className="h-4 w-4"/></Button>
                 <Button variant="ghost" size="icon" className="h-7 w-7"><Settings className="h-4 w-4"/></Button>
            </div>
      </div>
      <div className="flex-grow relative">
        <ChartContainer config={chartConfig} className="w-full h-full absolute inset-0">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)"/>
            <XAxis dataKey="time" hide />
            <YAxis 
                domain={yDomain} 
                orientation="right"
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tickCount={8}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip
              content={<ChartTooltipContent indicator="dot" />}
              formatter={(value) => formatPrice(value as number)}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
