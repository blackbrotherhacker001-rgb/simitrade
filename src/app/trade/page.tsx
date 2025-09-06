
'use client';

import { TradingViewWidget } from '@/components/dashboard/trade/trading-view-widget';
import { SpotMarketList } from '@/components/dashboard/trade/spot-market-list';
import { SpotTradePanel } from '@/components/dashboard/trade/spot-trade-panel';
import { OrderBook } from '@/components/dashboard/trade/order-book';
import { RecentTrades } from '@/components/dashboard/trade/recent-trades';
import { SpotHeader } from '@/components/dashboard/trade/spot-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TradePage() {
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <SpotMarketList />
      <div className="flex flex-col flex-1 border-l border-r border-[#1f2937]">
        <SpotHeader />
        <div className="flex-grow h-[calc(100%-300px)]">
          <TradingViewWidget />
        </div>
        <div className="flex-grow h-[300px] border-t border-[#1f2937]">
           <Tabs defaultValue="order-book" className="h-full flex flex-col">
              <TabsList className="bg-transparent px-4 border-b border-[#1f2937] justify-start rounded-none">
                  <TabsTrigger value="order-book" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Order Book</TabsTrigger>
                  <TabsTrigger value="recent-trades" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Recent Trades</TabsTrigger>
              </TabsList>
              <TabsContent value="order-book" className="flex-grow overflow-y-auto">
                  <OrderBook />
              </TabsContent>
              <TabsContent value="recent-trades" className="flex-grow overflow-y-auto">
                  <RecentTrades />
              </TabsContent>
          </Tabs>
        </div>
      </div>
      <SpotTradePanel />
    </div>
  );
}
