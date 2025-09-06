
'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMarket } from '@/hooks/use-market';
import { cn } from '@/lib/utils';

export function SpotHeader() {
  const router = useRouter();
  const { market } = useMarket();

  const formatVolume = (vol: number) => {
    if (vol >= 1e9) return `${(vol / 1e9).toFixed(1)}B`;
    if (vol >= 1e6) return `${(vol / 1e6).toFixed(1)}M`;
    if (vol >= 1e3) return `${(vol / 1e3).toFixed(1)}K`;
    return vol.toString();
  }

  return (
    <div className="h-16 flex-shrink-0 flex items-center px-4 border-b border-[#1f2937]">
      <div className="ml-4">
        <h2 className="text-xl font-bold">{market.pair} <span className="text-sm font-normal text-muted-foreground">Spot</span></h2>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="text-right">
            <p className={cn("text-xl font-semibold", market.change >=0 ? 'text-green-500' : 'text-red-500')}>{market.price.toLocaleString()}</p>
            <p className={cn("text-xs", market.change >=0 ? 'text-green-500' : 'text-red-500')}>{market.change.toFixed(2)}%</p>
        </div>
        <div className="text-sm">
            <p className="text-muted-foreground">24h Vol</p>
            <p>{formatVolume(market.volume)}</p>
        </div>
      </div>
    </div>
  );
}
