
'use client';

import { AccountSummaryCard } from '@/components/dashboard/account-summary-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { SecurityOverview } from '@/components/dashboard/security-overview';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, KeyRound, LineChart, UserCheck, Wallet, Home } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4" />
                <span>/</span>
                <span>Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mt-1">Dashboard</h1>
        </div>
        <Button>Create Trade</Button>
      </div>
      
      <AccountSummaryCard />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Security Score"
            value="50/100"
            description="Good"
            descriptionColor="text-yellow-400"
            icon={<Shield />}
            iconBg="bg-yellow-400/20"
            borderColor="border-yellow-400"
        />
         <StatCard 
            title="Account Age"
            value="1 days"
            description="+100% 1st time"
            descriptionColor="text-green-500"
            icon={<Calendar />}
            iconBg="bg-green-500/20"
            borderColor="border-green-500"
        />
         <StatCard 
            title="Login Activity"
            value="4"
            description="-52% vs last month"
            descriptionColor="text-red-500"
            icon={<LineChart />}
            iconBg="bg-red-500/20"
            borderColor="border-red-500"
        />
         <StatCard 
            title="KYC Level"
            value="0"
            description="Basic verification"
            descriptionColor="text-blue-400"
            icon={<UserCheck />}
            iconBg="bg-blue-500/20"
            borderColor="border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <RecentActivity />
        </div>
        <div className="lg:col-span-1">
            <SecurityOverview />
        </div>
      </div>
    </div>
  );
}
