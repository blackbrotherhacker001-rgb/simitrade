
'use client';

import { TradingViewWidget } from '@/components/dashboard/trade/trading-view-widget';
import { TradePanel } from '@/components/dashboard/trade/trade-panel';

export default function TradePage() {
  return (
    <div className="flex h-[calc(100vh-120px)] w-full">
      <div className="flex-1">
        <TradingViewWidget />
      </div>
      <div className="w-80 flex-shrink-0 border-l border-border/60">
        <TradePanel />
      </div>
    </div>
  );
}
