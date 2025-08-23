'use client';

import { BalanceCard } from "@/components/dashboard/balance-card";
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview";
import { TradeChart } from "@/components/dashboard/trade-chart";
import { TransactionsHistory } from "@/components/dashboard/transactions-history";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-9">
          <TradeChart />
        </div>
        <div className="col-span-12 xl:col-span-3">
          <div className="flex flex-col gap-6">
            <BalanceCard />
            <PortfolioOverview />
          </div>
        </div>
        <div className="col-span-12">
          <TransactionsHistory />
        </div>
      </div>
    </div>
  );
}
