
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus, Plus, Wallet, Shield, Clock, Check, DollarSign } from 'lucide-react';
import { TradeConfirmationDialog } from './trade-confirmation-dialog';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';
import { TradeSettingsDialog } from './trade-settings-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

type TradeType = 'RISE' | 'FALL';

const expiryOptions = [
    { duration: 60, label: '1 min', payout: 87 },
    { duration: 300, label: '5 min', payout: 85 },
    { duration: 900, label: '15 min', payout: 80 },
];

const quickAmounts = [100, 500, 1000];
const quickPercentages = [10, 25, 50, 100];


export function TradePanel() {
  const [amount, setAmount] = useState(1000);
  const [expiry, setExpiry] = useState(60); // 1 minute
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [settingsType, setSettingsType] = useState<'keys' | 'risk'>('keys');
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
    setConfirmationOpen(true);
  };
  
  const handleSettings = (type: 'keys' | 'risk') => {
    setSettingsType(type);
    setSettingsOpen(true);
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) {
        if (s > 0) return `${m}m ${s}s`;
        return `${m} minute${m > 1 ? 's' : ''}`;
    }
    return `${s} seconds`;
  }
  
  const getExpiryTime = (durationInSeconds: number) => {
      const now = new Date();
      now.setSeconds(now.getSeconds() + durationInSeconds);
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
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
                <Popover>
                    <PopoverTrigger asChild>
                         <div className="flex items-center justify-between border border-input rounded-md h-10 px-3 cursor-pointer">
                             <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">${amount.toLocaleString()}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{((amount / balance) * 100).toFixed(1)}%</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 bg-[#1F2328] border-gray-700 p-3" align="start">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-white">Select Amount</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {quickAmounts.map(qa => (
                                    <Button key={qa} variant="secondary" className="bg-card/50" onClick={() => setAmount(qa)}>${qa}</Button>
                                ))}
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                 {quickPercentages.map(qp => (
                                    <Button key={qp} variant="secondary" className="bg-card/50" onClick={() => setAmount(balance * (qp/100))}>{qp}%</Button>
                                ))}
                            </div>
                            <div className="relative">
                               <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                               <Input 
                                    value={amount} 
                                    type="number"
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val)) setAmount(val);
                                    }}
                                    className="pl-8" 
                                 />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
             <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Expiry</label>
                 <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex items-center justify-between border border-input rounded-md h-10 px-3 cursor-pointer">
                             <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">{getExpiryTime(expiry)}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{formatTime(expiry)}</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 bg-[#1F2328] border-gray-700 p-0">
                        <div className="p-3">
                            <h4 className="font-semibold text-white">Expiry Time</h4>
                        </div>
                         <div className="flex flex-col gap-1 px-2 pb-2">
                            {expiryOptions.map(option => (
                                <div 
                                    key={option.duration}
                                    onClick={() => setExpiry(option.duration)}
                                    className={cn(
                                        "p-2 rounded-md cursor-pointer flex justify-between items-center",
                                        expiry === option.duration ? 'bg-green-500/20 text-green-400' : 'hover:bg-card/50'
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        {expiry === option.duration && <Check className="h-4 w-4 text-green-400"/>}
                                        <div>
                                            <p className={cn("font-semibold", expiry === option.duration ? 'text-green-400' : 'text-white')}>{getExpiryTime(option.duration)}</p>
                                            <p className={cn("text-xs", expiry === option.duration ? 'text-green-400/80' : 'text-muted-foreground')}>{option.label}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge className={cn(expiry === option.duration ? 'bg-green-500 text-white' : 'bg-green-500/20 text-green-400')}>{option.payout}%</Badge>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            <Clock className="inline-block h-3 w-3 mr-1" />
                                            {formatTimer(option.duration - 10)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                         </div>
                         <div className="border-t border-gray-700 p-3 flex justify-between items-center text-sm">
                            <p className="text-muted-foreground">Next expiry in:</p>
                            <p className="font-mono font-semibold text-white">{formatTimer(nextExpiryTime)}</p>
                         </div>
                    </PopoverContent>
                 </Popover>
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
            <Button variant="outline" className="bg-card/30 border-border/50" onClick={() => handleSettings('keys')}><Wallet className="mr-2 h-4 w-4"/> Keys</Button>
            <Button variant="outline" className="bg-card/30 border-border/50" onClick={() => handleSettings('risk')}><Shield className="mr-2 h-4 w-4"/> Risk</Button>
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
        isOpen={isConfirmationOpen}
        onOpenChange={setConfirmationOpen}
        trade={activeTrade}
      />
      <TradeSettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setSettingsOpen}
        type={settingsType}
      />
    </>
  );
}
