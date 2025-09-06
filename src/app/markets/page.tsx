
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
  Filter,
  ArrowUpDown,
  Zap,
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
    value: '14',
    icon: <TrendingUp className="h-6 w-6 text-green-400" />,
    iconBg: 'bg-green-400/10',
  },
  {
    title: '24h Losers',
    value: '35',
    icon: <TrendingDown className="h-6 w-6 text-red-400" />,
    iconBg: 'bg-red-400/10',
  },
  {
    title: 'Total Volume',
    value: '$3.71B',
    icon: <CircleDollarSign className="h-6 w-6 text-purple-400" />,
    iconBg: 'bg-purple-400/10',
  },
];

const assets = [
    {
        symbol: 'BTC',
        pair: 'BTC/USDT',
        price: 110817.01,
        change: -1.91,
        volume: 2000000000,
        cap: 110820000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg',
    },
    {
        symbol: 'ETH',
        pair: 'ETH/USDT',
        price: 5241.64,
        change: 1.03,
        volume: 850000000,
        cap: 52416000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg',
    },
    {
        symbol: 'SOL',
        pair: 'SOL/USDT',
        price: 203.06,
        change: -2.34,
        volume: 719440000,
        cap: 20306000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg',
    },
    {
        symbol: 'XRP',
        pair: 'XRP/USDT',
        price: 2.8624,
        change: -0.64,
        volume: 287240000,
        cap: 2860000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xrp.svg',
    },
    {
        symbol: 'TRX',
        pair: 'TRX/USDT',
        price: 0.3317,
        change: -1.83,
        volume: 114300000,
        cap: 331700000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/trx.svg',
    },
    {
        symbol: 'SUI',
        pair: 'SUI/USDT',
        price: 3.378,
        change: -0.52,
        volume: 106290000,
        cap: 3380000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sui.svg',
    },
    {
        symbol: 'ADA',
        pair: 'ADA/USDT',
        price: 0.8252,
        change: -0.59,
        volume: 98310000,
        cap: 825200000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/ada.svg',
    },
    {
        symbol: 'PEPE',
        pair: 'PEPE/USDT',
        price: 0.00000967,
        change: -0.41,
        volume: 79950000,
        cap: 9670000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/pepe.svg',
    },
    {
        symbol: 'OMNI',
        pair: 'OMNI/USDT',
        price: 3.30,
        change: 6.45,
        volume: 9030000,
        cap: 3300000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/omni.svg',
    },
    {
        symbol: 'TURBO',
        pair: 'TURBO/USDT',
        price: 0.003865,
        change: 1.05,
        volume: 6930000,
        cap: 3870000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/turbo.svg',
    },
    {
        symbol: 'DOGE',
        pair: 'DOGE/USDT',
        price: 0.1234,
        change: 5.12,
        volume: 450000000,
        cap: 12340000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/doge.svg',
    },
    {
        symbol: 'SHIB',
        pair: 'SHIB/USDT',
        price: 0.00001789,
        change: -2.15,
        volume: 230000000,
        cap: 10600000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/shib.svg',
    },
    {
        symbol: 'LINK',
        pair: 'LINK/USDT',
        price: 14.35,
        change: 3.21,
        volume: 180000000,
        cap: 8500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/link.svg',
    },
    {
        symbol: 'DOT',
        pair: 'DOT/USDT',
        price: 5.88,
        change: -1.50,
        volume: 150000000,
        cap: 7700000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/dot.svg',
    },
    {
        symbol: 'MATIC',
        pair: 'MATIC/USDT',
        price: 0.5712,
        change: 0.89,
        volume: 210000000,
        cap: 5700000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/matic.svg',
    },
    {
        symbol: 'AVAX',
        pair: 'AVAX/USDT',
        price: 36.55,
        change: 1.75,
        volume: 350000000,
        cap: 14000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/avax.svg',
    },
    {
        symbol: 'BCH',
        pair: 'BCH/USDT',
        price: 450.75,
        change: -3.45,
        volume: 400000000,
        cap: 9000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bch.svg',
    },
    {
        symbol: 'LTC',
        pair: 'LTC/USDT',
        price: 85.25,
        change: 0.55,
        volume: 300000000,
        cap: 6000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/ltc.svg',
    },
    {
        symbol: 'UNI',
        pair: 'UNI/USDT',
        price: 7.85,
        change: 2.10,
        volume: 120000000,
        cap: 4500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/uni.svg',
    },
    {
        symbol: 'ATOM',
        pair: 'ATOM/USDT',
        price: 8.75,
        change: -1.25,
        volume: 90000000,
        cap: 3000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/atom.svg',
    },
    {
        symbol: 'ETC',
        pair: 'ETC/USDT',
        price: 25.45,
        change: 3.15,
        volume: 150000000,
        cap: 3500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/etc.svg',
    },
    {
        symbol: 'XLM',
        pair: 'XLM/USDT',
        price: 0.115,
        change: -0.50,
        volume: 80000000,
        cap: 2500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xlm.svg',
    },
    {
        symbol: 'NEAR',
        pair: 'NEAR/USDT',
        price: 5.45,
        change: 4.25,
        volume: 200000000,
        cap: 5500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/near.svg',
    },
    {
        symbol: 'ALGO',
        pair: 'ALGO/USDT',
        price: 0.185,
        change: 1.50,
        volume: 60000000,
        cap: 1500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/algo.svg',
    },
    {
        symbol: 'VET',
        pair: 'VET/USDT',
        price: 0.035,
        change: -2.75,
        volume: 70000000,
        cap: 2000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/vet.svg',
    },
    {
        symbol: 'ICP',
        pair: 'ICP/USDT',
        price: 12.85,
        change: 5.50,
        volume: 180000000,
        cap: 3000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/icp.svg',
    },
    {
        symbol: 'FIL',
        pair: 'FIL/USDT',
        price: 5.85,
        change: -3.10,
        volume: 100000000,
        cap: 1200000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/fil.svg',
    },
    {
        symbol: 'HBAR',
        pair: 'HBAR/USDT',
        price: 0.078,
        change: 2.25,
        volume: 50000000,
        cap: 2800000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/hbar.svg',
    },
    {
        symbol: 'EGLD',
        pair: 'EGLD/USDT',
        price: 39.50,
        change: 0.80,
        volume: 40000000,
        cap: 1100000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/egld.svg',
    },
    {
        symbol: 'FTM',
        pair: 'FTM/USDT',
        price: 0.605,
        change: -1.90,
        volume: 90000000,
        cap: 1700000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/ftm.svg',
    },
    {
        symbol: 'THETA',
        pair: 'THETA/USDT',
        price: 1.25,
        change: 4.15,
        volume: 60000000,
        cap: 1250000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/theta.svg',
    },
    {
        symbol: 'MANA',
        pair: 'MANA/USDT',
        price: 0.45,
        change: -0.85,
        volume: 50000000,
        cap: 850000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/mana.svg',
    },
    {
        symbol: 'SAND',
        pair: 'SAND/USDT',
        price: 0.44,
        change: 1.10,
        volume: 70000000,
        cap: 980000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sand.svg',
    },
    {
        symbol: 'APE',
        pair: 'APE/USDT',
        price: 1.35,
        change: -2.50,
        volume: 45000000,
        cap: 500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/ape.svg',
    },
    {
        symbol: 'AXS',
        pair: 'AXS/USDT',
        price: 7.80,
        change: 3.30,
        volume: 65000000,
        cap: 1100000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/axs.svg',
    },
    {
        symbol: 'XMR',
        pair: 'XMR/USDT',
        price: 165.50,
        change: 0.90,
        volume: 35000000,
        cap: 3000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xmr.svg',
    },
    {
        symbol: 'ZEC',
        pair: 'ZEC/USDT',
        price: 28.75,
        change: -1.80,
        volume: 25000000,
        cap: 450000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/zec.svg',
    },
    {
        symbol: 'DASH',
        pair: 'DASH/USDT',
        price: 29.80,
        change: 2.40,
        volume: 30000000,
        cap: 350000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/dash.svg',
    },
    {
        symbol: 'MKR',
        pair: 'MKR/USDT',
        price: 2350.00,
        change: -4.50,
        volume: 80000000,
        cap: 2100000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/mkr.svg',
    },
    {
        symbol: 'AAVE',
        pair: 'AAVE/USDT',
        price: 91.50,
        change: 6.80,
        volume: 95000000,
        cap: 1300000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/aave.svg',
    },
    {
        symbol: 'COMP',
        pair: 'COMP/USDT',
        price: 59.20,
        change: -2.20,
        volume: 40000000,
        cap: 400000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/comp.svg',
    },
    {
        symbol: 'SNX',
        pair: 'SNX/USDT',
        price: 2.60,
        change: 1.90,
        volume: 35000000,
        cap: 850000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/snx.svg',
    },
    {
        symbol: 'YFI',
        pair: 'YFI/USDT',
        price: 7950.00,
        change: 3.50,
        volume: 55000000,
        cap: 290000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/yfi.svg',
    },
    {
        symbol: 'CRV',
        pair: 'CRV/USDT',
        price: 0.35,
        change: -5.50,
        volume: 60000000,
        cap: 400000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/crv.svg',
    },
    {
        symbol: 'BAL',
        pair: 'BAL/USDT',
        price: 3.80,
        change: 2.80,
        volume: 15000000,
        cap: 200000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bal.svg',
    },
    {
        symbol: 'SUSHI',
        pair: 'SUSHI/USDT',
        price: 0.95,
        change: -3.30,
        volume: 45000000,
        cap: 250000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sushi.svg',
    },
    {
        symbol: '1INCH',
        pair: '1INCH/USDT',
        price: 0.45,
        change: 4.50,
        volume: 40000000,
        cap: 500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/1inch.svg',
    },
    {
        symbol: 'CAKE',
        pair: 'CAKE/USDT',
        price: 2.75,
        change: 1.20,
        volume: 30000000,
        cap: 750000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/cake.svg',
    },
    {
        symbol: 'BNB',
        pair: 'BNB/USDT',
        price: 595.00,
        change: -0.80,
        volume: 1500000000,
        cap: 88000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bnb.svg',
    },
    {
        symbol: 'CRO',
        pair: 'CRO/USDT',
        price: 0.095,
        change: 0.50,
        volume: 25000000,
        cap: 2500000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/cro.svg',
    }
];

const formatCurrency = (value: number, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

const formatMarketCap = (value: number) => {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
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
                <TableRow key={asset.symbol} className="transition-colors hover:bg-muted/50">
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
                  <TableCell className="font-medium">{formatCurrency(asset.price, asset.price > 1 ? 2 : 8)}</TableCell>
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
                       {asset.change >= 0 ? '▲' : '▼'} {asset.change.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{formatMarketCap(asset.volume)}</TableCell>
                  <TableCell>{formatMarketCap(asset.cap)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" asChild>
                      <Link href="/trade">
                        <Zap className="mr-2 h-4 w-4" />
                        Trade
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
