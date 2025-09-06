
'use client';

import { TradingViewWidget } from '@/components/dashboard/trade/trading-view-widget';
import { TradePanel } from '@/components/dashboard/trade/trade-panel';

export default function BinaryTradingPage() {
  return (
    <div className="relative h-full w-full">
      <TradingViewWidget />
      <div className="absolute top-0 right-0 h-full w-80">
        <TradePanel />
      </div>
    </div>
  );
}
