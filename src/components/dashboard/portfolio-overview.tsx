
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const portfolioData = [
  { name: 'Bitcoin', value: 400, fill: 'var(--color-btc)' },
  { name: 'Ethereum', value: 300, fill: 'var(--color-eth)' },
  { name: 'Solana', value: 200, fill: 'var(--color-sol)' },
  { name: 'USDC', value: 100, fill: 'var(--color-usdc)' },
];

const chartConfig = {
  value: {
    label: 'Value',
  },
  btc: {
    label: 'Bitcoin',
    color: 'hsl(var(--chart-1))',
  },
  eth: {
    label: 'Ethereum',
    color: 'hsl(var(--chart-2))',
  },
  sol: {
    label: 'Solana',
    color: 'hsl(var(--chart-3))',
  },
  usdc: {
    label: 'USDC',
    color: 'hsl(var(--chart-4))',
  },
};

export function PortfolioOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Portfolio</CardTitle>
        <CardDescription>Your asset allocation</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-48"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={portfolioData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              strokeWidth={2}
            >
              {portfolioData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[--color-btc]" />
            Bitcoin
          </div>
          <span>40%</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[--color-eth]" />
            Ethereum
          </div>
          <span>30%</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[--color-sol]" />
            Solana
          </div>
          <span>20%</span>
        </div>
         <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[--color-usdc]" />
            USDC
          </div>
          <span>10%</span>
        </div>
      </CardFooter>
    </Card>
  );
}
