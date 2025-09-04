
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CandlestickChart, HardDrive, LineChart, MessageSquare, Repeat, Settings, Undo, Upload } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, Pie, PieChart, ReferenceLine, Tooltip, XAxis, YAxis, ComposedChart, Area, Candlestick } from 'recharts';
import { useMemo } from 'react';

const generateCandlestickData = () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    const data = [];
    let lastClose = 110000;

    for (let i = 0; i < 50; i++) {
        const open = lastClose + (Math.random() - 0.5) * 500;
        const close = open + (Math.random() - 0.5) * 800;
        const high = Math.max(open, close) + Math.random() * 300;
        const low = Math.min(open, close) - Math.random() * 300;
        
        data.push({
            x: new Date(date.getTime() + i * 60 * 60 * 1000).getTime(),
            y: [open, high, low, close].map(p => p.toFixed(2))
        });
        lastClose = close;
    }
    return data;
};

export function SpotTradeChart() {
    const data = useMemo(() => generateCandlestickData(), []);
  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between gap-4 p-2 border-b border-border">
            <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold">BTC/USDT</h2>
                <p className="text-sm font-semibold text-red-500">-1.57%</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <p><span className="text-green-500">O</span> 109800.00</p>
                <p><span className="text-green-500">H</span> 110409.46</p>
                <p><span className="text-green-500">L</span> 109755.59</p>
                <p><span className="text-green-500">C</span> 110370.70</p>
                <p><span className="text-green-500">Vol</span> 1246.1M</p>
            </div>
      </div>
      <div className="flex items-center justify-between gap-4 p-2 border-b border-border">
            <ToggleGroup type="single" defaultValue="1h" size="sm">
                <ToggleGroupItem value="1h" className="text-xs px-2 h-7">1h</ToggleGroupItem>
                <ToggleGroupItem value="4h" className="text-xs px-2 h-7">4h</ToggleGroupItem>
                <ToggleGroupItem value="1d" className="text-xs px-2 h-7">1d</ToggleGroupItem>
                <ToggleGroupItem value="1w" className="text-xs px-2 h-7">1w</ToggleGroupItem>
            </ToggleGroup>
            <div className="flex items-center gap-1">
                 <Button variant="ghost" size="sm" className="h-7 px-2">
                    <CandlestickChart className="h-4 w-4 mr-1" />
                    <span className="text-xs">Indicators</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Undo className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Repeat className="h-4 w-4"/></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><HardDrive className="h-4 w-4"/></Button>
            </div>
      </div>
      <div className="flex-grow relative">
        <ChartContainer config={{}} className="w-full h-full absolute inset-0">
             <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis dataKey="x" scale="band" hide/>
                <YAxis orientation="right" domain={['auto', 'auto']} />
                <Tooltip />
                <Candlestick dataKey="y" fill="rgb(34,139,34)" stroke="rgb(139,0,0)" isAnimationActive={false} />
            </ComposedChart>
        </ChartContainer>
      </div>
       <div className="py-2 border-t border-border flex justify-between items-center px-4 text-xs">
            <ToggleGroup type="single" defaultValue="5y" size="sm">
                <ToggleGroupItem value="5y" className="text-xs px-2 h-6">5y</ToggleGroupItem>
                <ToggleGroupItem value="1y" className="text-xs px-2 h-6">1y</ToggleGroupItem>
                <ToggleGroupItem value="3m" className="text-xs px-2 h-6">3m</ToggleGroupItem>
                <ToggleGroupItem value="1m" className="text-xs px-2 h-6">1m</ToggleGroupItem>
                <ToggleGroupItem value="5d" className="text-xs px-2 h-6">5d</ToggleGroupItem>
                <ToggleGroupItem value="1d" className="text-xs px-2 h-6">1d</ToggleGroupItem>
            </ToggleGroup>
             <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <p>20:28:33 (UTC)</p>
                <p>%</p>
                <p>log</p>
                <p>auto</p>
            </div>
      </div>
    </div>
  );
}

