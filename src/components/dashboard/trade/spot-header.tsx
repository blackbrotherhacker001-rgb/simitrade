
'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SpotHeader() {
  const router = useRouter();
  return (
    <div className="h-16 flex-shrink-0 flex items-center px-4 border-b border-[#1f2937]">
      <div className="ml-4">
        <h2 className="text-xl font-bold">BTC/USDT <span className="text-sm font-normal text-muted-foreground">Spot</span></h2>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="text-right">
            <p className="text-xl font-semibold text-green-500">110,855.99</p>
            <p className="text-xs text-muted-foreground">-0.46%</p>
        </div>
        <div className="text-sm">
            <p className="text-muted-foreground">24h Vol</p>
            <p>2324.0M</p>
        </div>
      </div>
    </div>
  );
}
