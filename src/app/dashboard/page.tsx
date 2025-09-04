
'use client';

import { TradeChart } from "@/components/dashboard/trade-chart";
import { TradePanel } from "@/components/dashboard/trade-panel";
import { LandingHeader } from "@/components/landing/landing-header";


export default function DashboardPage() {
  return (
    <>
    <LandingHeader />
    <div className="flex flex-col md:flex-row h-[calc(100vh-65px)]">
      <div className="flex-grow h-full">
        <TradeChart />
      </div>
      <div className="w-full md:w-[320px] md:border-l border-t md:border-t-0 border-border bg-card">
        <TradePanel />
      </div>
    </div>
    </>
  );
}
