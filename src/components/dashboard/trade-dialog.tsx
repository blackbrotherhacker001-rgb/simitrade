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
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  quantity: z.coerce.number().positive("Quantity must be positive"),
  symbol: z.string().default("BTC"),
});

type TradeType = 'buy' | 'sell';

export function TradeDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();
  const { currentPrice } = useMarketData('bullish');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      symbol: "BTC",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>, tradeType: TradeType) {
    if (!user) return;
    
    const totalCost = values.quantity * currentPrice;

    if (tradeType === 'buy') {
      if (user.balance < totalCost) {
        toast({
          variant: "destructive",
          title: "Insufficient funds",
          description: "You do not have enough balance to make this purchase.",
        });
        return;
      }
      updateBalance(user.balance - totalCost);
    } else {
      updateBalance(user.balance + totalCost);
    }

    toast({
      title: "Trade Successful!",
      description: `You have successfully ${tradeType === 'buy' ? 'bought' : 'sold'} ${values.quantity} ${values.symbol}.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ArrowLeftRight className="mr-2 h-4 w-4" /> Trade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <Tabs defaultValue="buy" className="w-full">
            <DialogHeader>
              <DialogTitle>Place a Trade</DialogTitle>
              <DialogDescription>
                Buy or sell assets. The price is updated in real-time.
              </DialogDescription>
            </DialogHeader>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>
            <div className="p-1">
                <div className="mt-4 p-2 rounded-lg bg-muted flex justify-between items-center">
                    <span className="text-muted-foreground">Live Price (BTC)</span>
                    <span className="font-bold text-lg text-primary">${currentPrice.toFixed(2)}</span>
                </div>
            </div>

            <TabsContent value="buy">
              <form onSubmit={form.handleSubmit((values) => onSubmit(values, 'buy'))} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.001" placeholder="0.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormDescription>
                    Total Cost: ${(form.watch('quantity') * currentPrice).toFixed(2)}
                </FormDescription>
                <DialogFooter>
                  <Button type="submit" className="w-full">Buy BTC</Button>
                </DialogFooter>
              </form>
            </TabsContent>

            <TabsContent value="sell">
               <form onSubmit={form.handleSubmit((values) => onSubmit(values, 'sell'))} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.001" placeholder="0.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormDescription>
                    Total Value: ${(form.watch('quantity') * currentPrice).toFixed(2)}
                </FormDescription>
                <DialogFooter>
                  <Button type="submit" variant="destructive" className="w-full">Sell BTC</Button>
                </DialogFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
