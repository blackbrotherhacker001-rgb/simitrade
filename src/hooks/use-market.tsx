
'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { SpotMarket } from '@/types';

export const markets: SpotMarket[] = [
    {
        symbol: 'BTC',
        pair: 'BTC/USDT',
        price: 110817.01,
        change: -1.91,
        volume: 2000000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg',
    },
    {
        symbol: 'ETH',
        pair: 'ETH/USDT',
        price: 5241.64,
        change: 1.03,
        volume: 850000000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg',
    },
    {
        symbol: 'SOL',
        pair: 'SOL/USDT',
        price: 203.06,
        change: -2.34,
        volume: 719440000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg',
    },
    {
        symbol: 'XRP',
        pair: 'XRP/USDT',
        price: 2.8624,
        change: -0.64,
        volume: 287240000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/xrp.svg',
    },
    {
        symbol: 'TRX',
        pair: 'TRX/USDT',
        price: 0.3317,
        change: -1.83,
        volume: 114300000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/trx.svg',
    },
    {
        symbol: 'SUI',
        pair: 'SUI/USDT',
        price: 3.378,
        change: -0.52,
        volume: 106290000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sui.svg',
    },
    {
        symbol: 'ADA',
        pair: 'ADA/USDT',
        price: 0.8252,
        change: -0.59,
        volume: 98310000,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/ada.svg',
    },
];


interface MarketContextType {
  market: SpotMarket;
  setMarket: (market: SpotMarket) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<SpotMarket>(markets[0]);

  return (
    <MarketContext.Provider value={{ market, setMarket }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
