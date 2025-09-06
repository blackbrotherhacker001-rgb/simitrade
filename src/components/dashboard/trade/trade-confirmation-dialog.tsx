
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { ArrowUp, ArrowDown, Timer, Target, DollarSign, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface TradeConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trade: {
    type: 'RISE' | 'FALL';
    amount: number;
    expiry: number;
  } | null;
}

export function TradeConfirmationDialog({ isOpen, onOpenChange, trade }: TradeConfirmationDialogProps) {
  const [countdown, setCountdown] = useState(3);
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && trade && !isConfirming) {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleConfirm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, trade, isConfirming]);

  if (!trade) return null;
  
  const handleConfirm = () => {
    if (!user) return;
    setIsConfirming(true);

    const isWin = Math.random() > 0.4; // 60% chance to win
    const payout = trade.amount * 0.85; // 85% payout
    
    setTimeout(() => {
        if (isWin) {
            updateBalance(user.balance + payout);
            toast({
                title: 'Trade Won!',
                description: `Congratulations! You won a payout of $${payout.toFixed(2)}.`,
            });
        } else {
            updateBalance(user.balance - trade.amount);
            toast({
                variant: 'destructive',
                title: 'Trade Lost',
                description: `You lost your investment of $${trade.amount.toFixed(2)}. Better luck next time!`,
            });
        }
        onOpenChange(false);
        setIsConfirming(false);
    }, trade.expiry * 1000);
  };
  
  const handleCancel = () => {
      onOpenChange(false);
      setIsConfirming(false);
      toast({
          title: "Trade Cancelled",
          description: "Your trade has been cancelled.",
          variant: 'default',
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Confirm Trade</DialogTitle>
          <DialogDescription className="text-center">
            You are about to place a trade.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
            <div className={cn(
                "flex justify-center items-center gap-4 text-3xl font-bold",
                trade.type === 'RISE' ? 'text-green-500' : 'text-red-500'
            )}>
                {trade.type === 'RISE' ? <ArrowUp /> : <ArrowDown />}
                <span>{trade.type}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><DollarSign className="h-4 w-4"/> Amount</p>
                    <p className="text-lg font-semibold">${trade.amount.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Timer className="h-4 w-4"/> Expiry</p>
                    <p className="text-lg font-semibold">{trade.expiry} seconds</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><Target className="h-4 w-4"/> Payout</p>
                    <p className="text-lg font-semibold">${(trade.amount * 1.85).toLocaleString()}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1"><DollarSign className="h-4 w-4"/> Profit</p>
                    <p className="text-lg font-semibold">${(trade.amount * 0.85).toLocaleString()}</p>
                </div>
            </div>
            <div className="space-y-2">
                <Progress value={(countdown / 3) * 100} className="h-2" />
                <p className="text-center text-sm text-muted-foreground">
                    Confirming in {countdown}s...
                </p>
            </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4"/>
            Cancel
          </Button>
          <Button 
            className={cn(trade.type === 'RISE' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700', "text-white")}
            onClick={handleConfirm}
          >
             <Check className="mr-2 h-4 w-4"/>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
