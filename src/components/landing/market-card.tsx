
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

const assets = [
  {
    symbol: 'BTC',
    pair: 'BTC/USDT',
    price: 109848.96,
    cap: 109850000000,
    change: -2.33,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg',
  },
  {
    symbol: 'SOL',
    pair: 'SOL/USDT',
    price: 204.44,
    cap: 204440000,
    change: -3.14,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg',
  },
  {
    symbol: 'XRP',
    pair: 'XRP/USDT',
    price: 2.82,
    cap: 2820000,
    change: -1.6,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xrp.svg',
  },
  {
    symbol: 'TRX',
    pair: 'TRX/USDT',
    price: 0.3348,
    cap: 334800,
    change: -1.9,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/trx.svg',
  },
  {
    symbol: 'ADA',
    pair: 'ADA/USDT',
    price: 0.8094,
    cap: 809400,
    change: -3.73,
    icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/ada.svg',
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

export function MarketCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border-border/20 shadow-2xl shadow-primary/10">
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b-border/30 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Asset</TableHead>
              <TableHead className="text-muted-foreground">
                Price / Cap
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                24h
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.symbol} className="border-b-0">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={asset.icon}
                      alt={asset.symbol}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{asset.symbol}</p>
                      <p className="text-xs text-muted-foreground">
                        {asset.pair}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-semibold">
                    {formatCurrency(asset.price)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatMarketCap(asset.cap)}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={cn(
                      asset.change >= 0
                        ? 'text-green-400 border-green-400/50 bg-green-400/10'
                        : 'text-red-400 border-red-400/50 bg-red-400/10'
                    )}
                  >
                    {asset.change >= 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {asset.change}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         <Button variant="link" className="w-full mt-4 text-primary" asChild>
            <Link href="/markets">
                View All Markets <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
