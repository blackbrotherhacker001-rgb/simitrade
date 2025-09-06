
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Keyboard, ShieldCheck, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface TradeSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'keys' | 'risk';
}

const ShortcutCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      'bg-card/50 rounded-lg p-3 flex flex-col items-center justify-center text-center transition-transform duration-200 hover:scale-105 hover:shadow-lg',
      className
    )}
  >
    {children}
  </div>
);

const KeysContent = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <ShortcutCard>
        <div className="bg-green-500 text-white rounded-md h-10 w-10 flex items-center justify-center font-bold text-xl mb-2">
          C
        </div>
        <p className="font-semibold">Place CALL order</p>
        <p className="text-xs text-muted-foreground">Buy when price will rise</p>
      </ShortcutCard>
      <ShortcutCard>
        <div className="bg-red-500 text-white rounded-md h-10 w-10 flex items-center justify-center font-bold text-xl mb-2">
          P
        </div>
        <p className="font-semibold">Place PUT order</p>
        <p className="text-xs text-muted-foreground">Sell when price will fall</p>
      </ShortcutCard>
    </div>

    <div>
      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        Amount Control
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <ShortcutCard>
          <div className="bg-card rounded-md h-8 w-8 flex items-center justify-center mb-2">
            <ArrowUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="font-semibold">Increase amount</p>
          <p className="text-xs text-muted-foreground">Arrow Up</p>
        </ShortcutCard>
        <ShortcutCard>
          <div className="bg-card rounded-md h-8 w-8 flex items-center justify-center mb-2">
            <ArrowDown className="h-5 w-5 text-red-500" />
          </div>
          <p className="font-semibold">Decrease amount</p>
          <p className="text-xs text-muted-foreground">Arrow Down</p>
        </ShortcutCard>
      </div>
    </div>
    
     <div>
      <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        Quick Amount
      </h3>
      <div className="grid grid-cols-4 gap-3">
        <ShortcutCard>
            <p className="font-bold text-lg">1</p>
            <p className="text-xs text-muted-foreground">$100</p>
        </ShortcutCard>
         <ShortcutCard>
            <p className="font-bold text-lg">2</p>
            <p className="text-xs text-muted-foreground">$500</p>
        </ShortcutCard>
         <ShortcutCard>
            <p className="font-bold text-lg">3</p>
            <p className="text-xs text-muted-foreground">$1000</p>
        </ShortcutCard>
         <ShortcutCard>
            <p className="font-bold text-lg">4</p>
            <p className="text-xs text-muted-foreground">$2000</p>
        </ShortcutCard>
      </div>
    </div>
  </div>
);

const RiskContent = () => {
    const [stopLoss, setStopLoss] = useState(25);
    const [takeProfit, setTakeProfit] = useState(50);
    const [useTrailingStop, setUseTrailingStop] = useState(false);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="stop-loss">Stop Loss (%)</Label>
                <p className="text-xs text-muted-foreground">Automatically close trade if loss exceeds this percentage.</p>
                <Input id="stop-loss" type="number" value={stopLoss} onChange={(e) => setStopLoss(parseInt(e.target.value))} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="take-profit">Take Profit (%)</Label>
                <p className="text-xs text-muted-foreground">Automatically close trade if profit exceeds this percentage.</p>
                <Input id="take-profit" type="number" value={takeProfit} onChange={(e) => setTakeProfit(parseInt(e.target.value))} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <Label>Trailing Stop</Label>
                    <p className="text-xs text-muted-foreground">
                        Adjusts the stop-loss price as the market moves in your favor.
                    </p>
                </div>
                <Switch checked={useTrailingStop} onCheckedChange={setUseTrailingStop} />
            </div>
        </div>
    )
};


export function TradeSettingsDialog({ isOpen, onOpenChange, type }: TradeSettingsDialogProps) {
    const { toast } = useToast();

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved",
            description: `Your ${type === 'keys' ? 'hotkey' : 'risk management'} settings have been updated.`
        });
        onOpenChange(false);
    }
  
    const isRisk = type === 'risk';

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-[#1F2328] border-gray-700">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    {isRisk ? <ShieldCheck className="h-5 w-5" /> : <Keyboard className="h-5 w-5" />}
                    {isRisk ? 'Risk Management' : 'Keyboard Shortcuts'}
                </DialogTitle>
            </DialogHeader>
            <div className="py-4">
                {isRisk ? <RiskContent /> : <KeysContent />}
            </div>
            <DialogFooter className="border-t border-border/20 pt-4">
               {isRisk ? (
                <div className="w-full flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
               ) : (
                <p className="text-sm text-muted-foreground text-center w-full">
                    Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">K</kbd> anytime to show this panel or <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Esc</kbd> to close it
                </p>
               )}
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}
