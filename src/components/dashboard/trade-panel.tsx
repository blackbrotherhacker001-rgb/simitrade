

'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { ArrowUp, ArrowDown, Minus, Plus, Clock, Keyboard, ShieldAlert, Check } from "lucide-react";
import { Separator } from "../ui/separator";
import { TradeConfirmationDialog } from "./trade-confirmation-dialog";
import useMarketData from "@/hooks/use-market-data";


const tradeSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  expiry: z.string().min(1, "Expiry is required"),
});

type TradeFormValues = z.infer<typeof tradeSchema>;

type MarketTrend = 'bullish' | 'bearish' | 'sideways' | 'volatile';
type MarketMode = 'live' | 'manual';
const MARKET_TREND_STORAGE_KEY = 'market-trend';
const MARKET_MODE_STORAGE_KEY = 'market-mode';

const expiryOptions: {[key: string]: { label: string, profit: number }} = {
    "1": { label: "1 minute", profit: 87 },
    "5": { label: "5 minutes", profit: 85 },
    "15": { label: "15 minutes", profit: 80 }
}

const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];
const percentageAmounts = [1, 5, 10, 25];

export function TradePanel() {
  const [countdown, setCountdown] = useState(54);
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'rise' | 'fall'>('rise');
  const [isAmountPopoverOpen, setAmountPopoverOpen] = useState(false);
  const [isExpiryPopoverOpen, setExpiryPopoverOpen] = useState(false);
  
  const [trend, setTrend] = useState<MarketTrend>('sideways');
  const [mode, setMode] = useState<MarketMode>('live');

  useEffect(() => {
    const updateMarketState = () => {
      const storedMode = localStorage.getItem(MARKET_MODE_STORAGE_KEY) as MarketMode;
      setMode(storedMode || 'live');

      if (storedMode === 'manual') {
        const storedTrend = localStorage.getItem(MARKET_TREND_STORAGE_KEY) as MarketTrend;
        setTrend(storedTrend || 'sideways');
      } else {
        setTrend('sideways');
      }
    };
    updateMarketState();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === MARKET_TREND_STORAGE_KEY || event.key === MARKET_MODE_STORAGE_KEY) {
        updateMarketState();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const { currentPrice } = useMarketData(mode === 'live' ? 'sideways' : trend);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const form = useForm<TradeFormValues>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      amount: 100,
      expiry: "1",
    },
  });
  
  const handleTrade = (type: 'rise' | 'fall') => {
    const valid = form.trigger();
    if (!valid) return;
    
    const values = form.getValues();
     if (!user) return;
     if (values.amount > user.balance) {
        toast({
          variant: "destructive",
          title: "Insufficient funds",
          description: "You do not have enough balance to make this trade.",
        });
        return;
      }
      setTradeType(type);
      setConfirmOpen(true);
  }

  const onConfirmTrade = () => {
    const values = form.getValues();
    if (!user) return;
    updateBalance(user.balance - values.amount);
    toast({
        title: `Trade Placed: ${tradeType.toUpperCase()}`,
        description: `$${values.amount} on BTC to ${tradeType} in ${expiryOptions[values.expiry].label}.`
    })
    setConfirmOpen(false);
  }
  
  const amount = form.watch('amount');
  const expiry = form.watch('expiry');

  const potentialProfit = useMemo(() => {
    const profitPercent = expiryOptions[expiry]?.profit || 80;
    return amount * (profitPercent / 100);
  }, [amount, expiry]);
  
  const potentialLoss = amount;

  const getExpiryTime = (minutes: string) => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + parseInt(minutes));
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
  }

  const handleQuickAmount = (value: number) => {
    form.setValue('amount', value);
  }

  const handlePercentageAmount = (percentage: number) => {
    if (!user) return;
    const newAmount = (user.balance * percentage) / 100;
    form.setValue('amount', Math.floor(newAmount));
  }
  
  const handleApplyCustomAmount = (customAmount: number) => {
    form.setValue('amount', customAmount);
    setAmountPopoverOpen(false);
  }

  const handleSelectExpiry = (value: string) => {
    form.setValue('expiry', value);
    setExpiryPopoverOpen(false);
  }

  return (
    <>
      <TradeConfirmationDialog
          isOpen={isConfirmOpen}
          onOpenChange={setConfirmOpen}
          type={tradeType}
          amount={form.getValues('amount')}
          expiry={form.getValues('expiry')}
          currentPrice={currentPrice}
          potentialProfit={potentialProfit}
          potentialLoss={potentialLoss}
          onConfirm={onConfirmTrade}
      />
      <div className="flex flex-col h-full p-4 space-y-4">
          <Form {...form}>
              <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                      {/* Amount Input */}
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                 <Popover open={isAmountPopoverOpen} onOpenChange={setAmountPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <div className="bg-muted/30 p-2 rounded-md cursor-pointer">
                                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                                <FormLabel>Amount</FormLabel>
                                                <div>
                                                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); field.onChange(Math.max(0, field.value - 10))}}><Minus className="h-4 w-4"/></Button>
                                                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); field.onChange(field.value + 10)}}><Plus className="h-4 w-4"/></Button>
                                                </div>
                                            </div>
                                                <div className="flex items-baseline justify-center">
                                                    <span className="text-xl font-semibold">$</span>
                                                    <Input
                                                        readOnly
                                                        type="text"
                                                        value={field.value.toLocaleString()}
                                                        className="bg-transparent border-none text-2xl font-bold w-full text-center h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer"
                                                     />
                                                </div>
                                            <p className="text-xs text-center text-muted-foreground">{user && user.balance > 0 ? ((field.value / user.balance) * 100).toFixed(1) : 0}% of balance</p>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80" align="start">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm font-medium mb-2">Quick Amounts</p>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {quickAmounts.map(val => (
                                                        <Button 
                                                            key={val} 
                                                            variant={amount === val ? "default" : "secondary"} 
                                                            onClick={() => handleQuickAmount(val)}
                                                            className={cn(amount === val && 'bg-green-600 hover:bg-green-700')}
                                                        >
                                                            {amount === val && <Check className="mr-2 h-4 w-4"/>}
                                                            ${val.toLocaleString()}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                             <div>
                                                <p className="text-sm font-medium mb-2">Percentage of Balance</p>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {percentageAmounts.map(val => (
                                                        <Button 
                                                            key={val} 
                                                            variant="secondary"
                                                            onClick={() => handlePercentageAmount(val)}
                                                        >
                                                           {val}%
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium mb-2">Custom Amount</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="relative flex-grow">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                                        <Input 
                                                            type="number" 
                                                            defaultValue={amount} 
                                                            className="pl-6"
                                                            id="custom-amount-input"
                                                        />
                                                    </div>
                                                    <Button 
                                                        className="bg-green-600 hover:bg-green-700"
                                                        onClick={() => {
                                                            const input = document.getElementById('custom-amount-input') as HTMLInputElement;
                                                            if (input) {
                                                                handleApplyCustomAmount(parseFloat(input.value) || 0)
                                                            }
                                                        }}
                                                    >
                                                        Apply
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">Available: ${user?.balance.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                 </Popover>
                            </FormItem>
                        )}
                      />
                      {/* Expiry Input */}
                       <FormField
                        control={form.control}
                        name="expiry"
                        render={({ field }) => (
                            <FormItem>
                                 <Popover open={isExpiryPopoverOpen} onOpenChange={setExpiryPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <div className="bg-muted/30 p-2 rounded-md cursor-pointer">
                                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                                <FormLabel>Expiry</FormLabel>
                                                <div>
                                                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6"><Minus className="h-4 w-4"/></Button>
                                                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6"><Plus className="h-4 w-4"/></Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-2xl font-bold w-full text-center">
                                                <Clock className="h-6 w-6 text-muted-foreground"/>
                                                {getExpiryTime(field.value)}
                                            </div>
                                            <p className="text-xs text-center text-muted-foreground">{expiryOptions[field.value].label}</p>
                                        </div>
                                    </PopoverTrigger>
                                     <PopoverContent className="w-80 p-0" align="start">
                                        <div className="p-4">
                                             <h4 className="font-medium text-lg">Expiry Time</h4>
                                        </div>
                                        <div className="flex flex-col">
                                            {Object.entries(expiryOptions).map(([value, { label, profit }]) => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => handleSelectExpiry(value)}
                                                    className={cn(
                                                        "flex items-center justify-between p-4 text-left hover:bg-muted/50 w-full",
                                                        field.value === value && "bg-green-600/20 text-green-400"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {field.value === value ? (
                                                            <Check className="h-5 w-5 text-green-400" />
                                                        ) : (
                                                            <div className="w-5 h-5" /> // Placeholder for alignment
                                                        )}
                                                        <div>
                                                            <p className="font-semibold">{getExpiryTime(value)}</p>
                                                            <p className="text-sm">{label.split(' ')[0]} {label.split(' ')[1]}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={cn("px-2 py-1 rounded-md text-sm font-semibold", field.value === value ? "bg-green-500 text-white" : "bg-muted")}>
                                                            {profit}%
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                            <Clock className="h-3 w-3" />
                                                            <span>00:04</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                         <div className="p-4 border-t border-border">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground">Next expiry in:</span>
                                                <span className="font-mono text-primary">00:{countdown.toString().padStart(2, '0')}</span>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                      />
                  </div>
                  
                  <div className="space-y-2 text-sm bg-muted/30 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Profit</span>
                          <span className="font-medium text-green-500">+{expiryOptions[expiry].profit}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Potential:</span>
                          <span className="font-medium text-green-500">+${potentialProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Loss:</span>
                          <span className="font-medium text-red-500">-${potentialLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      </div>
                  </div>

                  <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Templates</p>
                      <div className="grid grid-cols-3 gap-2">
                          <Button variant="secondary" size="sm">Conservative</Button>
                          <Button variant="secondary" size="sm">Balanced</Button>
                          <Button variant="secondary" size="sm">Aggressive</Button>
                      </div>
                  </div>
                   <div className="grid grid-cols-2 gap-2">
                      <Button variant="secondary"><Keyboard className="mr-2 h-4 w-4"/>Keys</Button>
                      <Button variant="secondary"><ShieldAlert className="mr-2 h-4 w-4"/>Risk</Button>
                  </div>

                  <div className="flex items-center justify-between bg-muted/30 p-3 rounded-md">
                      <span className="text-sm text-muted-foreground">Next expiry in:</span>
                      <span className="font-mono text-lg font-semibold text-primary">00:{countdown.toString().padStart(2, '0')}</span>
                  </div>

              </form>
          </Form>
          <div className="grid grid-cols-2 gap-4 mt-auto pt-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg h-16 text-background" onClick={() => handleTrade('rise')}>
                  <ArrowUp className="mr-2 h-6 w-6"/>
                  RISE
              </Button>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg h-16 text-background" onClick={() => handleTrade('fall')}>
                  <ArrowDown className="mr-2 h-6 w-6"/>
                  FALL
              </Button>
          </div>
      </div>
    </>
  );
}

    