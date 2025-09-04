
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { TrendingDown, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const mockAssets = [
  { symbol: 'BTC', name: 'BTC/USDT', price: 109848.96, cap: '109.85B', change: -2.33, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg' },
  { symbol: 'SOL', name: 'SOL/USDT', price: 204.44, cap: '204.44M', change: -3.14, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg' },
  { symbol: 'XRP', name: 'XRP/USDT', price: 2.82, cap: '2.82M', change: -1.60, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xrp.svg' },
  { symbol: 'TRX', name: 'TRX/USDT', price: 0.3348, cap: '334.80K', change: -1.90, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/trx.svg' },
  { symbol: 'ADA', name: 'ADA/USDT', price: 0.8094, cap: '809.40K', change: -3.73, icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/ada.svg' },
];

export function MarketCard() {
    const [activeTab, setActiveTab] = useState('price');

  return (
    <Card className="bg-background/60 backdrop-blur-md border-border/50 shadow-2xl shadow-primary/10">
      <CardHeader>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Asset</span>
            <div className="flex gap-2">
                <span onClick={() => setActiveTab('price')} className={cn("cursor-pointer", activeTab === 'price' && "text-foreground font-semibold")}>Price</span>
                <span>/</span>
                <span onClick={() => setActiveTab('cap')} className={cn("cursor-pointer", activeTab === 'cap' && "text-foreground font-semibold")}>Cap</span>
            </div>
            <span>24h</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border/50">
          {mockAssets.map(asset => (
            <li key={asset.symbol} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <img src={asset.icon} alt={asset.symbol} className="h-8 w-8" />
                <div>
                  <p className="font-semibold">{asset.symbol}</p>
                  <p className="text-xs text-muted-foreground">{asset.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${asset.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">${asset.cap}</p>
              </div>
              <div className="w-20 text-right">
                <span className="text-red-500 font-semibold flex items-center justify-end">
                  {asset.change}%
                  <TrendingDown className="h-4 w-4 ml-1" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
       <CardFooter className="p-4">
        <Button variant="link" className="w-full text-primary">
          View All Markets
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
