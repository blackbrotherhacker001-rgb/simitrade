
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutGrid,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Search,
  ArrowRight,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const marketStats = [
  {
    title: 'Total Markets',
    value: '50',
    icon: <LayoutGrid className="h-6 w-6 text-blue-400" />,
    iconBg: 'bg-blue-400/10',
  },
  {
    title: '24h Gainers',
    value: '38',
    icon: <TrendingUp className="h-6 w-6 text-green-400" />,
    iconBg: 'bg-green-400/10',
  },
  {
    title: '24h Losers',
    value: '12',
    icon: <TrendingDown className="h-6 w-6 text-red-400" />,
    iconBg: 'bg-red-400/10',
  },
  {
    title: 'Total Volume',
    value: '$4.11B',
    icon: <CircleDollarSign className="h-6 w-6 text-purple-400" />,
    iconBg: 'bg-purple-400/10',
  },
];

const assets = [
  {
    symbol: 'BTC',
    pair: 'BTC/USDT',
    price: 111021.01,
    change: -0.12,
    volume: 2320000000,
    cap: 111020000000,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg',
  },
  {
    symbol: 'SOL',
    pair: 'SOL/USDT',
    price: 204.07,
    change: 0.58,
    volume: 808930000,
    cap: 204070000,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg',
  },
  {
    symbol: 'XRP',
    pair: 'XRP/USDT',
    price: 2.8221,
    change: 0.79,
    volume: 324830000,
    cap: 2820000,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xrp.svg',
  },
  {
    symbol: 'TRX',
    pair: 'TRX/USDT',
    price: 0.3317,
    change: -1.04,
    volume: 122290000,
    cap: 331700,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/trx.svg',
  },
   {
    symbol: 'SUI',
    pair: 'SUI/USDT',
    price: 3.404,
    change: 2.64,
    volume: 112050000,
    cap: 3400000,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sui.svg',
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const formatMarketCap = (value: number) => {
  if (value >= 1e9) return `${formatCurrency(value / 1e9)}B`;
  if (value >= 1e6) return `${formatCurrency(value / 1e6)}M`;
  if (value >= 1e3) return `${formatCurrency(value / 1e3)}K`;
  return formatCurrency(value);
};

export default function MarketsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Explore All <span className="text-primary">Crypto Markets</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Real-time prices, 24h changes, and trading volumes for all available cryptocurrency pairs. Start trading with professional-grade tools and deep liquidity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {marketStats.map((stat) => (
          <Card key={stat.title} className="bg-card/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn('p-3 rounded-full', stat.iconBg)}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search markets (e.g., BTC, ETH)..." className="pl-10 h-12" />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12">
                <Filter className="mr-2 h-4 w-4" />
                All Markets
            </Button>
             <Button variant="outline" className="h-12">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Volume
            </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead>24h Volume</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.symbol}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={asset.icon}
                        alt={asset.symbol}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{asset.symbol}</p>
                        <p className="text-xs text-muted-foreground">{asset.pair}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatCurrency(asset.price)}</TableCell>
                  <TableCell>
                     <Badge
                      variant="outline"
                      className={cn(
                        'font-semibold',
                        asset.change >= 0
                          ? 'text-green-400 border-green-400/50 bg-green-400/10'
                          : 'text-red-400 border-red-400/50 bg-red-400/10'
                      )}
                    >
                      {asset.change >= 0 ? '↗' : '↘'} {asset.change.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{formatMarketCap(asset.volume)}</TableCell>
                  <TableCell>{formatMarketCap(asset.cap)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" asChild>
                      <Link href="/dashboard/trade">
                        Trade <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
