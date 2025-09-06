
'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { OrderBookEntry } from '@/types';
import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

const generateOrderBookData = (count: number, isAsks: boolean): OrderBookEntry[] => {
    const data = [];
    let price = isAsks ? 110370.70 : 110370.69;
    let total = 0;

    for (let i = 0; i < count; i++) {
        price += isAsks ? (Math.random() * 0.1) : -(Math.random() * 0.1);
        const amount = Math.random() * (isAsks ? 2 : 1) + 0.0001;
        total += amount;
        data.push({
            price: parseFloat(price.toFixed(2)),
            amount: parseFloat(amount.toFixed(4)),
            total: parseFloat(total.toFixed(4)),
        });
    }
    return isAsks ? data : data.reverse();
}


export function OrderBook() {
    const asks = useMemo(() => generateOrderBookData(10, true), []);
    const bids = useMemo(() => generateOrderBookData(10, false), []);

  return (
    <div className="h-full flex flex-col text-xs">
        <div className="p-2 border-b border-border">
            <Tabs defaultValue="order-book" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-8">
                    <TabsTrigger value="order-book" className="text-xs">Order Book</TabsTrigger>
                    <TabsTrigger value="recent-trades" className="text-xs">Recent Trades</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
         <div className="p-2 flex justify-end">
            <Select defaultValue="0.01">
                <SelectTrigger className="w-24 h-7 text-xs">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0.01">0.01</SelectItem>
                    <SelectItem value="0.1">0.1</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="grid grid-cols-3 gap-4 px-2 pb-1 text-muted-foreground">
            <div>Price (USDT)</div>
            <div className="text-right">Amount (BTC)</div>
            <div className="text-right">Total</div>
        </div>
        <div className="flex-grow overflow-y-auto">
             {/* Asks */}
            <div>
                 {asks.map((ask, index) => (
                     <div key={index} className="grid grid-cols-3 gap-4 px-2 py-0.5 relative hover:bg-muted/50">
                        <div className="absolute right-0 top-0 h-full bg-red-500/10" style={{ width: `${(ask.total / asks[asks.length - 1].total) * 100}%`}}></div>
                        <div className="text-red-500 z-10">{ask.price.toFixed(2)}</div>
                        <div className="text-right z-10">{ask.amount.toFixed(4)}</div>
                        <div className="text-right z-10">{ask.total.toFixed(4)}</div>
                    </div>
                 ))}
            </div>

            <div className="py-2 px-2 text-lg font-semibold flex items-center gap-2">
                110,370.70 <TrendingUp className="h-5 w-5 text-green-500"/>
            </div>

            {/* Bids */}
            <div>
                 {bids.map((bid, index) => (
                     <div key={index} className="grid grid-cols-3 gap-4 px-2 py-0.5 relative hover:bg-muted/50">
                         <div className="absolute right-0 top-0 h-full bg-green-500/10" style={{ width: `${(bid.total / bids[bids.length - 1].total) * 100}%`}}></div>
                        <div className="text-green-500 z-10">{bid.price.toFixed(2)}</div>
                        <div className="text-right z-10">{bid.amount.toFixed(4)}</div>
                        <div className="text-right z-10">{bid.total.toFixed(4)}</div>
                    </div>
                 ))}
            </div>
        </div>
         <div className="p-2 border-t border-border">
            <Tabs defaultValue="orders" className="w-full">
                <TabsList className="w-full justify-start h-8 bg-transparent p-0">
                    <TabsTrigger value="orders" className="text-xs data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Orders</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    </div>
  );
}
