
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
import { markets, useMarket } from '@/hooks/use-market';

export function SpotMarketList() {
    const { setMarket } = useMarket();
  return (
    <div className="w-80 flex-shrink-0 bg-[#111827] flex flex-col">
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
                    <TableRow className="border-b-[#1f2937]">
                    <TableHead className="text-xs text-muted-foreground">Symbol</TableHead>
                    <TableHead className="text-right text-xs text-muted-foreground">Volume</TableHead>
                    <TableHead className="text-right text-xs text-muted-foreground">24h Change</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {markets.map(market => (
                    <TableRow key={market.symbol} className="border-b-transparent cursor-pointer hover:bg-card/50" onClick={() => setMarket(market)}>
                        <TableCell className="p-2">
                            <div className="text-sm font-medium">{market.pair}</div>
                        </TableCell>
                        <TableCell className="p-2 text-right text-muted-foreground">{ (market.volume / 1_000_000).toFixed(1) }M</TableCell>
                        <TableCell className={cn(
                            "p-2 text-right font-medium",
                            market.change >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'
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
