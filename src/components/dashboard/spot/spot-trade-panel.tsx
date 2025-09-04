
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { User, Wallet } from 'lucide-react';
import { useState } from 'react';

export function SpotTradePanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('buy');

  const formatBalance = (balance: number, symbol: string) => {
    return `${balance.toFixed(8)} ${symbol}`;
  }

  return (
    <div className="p-4 space-y-4">
        <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="standard">Standard Trading</TabsTrigger>
                <TabsTrigger value="ai">AI Investment</TabsTrigger>
            </TabsList>
        </Tabs>

        <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
                <span>Available:</span>
                <span>{user ? formatBalance(0.00000000, "BTC") : '0.00000000 BTC'} / {user ? formatBalance(user.balance, "USDT") : '0.00 USDT'}</span>
            </div>
        </div>

        <Tabs defaultValue="limit" className="w-full">
            <TabsList className="grid w-full grid-cols-3 text-xs h-8">
                <TabsTrigger value="limit" className="text-xs">Limit</TabsTrigger>
                <TabsTrigger value="market" className="text-xs">Market</TabsTrigger>
                <TabsTrigger value="stop" className="text-xs">Stop</TabsTrigger>
            </TabsList>

            <div className="mt-4">
                <div className="flex rounded-md border border-input">
                     <Button 
                        onClick={() => setActiveTab('buy')}
                        className={`w-1/2 rounded-r-none ${activeTab === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-transparent text-muted-foreground'}`}
                     >
                         Buy
                     </Button>
                     <Button 
                        onClick={() => setActiveTab('sell')}
                        className={`w-1/2 rounded-l-none ${activeTab === 'sell' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-transparent text-muted-foreground'}`}
                    >
                        Sell
                    </Button>
                </div>
            </div>

            <TabsContent value="limit" className="mt-4 space-y-4">
                 <div>
                    <label className="text-xs text-muted-foreground">Price</label>
                    <div className="relative">
                        <Input type="text" defaultValue="110,365.40" className="pr-16"/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">USDT</span>
                    </div>
                </div>
                <div>
                    <label className="text-xs text-muted-foreground">Amount</label>
                     <div className="relative">
                        <Input type="text" defaultValue="0.00" className="pr-16"/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">BTC</span>
                    </div>
                </div>
                <div className="flex justify-between gap-1">
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-7">25%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-7">50%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-7">75%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-7">100%</Button>
                </div>
                <div>
                    <label className="text-xs text-muted-foreground">Total</label>
                     <div className="relative">
                        <Input type="text" defaultValue="0.00" className="pr-16"/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">USDT</span>
                    </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Buy BTC</Button>
            </TabsContent>
        </Tabs>
         <div className="text-center pt-4">
            {user ? (
                <p className="text-xs text-muted-foreground">Logged in as {user.name}</p>
            ) : (
                <Button variant="link" className="text-xs">Login or Register</Button>
            )}
        </div>
    </div>
  );
}
