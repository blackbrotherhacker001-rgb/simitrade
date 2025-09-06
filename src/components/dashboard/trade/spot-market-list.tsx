
'use client';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const markets = [
  { symbol: 'ACH/USDT', change: 0.47, price: '0.01933', vol: '1.5M' },
  { symbol: 'ACM/USDT', change: 1.87, price: '0.928', vol: '854.8k' },
  { symbol: 'ADA/USDT', change: 1.19, price: '0.8282', vol: '104.5M' },
  { symbol: 'BTC/USDT', change: -14.08, price: '110855.99', vol: '2.3B' },
  { symbol: 'KAVA/USDT', change: -0.22, price: '0.3693', vol: '2.1M' },
  { symbol: 'KSM/USDT', change: 2.13, price: '15.33', vol: '1.2M' },
  { symbol: 'LDO/USDT', change: -0.68, price: '1.173', vol: '20.3M' },
  { symbol: 'LISTA/USDT', change: -0.60, price: '0.2438', vol: '1.5M' },
  { symbol: 'LPT/USDT', change: 2.80, price: '6.905', vol: '4.8M' },
  { symbol: 'LSK/USDT', change: -0.83, price: '0.360', vol: '371.8k' },
  { symbol: 'LTC/USDT', change: -0.03, price: '111.65', vol: '39.4M' },
  { symbol: 'MANA/USDT', change: 3.33, price: '0.3133', vol: '8.7M' },
];


export function SpotMarketList() {
  return (
    <div className="w-80 flex-shrink-0 bg-[#111318] flex flex-col">
       <Tabs defaultValue="spot">
         <TabsList className="bg-transparent px-4 justify-start rounded-none">
            <TabsTrigger value="watchlist" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"><Star className="h-4 w-4 mr-2"/>Watchlist</TabsTrigger>
            <TabsTrigger value="spot" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Spot</TabsTrigger>
            <TabsTrigger value="futures" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Futures</TabsTrigger>
        </TabsList>

        <div className="p-2">
            <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search markets..." className="pl-8 bg-transparent" />
            </div>
        </div>

        <TabsContent value="spot" className="flex-grow overflow-hidden">
             <ScrollArea className="h-full">
                <Table>
                <TableHeader>
                    <TableRow className="border-b-border/60">
                    <TableHead className="text-xs">Symbol</TableHead>
                    <TableHead className="text-right text-xs">24h Change</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {markets.map(market => (
                    <TableRow key={market.symbol} className="border-b-border/60 cursor-pointer hover:bg-card/50">
                        <TableCell className="p-2">
                            <div className="text-sm font-medium">{market.symbol}</div>
                            <div className="text-xs text-muted-foreground">Vol: {market.vol}</div>
                        </TableCell>
                        <TableCell className={cn(
                            "p-2 text-right font-medium",
                            market.change >= 0 ? 'text-green-500' : 'text-red-500'
                        )}>
                            {market.change.toFixed(2)}%
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </ScrollArea>
        </TabsContent>
       </Tabs>
    </div>
  );
}
