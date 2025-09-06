
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { ArrowUp, ArrowDown, ChevronUp, ChevronDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

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
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            handleConfirm();
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);
  
  const handleConfirm = () => {
    if (!user || !trade) return;

    const isWin = Math.random() > 0.4; // 60% chance to win
    const payout = trade.amount * 0.80; // 80% payout
    
    // The timeout should be based on the trade expiry
    const confirmationTimeout = setTimeout(() => {
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
    }, trade.expiry * 1000);

    // Give immediate feedback
    toast({
        title: "Trade Placed",
        description: `Your ${trade.type} trade for $${trade.amount} has been placed.`
    });

    onOpenChange(false);
  };
  
  const handleCancel = () => {
      onOpenChange(false);
      toast({
          title: "Trade Cancelled",
          description: "Your trade has been cancelled.",
          variant: 'default',
      })
  }
  
  if (!trade) return null;

  const expiryDate = new Date(Date.now() + trade.expiry * 1000);
  const expiryTime = expiryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true});
  const expiryMinutes = Math.round(trade.expiry / 60);

  const potentialProfit = trade.amount * 0.80;
  const potentialLoss = trade.amount;
  const profitPercentage = 80;
  const lossPercentage = 100;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#1F2328] border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-lg">Confirm Trade</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "flex items-center justify-center h-8 w-8 rounded-full",
                        trade.type === 'RISE' ? 'bg-green-500/20' : 'bg-red-500/20'
                    )}>
                        {trade.type === 'RISE' ? <ArrowUp className="h-5 w-5 text-green-500"/> : <ArrowDown className="h-5 w-5 text-red-500"/>}
                    </div>
                    <div>
                        <p className="font-semibold text-white">BTC/USD</p>
                        <p className="text-sm text-muted-foreground">{trade.type === 'RISE' ? 'CALL (Up)' : 'PUT (Down)'}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-semibold text-white">${trade.amount.toLocaleString()}</p>
                </div>
            </div>
            
            <div className="bg-card/30 border-y border-gray-700 px-4 py-4 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Entry Price:</span>
                    <span className="text-white font-mono">$69,221.08</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expiry Time:</span>
                    <span className="text-white">{expiryTime} ({expiryMinutes} min)</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential Profit:</span>
                    <span className="text-green-500 font-semibold">${potentialProfit.toFixed(2)} ({profitPercentage}%)</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Potential Loss:</span>
                    <span className="text-red-500 font-semibold">${potentialLoss.toFixed(2)} ({lossPercentage}%)</span>
                </div>
            </div>

            <div 
                className="flex justify-between items-center cursor-pointer px-4 text-sm text-muted-foreground hover:text-white"
                onClick={() => setIsDetailsVisible(!isDetailsVisible)}
            >
                <span>{isDetailsVisible ? 'Hide details' : 'Show details'}</span>
                {isDetailsVisible ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
            </div>

            {isDetailsVisible && (
                 <div className="px-4 space-y-3 pt-2">
                    <Separator className="bg-gray-700"/>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Trade Type:</span>
                        <span className="text-white">Binary Option</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Risk/Reward Ratio:</span>
                        <span className="text-white">1:0.80</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Execution:</span>
                        <span className="text-white">Market</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fees:</span>
                        <span className="text-white">Included</span>
                    </div>
                 </div>
            )}
        </div>
        <DialogFooter className="grid grid-cols-2 gap-2 pt-4">
          <Button variant="secondary" onClick={handleCancel} className="bg-gray-600 hover:bg-gray-700 text-white border-none">
            <X className="mr-2 h-4 w-4"/>
            Cancel
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white border-none"
            onClick={handleConfirm}
          >
             <Check className="mr-2 h-4 w-4"/>
            Confirm ({countdown}s)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
