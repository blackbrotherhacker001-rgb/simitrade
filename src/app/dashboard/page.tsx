
'use client';

import { AccountSummaryCard } from '@/components/dashboard/account-summary-card';
import { RecentActivity }s from '@/components/dashboard/recent-activity';
import { SecurityOverview } from '@/components/dashboard/security-overview';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, KeyRound, LineChart, UserCheck, Wallet, Home } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Home className="h-4 w-4"/>
              <span>/</span>
              <span>Dashboard</span>
            </div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
        </div>

        <AccountSummaryCard />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
                title="Security Score"
                value="50/100"
                description="Good"
                icon={<Shield className="h-6 w-6 text-orange-400"/>}
                iconBg="bg-orange-400/10"
                borderColor="border-orange-400/20"
            />
            <StatCard 
                title="Account Age"
                value="1 days"
                description="+100% Lifetime"
                descriptionColor="text-green-500"
                icon={<Calendar className="h-6 w-6 text-blue-400"/>}
                iconBg="bg-blue-400/10"
                borderColor="border-blue-400/20"
            />
            <StatCard 
                title="API Keys"
                value="0"
                description="No keys created"
                icon={<KeyRound className="h-6 w-6 text-purple-400"/>}
                iconBg="bg-purple-400/10"
                borderColor="border-purple-400/20"
            />
            <StatCard 
                title="Login Activity"
                value="4"
                description="+33% vs last month"
                descriptionColor="text-green-500"
                icon={<LineChart className="h-6 w-6 text-indigo-400"/>}
                iconBg="bg-indigo-400/10"
                borderColor="border-indigo-400/20"
            />
            <StatCard 
                title="KYC Level"
                value="0"
                description="Basic verification"
                icon={<UserCheck className="h-6 w-6 text-green-400"/>}
                iconBg="bg-green-400/10"
                borderColor="border-green-400/20"
            />
            <StatCard 
                title="Wallet Status"
                value="Not Connected"
                description="Connect your wallet"
                icon={<Wallet className="h-6 w-6 text-yellow-400"/>}
                iconBg="bg-yellow-400/10"
                borderColor="border-yellow-400/20"
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
