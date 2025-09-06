
'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { SpotMarket } from '@/types';
import { Search, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';

const mockMarkets: SpotMarket[] = [
    { symbol: 'ACH/USDT', name: 'ACH/USDT', price: 0.01930, change24h: -3.45, volume24h: 1.5, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8609.png' },
    { symbol: 'ACM/USDT', name: 'ACM/USDT', price: 0.914, change24h: 0.11, volume24h: 5.6, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8759.png' },
    { symbol: 'ADA/USDT', name: 'ADA/USDT', price: 0.8104, change24h: -3.50, volume24h: 67.7, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png' },
    { symbol: 'BTC/USDT', name: 'BTC/USDT', price: 110370.70, change24h: -1766.44, volume24h: 1.28, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
    { symbol: 'KAVA/USDT', name: 'KAVA/USDT', price: 0.3685, change24h: -0.27, volume24h: 2.6, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4846.png' },
    { symbol: 'KSM/USDT', name: 'KSM/USDT', price: 14.79, change24h: 3.46, volume24h: 18.7, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5034.png' },
    { symbol: 'LDO/USDT', name: 'LDO/USDT', price: 1.161, change24h: -6.79, volume24h: 18.7, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8000.png' },
    { symbol: 'LISTA/USDT', name: 'LISTA/USDT', price: 0.2366, change24h: -8.01, volume24h: 1.8, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x4/32680.png' },
    { symbol: 'LPT/USDT', name: 'LPT/USDT', price: 6.630, change24h: -8.90, volume24h: 7.0, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3640.png' },
    { symbol: 'LSK/USDT', name: 'LSK/USDT', price: 0.358, change24h: -9.00, volume24h: 473.2, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1214.png' },
    { symbol: 'LTC/USDT', name: 'LTC/USDT', price: 110.47, change24h: -1.77, volume24h: 25.5, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2.png' },
    { symbol: 'MANA/USDT', name: 'MANA/USDT', price: 0.2977, change24h: -3.72, volume24h: 3.2, icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1966.png' },
];

export function SpotMarketList() {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({ key: 'symbol', direction: 'asc' });

    const handleSort = (key: 'symbol' | 'change24h') => {
        setSort(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    }

    const filteredAndSortedMarkets = useMemo(() => {
        return mockMarkets
            .filter(market => market.symbol.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
                if (sort.key === 'symbol') {
                    return sort.direction === 'asc' ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol);
                }
                return sort.direction === 'asc' ? a.change24h - b.change24h : b.change24h - a.change24h;
            });
    }, [search, sort]);

  return (
    <div className="h-full flex flex-col">
        <div className="p-2 space-y-2 border-b border-border">
            <Tabs defaultValue="spot" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-8">
                    <TabsTrigger value="watchlist" className="text-xs gap-1"><Star className="h-3 w-3"/> Watchlist</TabsTrigger>
                    <TabsTrigger value="spot" className="text-xs">Spot</TabsTrigger>
                    <TabsTrigger value="futures" className="text-xs">Futures</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search markets..." 
                    className="pl-8 h-8 text-xs" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        <div className="flex-grow overflow-y-auto">
            <div className="p-2 text-xs text-muted-foreground flex justify-between sticky top-0 bg-background z-10">
                <button onClick={() => handleSort('symbol')} className="hover:text-foreground">Symbol</button>
                <button onClick={() => handleSort('change24h')} className="hover:text-foreground">24h Change</button>
            </div>
            <ul>
                {filteredAndSortedMarkets.map(market => (
                    <li key={market.symbol} className="flex items-center justify-between p-2 hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center gap-2">
                             <Star className="h-3 w-3 text-muted-foreground hover:text-yellow-400" />
                             <div>
                                <p className="text-xs font-semibold">{market.symbol}</p>
                                <p className="text-xs text-muted-foreground">Vol: {market.volume24h.toFixed(1)}M</p>
                             </div>
                        </div>
                         <div className={cn(
                            "text-xs font-semibold text-right",
                            market.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                        )}>
                            <p>{market.price.toFixed(4)}</p>
                            <p>{market.change24h.toFixed(2)}%</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}
