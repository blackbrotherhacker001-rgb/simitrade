
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  Area,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { Users, DollarSign, TrendingUp, TrendingDown, Activity, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const userGrowthData = [
  { month: 'Jan', users: 40 },
  { month: 'Feb', users: 30 },
  { month: 'Mar', users: 50 },
  { month: 'Apr', users: 48 },
  { month: 'May', users: 62 },
  { month: 'Jun', users: 80 },
];

const tradingVolumeData = [
  { month: 'Jan', volume: 400000 },
  { month: 'Feb', volume: 300000 },
  { month: 'Mar', volume: 500000 },
  { month: 'Apr', volume: 480000 },
  { month: 'May', volume: 680000 },
  { month: 'Jun', volume: 820000 },
];

const transactionTrendsData = [
  { month: 'Jan', transactions: 2500 },
  { month: 'Feb', transactions: 1500 },
  { month: 'Mar', transactions: 10000 },
  { month: 'Apr', transactions: 4000 },
  { month: 'May', transactions: 5000 },
  { month: 'Jun', transactions: 4500 },
];

const topAssetsData = [
  { symbol: 'BTC', price: 45281, change: 2.5, volume: 1250000 },
  { symbol: 'ETH', price: 2985, change: -1.2, volume: 850000 },
  { symbol: 'SOL', price: 152.4, change: 5.8, volume: 650000 },
  { symbol: 'DOGE', price: 0.23, change: 10.1, volume: 450000 },
];

const userDemographicsData = [
  { name: 'Active', value: 37, fill: 'hsl(var(--chart-2))' },
  { name: 'Suspended', value: 5, fill: 'hsl(var(--destructive))' },
  { name: 'New (24h)', value: 12, fill: 'hsl(var(--chart-1))' },
];

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> User Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-64 w-full">
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend
                verticalAlign="bottom"
                content={<ChartLegendContent />}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ r: 4, fill: 'hsl(var(--chart-2))' }}
                name="users"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" /> Trading Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-64 w-full">
            <BarChart data={tradingVolumeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={value => `$${value / 1000}k`}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
                formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value as number)}
              />
              <Legend
                verticalAlign="bottom"
                content={<ChartLegendContent />}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar dataKey="volume" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="volume" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" /> Transaction Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-64 w-full">
            <LineChart data={transactionTrendsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend
                verticalAlign="bottom"
                content={<ChartLegendContent />}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                name="transactions"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" /> Top Assets by Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead className="text-right">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAssetsData.map(asset => (
                <TableRow key={asset.symbol}>
                  <TableCell className="font-medium">{asset.symbol}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(asset.price)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      asset.change >= 0 ? 'text-green-500' : 'text-red-500'
                    )}
                  >
                    {asset.change >= 0 ? <TrendingUp className="inline-block mr-1 h-4 w-4" /> : <TrendingDown className="inline-block mr-1 h-4 w-4" />}
                    {asset.change}%
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0
                    }).format(asset.volume)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> User Demographics
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ChartContainer config={{}} className="h-48 w-full">
            <PieChart>
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={userDemographicsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {userDemographicsData.map(entry => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="w-full mt-4 space-y-2">
            {userDemographicsData.map(entry => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.fill }} />
                    <span className="text-muted-foreground">{entry.name}</span>
                  </div>
                  <span className="font-medium">{entry.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
