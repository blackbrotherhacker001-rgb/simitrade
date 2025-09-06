
'use client';

import { BalanceCard } from '@/components/dashboard/balance-card';
import { PortfolioOverview } from '@/components/dashboard/portfolio-overview';
import { TransactionsHistory } from '@/components/dashboard/transactions-history';

export default function WalletPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view your transaction history.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <BalanceCard />
            <PortfolioOverview />
          </div>
        </div>
        <div className="lg:col-span-2">
          <TransactionsHistory />
        </div>
      </div>
    </div>
  );
}
