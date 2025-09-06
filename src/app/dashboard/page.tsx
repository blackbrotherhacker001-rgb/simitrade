
'use client';

import { TradeChart } from '@/components/dashboard/trade/trade-chart';
import { TradePanel } from '@/components/dashboard/trade/trade-panel';

export default function TradingPage() {
  return (
    <div className="h-[calc(100vh-65px)] grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-1 bg-background text-foreground">
      <div className="border-r border-border flex flex-col">
        <TradeChart />
      </div>
      <div className="border-l border-border overflow-y-auto">
        <TradePanel />
      </div>
    </div>
  );
}
