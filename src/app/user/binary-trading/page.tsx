
'use client';

import { TradingViewWidget } from '@/components/dashboard/trade/trading-view-widget';
import { TradePanel } from '@/components/dashboard/trade/trade-panel';

export default function BinaryTradingPage() {
  return (
      <div className="flex flex-1 overflow-hidden h-full">
        <div className="flex flex-col flex-1">
          <div className="flex-grow h-full">
            <TradingViewWidget />
          </div>
        </div>
        <div className="w-[380px] flex-shrink-0 border-l border-[#1f2937]">
            <TradePanel />
        </div>
      </div>
  );
}
