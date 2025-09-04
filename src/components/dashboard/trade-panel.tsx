
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { ArrowUp, ArrowDown } from "lucide-react";
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

export function TradePanel() {
  const [countdown, setCountdown] = useState(54);
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'rise' | 'fall'>('rise');
  
  const [trend, setTrend] = useState<MarketTrend>('sideways');
  const [mode, setMode] = useState<MarketMode>('live');

  useEffect(() => {
    // Function to update state from localStorage
    const updateMarketState = () => {
      const storedMode = localStorage.getItem(MARKET_MODE_STORAGE_KEY) as MarketMode;
      setMode(storedMode || 'live');

      if (storedMode === 'manual') {
        const storedTrend = localStorage.getItem(MARKET_TREND_STORAGE_KEY) as MarketTrend;
        setTrend(storedTrend || 'sideways');
      } else {
        // In 'live' mode, we can use a default like 'sideways'
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
      amount: 1000,
      expiry: "1",
    },
  });
  
  const handleTrade = (type: 'rise' | 'fall') => {
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
        description: `$${values.amount} on BTC to ${tradeType} in ${values.expiry} minute(s).`
    })
    setConfirmOpen(false);
  }
  
  const amount = form.watch('amount');
  const potentialProfit = amount * 0.87;
  const potentialLoss = amount;

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
                      <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                              <Input type="number" placeholder="$1,000" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                      <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Expiry</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                      <SelectItem value="1">1 minute</SelectItem>
                                      <SelectItem value="5">5 minutes</SelectItem>
                                      <SelectItem value="15">15 minutes</SelectItem>
                                  </SelectContent>
                              </Select>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                  </div>
                  <p className="text-xs text-muted-foreground">{((amount / (user?.balance || 1)) * 100).toFixed(1)}% of balance</p>
                  
                  <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Profit</span>
                          <span className="font-medium text-green-500">+${potentialProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (+87%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Loss</span>
                          <span className="font-medium text-red-500">-${potentialLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      </div>
                  </div>

                  <Separator />
                  
                  <div className="space-y-2">
                      <p className="text-sm font-medium">Templates</p>
                      <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm">Conservative</Button>
                          <Button variant="outline" size="sm">Balanced</Button>
                          <Button variant="outline" size="sm">Aggressive</Button>
                      </div>
                  </div>

                  <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                      <span className="text-sm text-muted-foreground">Next expiry in:</span>
                      <span className="font-mono text-lg font-semibold text-primary">00:{countdown.toString().padStart(2, '0')}</span>
                  </div>

              </form>
          </Form>
          <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg h-12" onClick={() => handleTrade('rise')}>
                  <ArrowUp className="mr-2 h-5 w-5"/>
                  RISE
              </Button>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg h-12" onClick={() => handleTrade('fall')}>
                  <ArrowDown className="mr-2 h-5 w-5"/>
                  FALL
              </Button>
          </div>
      </div>
    </>
  );
}
