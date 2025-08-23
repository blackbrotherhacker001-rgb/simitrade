'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import useMarketData from '@/hooks/use-market-data';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--primary))',
  },
};

export function TradeChart() {
  const { data, currentPrice } = useMarketData('bullish');

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>BTC/USD</CardTitle>
                <CardDescription>Bitcoin Price Chart</CardDescription>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold text-primary">{currentPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Live Price</p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(-5)}
            />
             <YAxis
              domain={['dataMin - 100', 'dataMax + 100']}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="price"
              fill="var(--color-price)"
              radius={4}
              barSize={15}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
