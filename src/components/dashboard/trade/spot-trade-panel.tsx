

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { TrendingDown } from 'lucide-react';
import { useMarket } from '@/hooks/use-market';

export function SpotTradePanel() {
  const { user } = useAuth();
  const { market } = useMarket();
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [activeMainTab, setActiveMainTab] = useState('standard');
  const [activeStopTab, setActiveStopTab] = useState('stop-market');

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
                    className={cn("w-full", tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-[#1f2937] text-muted-foreground hover:bg-gray-700')}
                    onClick={() => setTradeType('buy')}
                >
                    Buy
                </Button>
                <Button 
                    className={cn("w-full", tradeType === 'sell' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-[#1f2937] text-muted-foreground hover:bg-gray-700')}
                    onClick={() => setTradeType('sell')}
                >
                    Sell
                </Button>
            </div>
            
            <TabsContent value="limit" className="mt-4 space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="price" className="text-xs text-muted-foreground">Price</Label>
                    <div className="relative">
                        <Input id="price" type="number" defaultValue={market.price.toFixed(2)} className="bg-[#1f2937] pr-12"/>
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="amount" className="text-xs text-muted-foreground">Amount</Label>
                    <div className="relative">
                         <Input id="amount" type="number" placeholder="0.00" className="bg-[#1f2937] pr-12"/>
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{market.symbol}</span>
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
                        <Input id="total" type="number" placeholder="0.00" className="bg-[#1f2937] pr-12"/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                    </div>
                </div>

                <Button className={cn("w-full", tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white')}>
                    {tradeType === 'buy' ? `Buy ${market.symbol}` : `Sell ${market.symbol}`}
                </Button>
            </TabsContent>

             <TabsContent value="market" className="mt-4 space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="market-price" className="text-xs text-muted-foreground">Market Price</Label>
                        <span className={cn("text-xs flex items-center", market.change >=0 ? 'text-green-500' : 'text-red-500')}>
                            <TrendingDown className="h-3 w-3 mr-1"/>
                            {market.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input id="market-price" type="text" readOnly value={market.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} className="bg-[#1f2937] pl-6"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="market-amount" className="text-xs text-muted-foreground">Amount</Label>
                    <div className="relative">
                         <Input id="market-amount" type="number" placeholder="0.00" className="bg-[#1f2937] pr-12"/>
                         <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{market.symbol}</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="sm" className="bg-[#1f2937]">25%</Button>
                    <Button variant="outline" size="sm" className="bg-[#1f2937]">50%</Button>
                    <Button variant="outline" size="sm" className="bg-[#1f2937]">75%</Button>
                    <Button variant="outline" size="sm" className="bg-[#1f2937]">100%</Button>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="market-total" className="text-xs text-muted-foreground">Estimated Total</Label>
                     <div className="relative">
                        <Input id="market-total" type="number" placeholder="0.00" className="bg-[#1f2937] pr-12"/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                    </div>
                </div>
                <div className="text-xs text-muted-foreground p-2 bg-black/20 rounded-md">
                   Market orders execute immediately at the best available price. The final execution price may differ from the estimated price.
                </div>
                <Button className={cn("w-full", tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white')}>
                    {tradeType === 'buy' ? `Buy ${market.symbol} at Market` : `Sell ${market.symbol} at Market`}
                </Button>

            </TabsContent>
             <TabsContent value="stop" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <Button 
                        variant="outline" 
                        onClick={() => setActiveStopTab('stop-market')}
                        className={cn(activeStopTab === 'stop-market' ? 'bg-[#1f2937] text-white border-gray-700' : 'bg-transparent text-muted-foreground border-transparent')}
                    >
                        Stop Market
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={() => setActiveStopTab('stop-limit')}
                        className={cn(activeStopTab === 'stop-limit' ? 'bg-[#1f2937] text-white border-gray-700' : 'bg-transparent text-muted-foreground border-transparent')}
                    >
                        Stop Limit
                    </Button>
                </div>

                {activeStopTab === 'stop-market' && (
                    <>
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="stop-market-price" className="text-xs text-muted-foreground">Market Price</Label>
                                <span className={cn("text-xs flex items-center", market.change >=0 ? 'text-green-500' : 'text-red-500')}>
                                    <TrendingDown className="h-3 w-3 mr-1"/>
                                    {market.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="stop-price" className="text-xs text-muted-foreground">Stop Price</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                                <Input id="stop-price" type="text" defaultValue={market.price.toFixed(2)} className="bg-[#1f2937] pl-6"/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="stop-amount" className="text-xs text-muted-foreground">Amount</Label>
                            <div className="relative">
                                <Input id="stop-amount" type="number" placeholder="0.00" className="bg-[#1f2937] pr-12"/>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{market.symbol}</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2">
                            <Button variant="outline" size="sm" className="bg-[#1f2937]">25%</Button>
                            <Button variant="outline" size="sm" className="bg-[#1f2937]">50%</Button>
                            <Button variant="outline" size="sm" className="bg-[#1f2937]">75%</Button>
                            <Button variant="outline" size="sm" className="bg-[#1f2937]">100%</Button>
                        </div>
                        
                        <div className="text-xs text-muted-foreground p-2 bg-black/20 rounded-md">
                           Stop Market orders execute as market orders when the stop price is reached. The order will be filled at the best available price.
                        </div>

                        <Button className={cn("w-full", tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white')}>
                            {tradeType === 'buy' ? `Buy ${market.symbol} Stop` : `Sell ${market.symbol} Stop`}
                        </Button>
                    </>
                )}
                 {activeStopTab === 'stop-limit' && (
                    <>
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="stop-limit-market-price" className="text-xs text-muted-foreground">Market Price</Label>
                                <span className={cn("text-xs flex items-center", market.change >=0 ? 'text-green-500' : 'text-red-500')}>
                                    <TrendingDown className="h-3 w-3 mr-1"/>
                                    {market.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="stop-limit-stop-price" className="text-xs text-muted-foreground">Stop Price</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                                <Input id="stop-limit-stop-price" type="text" defaultValue={market.price.toFixed(2)} className="bg-[#1f2937] pl-6"/>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <Label htmlFor="stop-limit-limit-price" className="text-xs text-muted-foreground">Limit Price</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                                <Input id="stop-limit-limit-price" type="text" defaultValue={market.price.toFixed(2)} className="bg-[#1f2937] pl-6"/>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="stop-limit-amount" className="text-xs text-muted-foreground">Amount</Label>
                            <div className="relative">
                                <Input id="stop-limit-amount" type="number" placeholder="0.00" className="bg-[#1f2937] pr-12"/>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{market.symbol}</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2">
                            <Button variant="outline" size="sm" className="bg-[#1f2937]">25%</Button>
                            <Button variant="outline" size="sm" className="bg-[#1f2937]">50%</Button>
                            <Button variant="outline" size="sm" className="bg-[#1f2937]">75%</Button>
                            <Button variant="outline" size="sm" className="bg-[#1f2937]">100%</Button>
                        </div>
                        
                        <div className="text-xs text-muted-foreground p-2 bg-black/20 rounded-md">
                           Stop Limit orders become limit orders when the stop price is reached. The order will be filled at the limit price or better.
                        </div>

                        <Button className={cn("w-full", tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white')}>
                            {tradeType === 'buy' ? `Buy ${market.symbol} Stop Limit` : `Sell ${market.symbol} Stop Limit`}
                        </Button>
                    </>
                 )}
            </TabsContent>
        </Tabs>
    </div>
  );
}

    