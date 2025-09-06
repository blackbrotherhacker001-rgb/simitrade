

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export function SpotTradePanel() {
  const { user } = useAuth();
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [activeMainTab, setActiveMainTab] = useState('standard');

  const balance = user?.balance ?? 0;
  const btcBalance = 0.00000000;
  
  return (
    <div className="w-80 flex-shrink-0 bg-[#111827] p-4 space-y-4">
        <Tabs defaultValue="standard" onValueChange={setActiveMainTab}>
            <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
                <TabsTrigger value="standard" className={cn("pb-2 rounded-none", activeMainTab === 'standard' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground')}>Standard Trading</TabsTrigger>
                <TabsTrigger value="ai" className={cn("pb-2 rounded-none", activeMainTab === 'ai' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground')}>AI Investment</TabsTrigger>
            </TabsList>
        </Tabs>

        <div className="flex justify-between text-xs text-muted-foreground">
            <span>Available:</span>
            <span>{tradeType === 'buy' ? `${balance.toFixed(2)} USDT` : `${btcBalance.toFixed(8)} BTC`}</span>
        </div>

        <Tabs defaultValue="limit">
            <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 text-muted-foreground">
                <TabsTrigger value="limit" className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary">Limit</TabsTrigger>
                <TabsTrigger value="market" className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary">Market</TabsTrigger>
                <TabsTrigger value="stop" className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary">Stop</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                    className={cn("w-full", tradeType === 'buy' ? 'bg-[#10b981] hover:bg-green-700 text-white' : 'bg-[#1f2937] text-muted-foreground hover:bg-gray-700')}
                    onClick={() => setTradeType('buy')}
                >
                    Buy
                </Button>
                <Button 
                    className={cn("w-full", tradeType === 'sell' ? 'bg-[#ef4444] hover:bg-red-700 text-white' : 'bg-[#1f2937] text-muted-foreground hover:bg-gray-700')}
                    onClick={() => setTradeType('sell')}
                >
                    Sell
                </Button>
            </div>
            
            <TabsContent value="limit" className="mt-4 space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="price" className="text-xs text-muted-foreground">Price</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input id="price" type="number" defaultValue="110209.69" className="bg-[#1f2937] pl-6 pr-12"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="amount" className="text-xs text-muted-foreground">Amount</Label>
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
                    <Label htmlFor="total" className="text-xs text-muted-foreground">Total</Label>
                     <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input id="total" type="number" placeholder="0.00" className="bg-[#1f2937] pl-6 pr-12"/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                    </div>
                </div>

                <Button className={cn("w-full", tradeType === 'buy' ? 'bg-[#10b981] hover:bg-green-700' : 'bg-[#ef4444] hover:bg-red-700')}>
                    {tradeType === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                </Button>

            </TabsContent>
            <TabsContent value="market">
                 <p className="text-center text-muted-foreground py-8">Market trade options unavailable.</p>
            </TabsContent>
             <TabsContent value="stop">
                 <p className="text-center text-muted-foreground py-8">Stop trade options unavailable.</p>
            </TabsContent>
        </Tabs>
    </div>
  );
}
