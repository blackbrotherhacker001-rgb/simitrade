
'use client';

import { TradeChart } from '@/components/dashboard/trade/trade-chart';
import { TradePanel } from '@/components/dashboard/trade/trade-panel';

export default function TradePage() {
  return (
    <div className="flex h-[calc(100vh-120px)] w-full">
      <div className="flex-1">
        <TradeChart />
      </div>
      <div className="w-80 flex-shrink-0 border-l border-border/60">
        <TradePanel />
      </div>
    </div>
  );
}
