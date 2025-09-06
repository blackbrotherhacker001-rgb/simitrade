
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
import { Keyboard, ShieldCheck } from 'lucide-react';

interface TradeSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'keys' | 'risk';
}

const KeysContent = () => (
    <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
            Use keyboard shortcuts to trade even faster.
        </p>
        <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
                <span>Place RISE (Up) Trade</span>
                <div className="flex items-center gap-1">
                    <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">ALT</span>
                    </kbd>
                    <span className="text-muted-foreground">+</span>
                    <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">W</span>
                    </kbd>
                </div>
            </li>
            <li className="flex items-center justify-between">
                <span>Place FALL (Down) Trade</span>
                <div className="flex items-center gap-1">
                    <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">ALT</span>
                    </kbd>
                    <span className="text-muted-foreground">+</span>
                    <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        <span className="text-xs">S</span>
                    </kbd>
                </div>
            </li>
            <li className="flex items-center justify-between">
                <span>Increase Trade Amount</span>
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">↑</span>
                </kbd>
            </li>
            <li className="flex items-center justify-between">
                <span>Decrease Trade Amount</span>
                <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">↓</span>
                </kbd>
            </li>
        </ul>
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
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    {isRisk ? <ShieldCheck className="h-5 w-5" /> : <Keyboard className="h-5 w-5" />}
                    {isRisk ? 'Risk Management' : 'Hotkeys & Keys'}
                </DialogTitle>
                <DialogDescription>
                     {isRisk ? 'Set your risk parameters for automated trading.' : 'Manage your keyboard shortcuts for trading.'}
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                {isRisk ? <RiskContent /> : <KeysContent />}
            </div>
            <DialogFooter>
                <Button variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}
