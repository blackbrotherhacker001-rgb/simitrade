
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus, Plus, Wallet, Shield } from 'lucide-react';
import { TradeConfirmationDialog } from './trade-confirmation-dialog';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';

type TradeType = 'RISE' | 'FALL';

export function TradePanel() {
  const [amount, setAmount] = useState(1000);
  const [expiry, setExpiry] = useState(60); // 1 minute
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [activeTrade, setActiveTrade] = useState<{ type: TradeType, amount: number, expiry: number } | null>(null);
  const [nextExpiryTime, setNextExpiryTime] = useState(50);
  const { user } = useAuth();
  const balance = user?.balance ?? 0;

  useEffect(() => {
    const timer = setInterval(() => {
        setNextExpiryTime(prev => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  const handleTrade = (type: TradeType) => {
    setActiveTrade({ type, amount, expiry });
    setDialogOpen(true);
  };
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) return `${m} minute${m > 1 ? 's' : ''}`;
    return `${s} seconds`;
  }

  const formatTimer = (seconds: number) => {
      const m = Math.floor(seconds / 60).toString().padStart(2,'0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
  }

  return (
    <>
      <div className="p-4 space-y-4 bg-[#161A25] h-full flex flex-col">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Amount</label>
                <div className="flex items-center border border-input rounded-md">
                     <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setAmount(p => Math.max(10, p-10))}><Minus className="h-4 w-4"/></Button>
                     <Input 
                        value={`$${amount.toLocaleString()}`} 
                        onChange={(e) => {
                            const val = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                            if (!isNaN(val)) setAmount(val);
                        }}
                        className="w-full text-center border-none focus-visible:ring-0 shadow-none" 
                     />
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setAmount(p => p+10)}><Plus className="h-4 w-4"/></Button>
                </div>
                <p className="text-xs text-muted-foreground">{((amount / balance) * 100).toFixed(1)}% of balance</p>
            </div>
             <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Expiry</label>
                <div className="flex items-center border border-input rounded-md">
                     <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setExpiry(p => Math.max(15, p-15))}><Minus className="h-4 w-4"/></Button>
                     <div className="w-full text-center text-sm py-2">{new Date(Date.now() + expiry * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})} PM</div>
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setExpiry(p => p+15)}><Plus className="h-4 w-4"/></Button>
                </div>
                <p className="text-xs text-muted-foreground">{formatTime(expiry)}</p>
            </div>
        </div>

        <Card className="bg-card/30 border-border/50">
            <CardContent className="p-3 space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Profit</p>
                    <p className="font-semibold text-green-500">+87%</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Potential</p>
                    <p className="font-semibold text-green-500">+${(amount * 0.87).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Loss</p>
                    <p className="font-semibold text-red-500">-${amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
            </CardContent>
        </Card>

         <div>
            <label className="text-xs text-muted-foreground">Templates</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
                <Button variant="outline" size="sm" className="bg-card/30 border-border/50">Conservative</Button>
                <Button variant="outline" size="sm" className="bg-card/30 border-border/50">Balanced</Button>
                <Button variant="outline" size="sm" className="bg-card/30 border-border/50">Aggressive</Button>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="bg-card/30 border-border/50"><Wallet className="mr-2 h-4 w-4"/> Keys</Button>
            <Button variant="outline" className="bg-card/30 border-border/50"><Shield className="mr-2 h-4 w-4"/> Risk</Button>
        </div>

        <Card className="bg-card/30 border-border/50">
            <CardContent className="p-3 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Next expiry in:</p>
                <p className="text-lg font-mono font-semibold">{formatTimer(nextExpiryTime)}</p>
            </CardContent>
        </Card>
       
        <div className="flex-grow"></div>

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

      </div>
      <TradeConfirmationDialog 
        isOpen={isDialogOpen}
        onOpenChange={setDialogOpen}
        trade={activeTrade}
      />
    </>
  );
}
