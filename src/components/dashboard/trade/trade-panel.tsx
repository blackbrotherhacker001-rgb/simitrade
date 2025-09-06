
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, DollarSign, Timer, Copy, HardDrive, AlertTriangle } from 'lucide-react';
import { TradeConfirmationDialog } from './trade-confirmation-dialog';
import { cn } from '@/lib/utils';

type TradeType = 'RISE' | 'FALL';

export function TradePanel() {
  const [amount, setAmount] = useState(100);
  const [expiry, setExpiry] = useState(30);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [activeTrade, setActiveTrade] = useState<{ type: TradeType, amount: number, expiry: number } | null>(null);

  const amountOptions = [10, 25, 50, 100, 250, 500, 1000];
  const expiryOptions = [15, 30, 60, 120, 300];

  const handleTrade = (type: TradeType) => {
    setActiveTrade({ type, amount, expiry });
    setDialogOpen(true);
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="standard">Standard Trading</TabsTrigger>
                <TabsTrigger value="ai">AI Investment</TabsTrigger>
            </TabsList>
        </Tabs>

        <Card>
            <CardContent className="p-4 space-y-4">
                <div>
                    <label className="text-xs text-muted-foreground flex items-center justify-between">
                        <span><DollarSign className="inline-block mr-1 h-3 w-3"/>Amount</span>
                        <span>Balance: $10,000.00</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 mt-1">
                        {amountOptions.slice(0, 3).map(opt => (
                            <Button key={opt} variant={amount === opt ? 'secondary' : 'outline'} size="sm" onClick={() => setAmount(opt)}>${opt}</Button>
                        ))}
                         <Button variant="outline" size="sm" className="col-span-1" onClick={() => setAmount(prev => prev + 10)}>+</Button>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-muted-foreground"><Timer className="inline-block mr-1 h-3 w-3"/>Expiry</label>
                    <div className="grid grid-cols-5 gap-2 mt-1">
                        {expiryOptions.map(opt => (
                            <Button key={opt} variant={expiry === opt ? 'secondary' : 'outline'} size="sm" onClick={() => setExpiry(opt)}>{opt}s</Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
            <Button variant="outline"><Copy className="mr-2 h-4 w-4"/> Templates</Button>
            <Button variant="outline"><AlertTriangle className="mr-2 h-4 w-4"/> Keys/Risk</Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Button className="h-16 text-lg bg-green-600 hover:bg-green-700 text-white" onClick={() => handleTrade('RISE')}>
                <ArrowUp className="mr-2 h-6 w-6"/>
                RISE
            </Button>
            <Button className="h-16 text-lg bg-red-600 hover:bg-red-700 text-white" onClick={() => handleTrade('FALL')}>
                <ArrowDown className="mr-2 h-6 w-6"/>
                FALL
            </Button>
        </div>

        <Tabs defaultValue="positions" className="w-full">
            <TabsList>
                <TabsTrigger value="positions">Positions</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="positions" className="mt-4">
                 <div className="text-center text-muted-foreground py-8">
                    You have no open positions.
                </div>
            </TabsContent>
        </Tabs>
      </div>
      <TradeConfirmationDialog 
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        trade={activeTrade}
      />
    </>
  );
}
