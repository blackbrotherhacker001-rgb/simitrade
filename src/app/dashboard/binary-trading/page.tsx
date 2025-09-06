
'use client';

import { TradingViewWidget } from '@/components/dashboard/trade/trading-view-widget';
import { TradePanel } from '@/components/dashboard/trade/trade-panel';

export default function BinaryTradingPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col h-full">
            <div className="flex-grow h-[calc(100%-4rem)]">
                <TradingViewWidget />
            </div>
             <div className="h-16 flex-shrink-0 border-t border-border/60">
                {/* Could be a footer for open trades */}
            </div>
        </div>
        <div className="w-80 flex-shrink-0 border-l border-border/60">
            <TradePanel />
        </div>
    </div>
  );
}
