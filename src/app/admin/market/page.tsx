
'use client';

import { MarketControl } from '@/components/admin/market-control';
import { MarketParameters } from '@/components/admin/market-parameters';

export default function MarketPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <MarketControl />
      <MarketParameters />
    </div>
  );
}
