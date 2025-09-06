
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function SpotTradePanel() {
  const { user } = useAuth();
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const balance = user?.balance ?? 0;
  const btcBalance = 0.00000000;
  
  return (
    <div className="w-80 flex-shrink-0 bg-[#111827] p-4 space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Standard Trading</h3>
            <div className="flex items-center space-x-2">
                <Switch id="ai-investment" />
                <Label htmlFor="ai-investment">AI Investment</Label>
            </div>
        </div>

        <Tabs defaultValue="limit">
            <div className="flex">
                <TabsList className={cn("grid w-full grid-cols-2 p-0 h-auto rounded-md bg-[#1f2937]")}>
                    <TabsTrigger 
                        value="buy" 
                        className={cn("data-[state=active]:bg-[#10b981] data-[state=active]:text-white rounded-md", tradeType === 'buy' ? 'bg-[#10b981] text-white' : 'bg-transparent text-muted-foreground')}
                        onClick={() => setTradeType('buy')}
                    >
                        Buy
                    </TabsTrigger>
                    <TabsTrigger 
                        value="sell"
                        className={cn("data-[state=active]:bg-[#ef4444] data-[state=active]:text-white rounded-md", tradeType === 'sell' ? 'bg-[#ef4444] text-white' : 'bg-transparent text-muted-foreground')}
                        onClick={() => setTradeType('sell')}
                    >
                        Sell
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsList className="grid w-full grid-cols-3 mt-4">
                <TabsTrigger value="limit">Limit</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="stop">Stop</TabsTrigger>
            </TabsList>
            <TabsContent value="limit" className="space-y-4">
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Available:</span>
                        <span>{tradeType === 'buy' ? `${balance.toFixed(2)} USDT` : `${btcBalance.toFixed(8)} BTC`}</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="price" className="text-xs">Price</Label>
                    <div className="relative">
                        <Input id="price" type="number" defaultValue="110856.00" className="bg-[#1f2937] pr-12"/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="amount" className="text-xs">Amount</Label>
                    <div className="relative">
                         <Input id="amount" type="number" placeholder="0.00" className="bg-[#1f2937] pr-12"/>
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">BTC</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="bg-[#1f2937]">25%</Button>
                    <Button variant="outline" size="sm" className="bg-[#1f2937]">50%</Button>
                    <Button variant="outline" size="sm" className="bg-[#1f2937]">75%</Button>
                    <Button variant="outline" size="sm" className="bg-[#1f2937]">100%</Button>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="total" className="text-xs">Total</Label>
                     <div className="relative">
                        <Input id="total" type="number" placeholder="0.00" className="bg-[#1f2937] pr-12"/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                    </div>
                </div>

                <Button className={cn("w-full", tradeType === 'buy' ? 'bg-[#10b981] hover:bg-green-700' : 'bg-[#ef4444] hover:bg-red-700')}>
                    {tradeType === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                </Button>

            </TabsContent>
        </Tabs>
    </div>
  );
}
