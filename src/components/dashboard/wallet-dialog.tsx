'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { ADMIN_WALLET_ADDRESS } from "@/lib/constants";
import { useState } from "react";

const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be a positive number."),
});

interface WalletDialogProps {
  type: 'deposit' | 'withdraw';
  children: React.ReactNode;
}

export function WalletDialog({ type, children }: WalletDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    
    if (type === 'deposit') {
      updateBalance(user.balance + values.amount);
      toast({
        title: "Deposit successful",
        description: `$${values.amount.toFixed(2)} has been added to your account.`,
      });
    } else { // withdraw
      if (values.amount > user.balance) {
        toast({
          variant: "destructive",
          title: "Insufficient funds",
          description: "You cannot withdraw more than your current balance.",
        });
        return;
      }
      updateBalance(user.balance - values.amount);
      toast({
        title: "Withdrawal successful",
        description: `$${values.amount.toFixed(2)} has been deducted from your account.`,
      });
    }
    setOpen(false);
    form.reset();
  }

  const title = type === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds';
  const description = type === 'deposit' 
    ? "Transfer funds to the admin wallet to top up your account." 
    : "Enter the amount you wish to withdraw to your personal wallet.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {type === 'deposit' && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Admin Wallet</p>
                <div className="flex items-center justify-center p-4 bg-background rounded-lg">
                    <Image
                        src="https://placehold.co/200x200/ffffff/111827?text=QR+Code"
                        alt="Admin Wallet QR Code"
                        width={160}
                        height={160}
                        className="rounded-md"
                        data-ai-hint="qr code"
                    />
                </div>
                <Input readOnly value={ADMIN_WALLET_ADDRESS} className="text-center"/>
                 <FormDescription className="text-center">
                    Funds will be added to your account after you complete the transaction with your wallet.
                </FormDescription>
              </div>
            )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USD)</FormLabel>
                  <FormControl>
                    <Input type="number" step="1" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                {type === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdrawal'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
