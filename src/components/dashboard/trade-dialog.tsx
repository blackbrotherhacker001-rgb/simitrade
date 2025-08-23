'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import useMarketData from "@/hooks/use-market-data";
import { ArrowLeftRight, CandlestickChart, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive").optional(),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  symbol: z.string().default("BTC"),
});

type TradeType = 'buy' | 'sell';

export function TradeDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();
  const { currentPrice } = useMarketData('bullish');
  const [activeTab, setActiveTab] = useState<TradeType>('buy');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      symbol: "BTC",
    },
  });

  const handleAmountChange = (amount: number) => {
    form.setValue('amount', amount, { shouldValidate: true });
    if (currentPrice > 0) {
      form.setValue('quantity', amount / currentPrice, { shouldValidate: true });
    }
  };

  const handleQuantityChange = (quantity: number) => {
    form.setValue('quantity', quantity, { shouldValidate: true });
    form.setValue('amount', quantity * currentPrice, { shouldValidate: true });
  }

  const setAmountByPercentage = (percentage: number) => {
    if (!user) return;
    const amount = user.balance * (percentage / 100);
    handleAmountChange(amount);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    
    const totalCost = values.quantity * currentPrice;

    if (activeTab === 'buy') {
      if (user.balance < totalCost) {
        toast({
          variant: "destructive",
          title: "Insufficient funds",
          description: "You do not have enough balance to make this purchase.",
        });
        return;
      }
      updateBalance(user.balance - totalCost);
      toast({
        title: "Trade Successful!",
        description: `You have successfully bought ${values.quantity.toFixed(8)} BTC.`,
      });
    } else { // sell
      // Assuming user has the BTC to sell. In a real app, you'd check this.
      updateBalance(user.balance + totalCost);
      toast({
        title: "Trade Successful!",
        description: `You have successfully sold ${values.quantity.toFixed(8)} BTC.`,
      });
    }

    setOpen(false);
    form.reset();
  }
  
  const amount = form.watch('amount') || 0;
  const quantity = form.watch('quantity') || 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ArrowLeftRight className="mr-2 h-4 w-4" /> Trade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-primary"/>
                Trade BTC/USDT
              </DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TradeType)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 gap-2">
                <TabsTrigger value="buy" className={cn(
                  "flex items-center gap-2 border data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400 data-[state=active]:border-green-600",
                  activeTab !== 'buy' && 'border-border'
                )}>
                  <TrendingUp className="w-4 h-4"/> Buy
                </TabsTrigger>
                <TabsTrigger value="sell" className={cn(
                  "flex items-center gap-2 border data-[state=active]:bg-red-600/20 data-[state=active]:text-red-400 data-[state=active]:border-red-600",
                   activeTab !== 'sell' && 'border-border'
                )}>
                   <TrendingDown className="w-4 h-4"/> Sell
                </TabsTrigger>
              </TabsList>
            
              <div className="space-y-4 mt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span>${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Available</span>
                  <span>${user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (USDT)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="0.00" 
                          {...field}
                          onChange={(e) => handleAmountChange(parseFloat(e.target.value) || 0)}
                          value={amount}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity (BTC)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00000000" 
                          {...field}
                          onChange={(e) => handleQuantityChange(parseFloat(e.target.value) || 0)}
                          value={quantity.toFixed(8)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between gap-2">
                    {[25, 50, 75, 100].map(p => (
                        <Button key={p} type="button" variant="outline" size="sm" className="flex-1" onClick={() => setAmountByPercentage(p)}>
                            {p}%
                        </Button>
                    ))}
                </div>

              </div>
              <DialogFooter className="mt-6">
                <Button type="submit" className={cn("w-full", activeTab === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700')}>
                  {activeTab === 'buy' ? <TrendingUp className="mr-2 h-4 w-4"/> : <TrendingDown className="mr-2 h-4 w-4"/>}
                  {activeTab === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                </Button>
              </DialogFooter>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
