
'use client';

import Link from 'next/link';
import { AccountSummaryCard } from '@/components/dashboard/account-summary-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { SecurityOverview } from '@/components/dashboard/security-overview';
import { StatCard } from '@/components/dashboard/stat-card';
import { Shield, Calendar, Key, Activity, UserCheck, Wallet, ShieldCheck, TrendingUp, TrendingDown, ArrowRight, BookUser } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardOverviewPage() {
    const { user } = useAuth();
    if (!user) return null;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <AccountSummaryCard />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Security Score"
          value="50/100"
          description="Good"
          descriptionColor="text-yellow-400"
          icon={<Shield className="h-6 w-6 text-yellow-400" />}
          iconBg="bg-yellow-400/10"
          borderColor="border-yellow-400/50"
        />
        <StatCard
          title="Account Age"
          value="1 days"
          description="+100% Lifetime"
          descriptionColor="text-green-400"
          icon={<Calendar className="h-6 w-6 text-blue-400" />}
          iconBg="bg-blue-400/10"
          borderColor="border-blue-400/50"
        />
        <StatCard
          title="API Keys"
          value="0"
          description="No keys created"
          icon={<Key className="h-6 w-6 text-purple-400" />}
          iconBg="bg-purple-400/10"
          borderColor="border-purple-400/50"
        />
        <StatCard
          title="Login Activity"
          value="4"
          description="+33% vs last month"
          descriptionColor="text-green-400"
          icon={<Activity className="h-6 w-6 text-cyan-400" />}
          iconBg="bg-cyan-400/10"
          borderColor="border-cyan-400/50"
        />
        <StatCard
          title="KYC Level"
          value="0"
          description="Basic verification"
          icon={<UserCheck className="h-6 w-6 text-green-400" />}
          iconBg="bg-green-400/10"
          borderColor="border-green-400/50"
        />
        <Link href={`/user/${user.walletAddress}/wallet`}>
          <StatCard
            title="Wallet Status"
            value="Not Connected"
            description="Connect your wallet"
            icon={<Wallet className="h-6 w-6 text-orange-400" />}
            iconBg="bg-orange-400/10"
            borderColor="border-orange-400/50"
          />
        </Link>
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
