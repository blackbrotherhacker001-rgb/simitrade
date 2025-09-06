
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ReferenceLine,
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

  const { data, currentPrice, ohlc } = useMarketData(marketTrend);
  
   const yDomain = useMemo(() => [
    Math.min(...data.map(d => d.price)) * 0.995,
    Math.max(...data.map(d => d.price)) * 1.005,
  ], [data]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };
  
   const priceChange = useMemo(() => {
    if (data.length < 2) return { value: 0, percentage: 0 };
    const initialPrice = data[0].price;
    const changeValue = currentPrice - initialPrice;
    const changePercentage = (changeValue / initialPrice) * 100;
    return { value: changeValue, percentage: changePercentage };
   }, [data, currentPrice]);

  const getPriceColor = (value: number) => {
      if (value > 0) return "text-green-500";
      if (value < 0) return "text-red-500";
      return "text-muted-foreground";
  }

  const generateCandlestickData = (marketData: typeof data) => {
    if (marketData.length === 0) return [];

    return marketData.map((d, i) => {
        const open = i === 0 ? d.price : marketData[i - 1].price;
        const close = d.price;
        const high = Math.max(open, close) * (1 + Math.random() * 0.0005);
        const low = Math.min(open, close) * (1 - Math.random() * 0.0005);
        return {
            time: d.time,
            uv: [open, high, low, close]
        };
    });
};

  const candlestickData = useMemo(() => generateCandlestickData(data), [data]);

  return (
    <div className="h-full flex flex-col bg-[#161A25]">
       <div className="flex items-center justify-between gap-4 p-2 border-b border-border">
            <div className="flex items-center gap-4">
                 <ToggleGroup type="single" defaultValue="1h" size="sm">
                    <ToggleGroupItem value="1m" className="text-xs px-2 h-7 border-none text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-transparent">1m</ToggleGroupItem>
                    <ToggleGroupItem value="5m" className="text-xs px-2 h-7 border-none text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-transparent">5m</ToggleGroupItem>
                    <ToggleGroupItem value="15m" className="text-xs px-2 h-7 border-none text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-transparent">15m</ToggleGroupItem>
                    <ToggleGroupItem value="1h" className="text-xs px-2 h-7 border-none text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-transparent">1h</ToggleGroupItem>
                    <ToggleGroupItem value="1d" className="text-xs px-2 h-7 border-none text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-transparent">1d</ToggleGroupItem>
                </ToggleGroup>
                 <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground hover:text-foreground">
                    <CandlestickChart className="h-4 w-4 mr-1" />
                    <span className="text-xs">Indicators</span>
                </Button>
            </div>
            <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Undo className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Repeat className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><HardDrive className="h-4 w-4"/></Button>
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Settings className="h-4 w-4"/></Button>
            </div>
      </div>
      <div className="flex items-center gap-4 p-2 border-b border-border">
          <h2 className="text-sm font-semibold">BTC/USDT · 1h · Bicrypto</h2>
           <div className="flex items-center gap-4 text-xs text-muted-foreground">
               <p>O<span className={getPriceColor(ohlc.open - ohlc.close)}>{ohlc.open.toFixed(2)}</span></p>
               <p>H<span className={getPriceColor(ohlc.high - ohlc.close)}>{ohlc.high.toFixed(2)}</span></p>
               <p>L<span className={getPriceColor(ohlc.low - ohlc.close)}>{ohlc.low.toFixed(2)}</span></p>
               <p>C<span className={getPriceColor(ohlc.close - ohlc.open)}>{ohlc.close.toFixed(2)}</span></p>
               <p className={getPriceColor(priceChange.value)}>
                   {priceChange.value.toFixed(2)} ({priceChange.percentage.toFixed(2)}%)
               </p>
           </div>
      </div>
      <div className="flex-grow relative">
        <ChartContainer config={chartConfig} className="w-full h-full absolute inset-0">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.2)"/>
            <XAxis dataKey="time" hide />
            <YAxis 
                domain={yDomain} 
                orientation="right"
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tickCount={8}
                axisLine={false}
                tickLine={false}
                className="text-xs"
            />
            <Tooltip
              content={<ChartTooltipContent indicator="dot" />}
              formatter={(value) => formatPrice(value as number)}
            />
            {candlestickData.map((d, i) => (
                <ReferenceLine 
                    key={`wick-${i}`}
                    x={d.time} 
                    segment={[
                        { y: d.uv[1] }, 
                        { y: d.uv[2] }
                    ]} 
                    stroke={d.uv[0] > d.uv[3] ? "hsl(var(--destructive))" : "hsl(var(--chart-2))"}
                    strokeWidth={1}
                />
            ))}
             {candlestickData.map((d, i) => (
                <ReferenceLine 
                    key={`candle-${i}`}
                    x={d.time} 
                    segment={[
                        { y: d.uv[0] }, 
                        { y: d.uv[3] }
                    ]} 
                    stroke={d.uv[0] > d.uv[3] ? "hsl(var(--destructive))" : "hsl(var(--chart-2))"}
                    strokeWidth={5}
                />
            ))}
             <Area type="monotone" dataKey="price" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} isAnimationActive={false} />
          </ComposedChart>
        </ChartContainer>
      </div>
    </div>
  );
}
