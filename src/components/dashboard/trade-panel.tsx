
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
import { ArrowUp, ArrowDown, Clock } from "lucide-react";
import { Separator } from "../ui/separator";

const tradeSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  expiry: z.string().min(1, "Expiry is required"),
});

type TradeFormValues = z.infer<typeof tradeSchema>;

export function TradePanel() {
  const [countdown, setCountdown] = useState(54);
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();
  
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
      updateBalance(user.balance - values.amount);
      toast({
          title: `Trade Placed: ${type.toUpperCase()}`,
          description: `$${values.amount} on BTC to ${type} in ${values.expiry} minute(s).`
      })
  }
  
  const amount = form.watch('amount');
  const potentialProfit = amount * 0.87;
  const potentialLoss = amount;

  return (
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
  );
}
