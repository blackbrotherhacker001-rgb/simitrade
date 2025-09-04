
'use client';

import { OrderBook } from '@/components/dashboard/spot/order-book';
import { SpotMarketList } from '@/components/dashboard/spot/spot-market-list';
import { SpotTradeChart } from '@/components/dashboard/spot/spot-trade-chart';
import { SpotTradePanel } from '@/components/dashboard/spot/spot-trade-panel';

export default function SpotTradingPage() {
  return (
    <div className="h-[calc(100vh-65px)] grid grid-cols-[280px_1fr_320px] grid-rows-[1fr_auto] gap-1 bg-background text-foreground">
      <div className="row-span-2 border-r border-border overflow-y-auto">
        <SpotMarketList />
      </div>
      <div className="border-r border-border flex flex-col">
        <SpotTradeChart />
      </div>
      <div className="row-span-2 border-l border-border overflow-y-auto">
        <SpotTradePanel />
      </div>
      <div className="border-r border-t border-border overflow-y-auto">
        <OrderBook />
      </div>
    </div>
  );
}
