
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

interface TradeConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  type: 'rise' | 'fall';
  amount: number;
  expiry: string;
  currentPrice: number;
  potentialProfit: number;
  potentialLoss: number;
  onConfirm: () => void;
}

export function TradeConfirmationDialog({
  isOpen,
  onOpenChange,
  type,
  amount,
  expiry,
  currentPrice,
  potentialProfit,
  potentialLoss,
  onConfirm,
}: TradeConfirmationDialogProps) {
  const [confirmCountdown, setConfirmCountdown] = useState(3);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfirmCountdown(3);
      const timer = setInterval(() => {
        setConfirmCountdown(prev => (prev > 1 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const getExpiryTime = useCallback(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + parseInt(expiry, 10));
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [expiry]);

  const isRise = type === 'rise';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border p-0">
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b">
          <DialogTitle>Confirm Trade</DialogTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center justify-center h-10 w-10 rounded-full",
                isRise ? "bg-green-600/20" : "bg-red-600/20"
              )}>
                {isRise ? <ArrowUp className="h-5 w-5 text-green-500" /> : <ArrowDown className="h-5 w-5 text-red-500" />}
              </div>
              <div>
                <p className="font-semibold">BTC/USD</p>
                <p className={cn("text-lg font-bold", isRise ? "text-green-500" : "text-red-500")}>
                  {isRise ? 'CALL (Up)' : 'PUT (Down)'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-lg font-bold">${amount.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm bg-muted/30 p-4 rounded-md">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entry Price:</span>
              <span className="font-medium">${currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expiry Time:</span>
              <span className="font-medium">{getExpiryTime()} ({expiry} min)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Potential Profit:</span>
              <span className="font-medium text-green-500">${potentialProfit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({((potentialProfit/amount)*100).toFixed(0)}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Potential Loss:</span>
              <span className="font-medium text-red-500">${potentialLoss.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (100%)</span>
            </div>
          </div>

          <div 
            className="flex justify-between items-center cursor-pointer text-sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="text-muted-foreground">{showDetails ? 'Hide' : 'Show'} details</span>
            {showDetails ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
          </div>

          {showDetails && (
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trade Type:</span>
                <span className="font-medium">Binary Option</span>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Risk/Reward Ratio:</span>
                <span className="font-medium">1:{(potentialProfit/amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Execution:</span>
                <span className="font-medium">Market</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fees:</span>
                <span className="font-medium">Included</span>
              </div>
            </div>
          )}

        </div>

        <DialogFooter className="p-4 border-t flex-row gap-2">
          <Button variant="secondary" className="w-full" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className={cn("w-full", isRise ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700")}
            onClick={onConfirm}
            disabled={confirmCountdown > 0}
          >
            Confirm {confirmCountdown > 0 ? `(${confirmCountdown}s)` : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
