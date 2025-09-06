

'use client';

import { AccountSummaryCard } from '@/components/dashboard/account-summary-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { SecurityOverview } from '@/components/dashboard/security-overview';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, KeyRound, LineChart, UserCheck, Wallet, Home } from 'lucide-react';
import { TradeChart } from '@/components/dashboard/trade/trade-chart';
import { TradePanel } from '@/components/dashboard/trade/trade-panel';

export default function TradingPage() {
  return (
    <div className="h-[calc(100vh-110px)] flex gap-4">
      <div className="w-3/4 h-full">
        <TradeChart />
      </div>
      <div className="w-1/4 h-full">
        <TradePanel />
      </div>
    </div>
  );
}
