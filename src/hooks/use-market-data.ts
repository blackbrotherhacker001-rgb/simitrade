
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

type MarketTrend = 'bullish' | 'bearish' | 'sideways' | 'volatile';

const REALISTIC_STARTING_PRICE = 109562.00;

const generateInitialData = (count = 100) => {
  const data = [];
  let price = REALISTIC_STARTING_PRICE;
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    // Start with smaller fluctuations for the initial historical data
    const fluctuation = (Math.random() - 0.5) * 200;
    price += fluctuation;
    data.push({ time, price: parseFloat(price.toFixed(2)) });
  }
  return data;
};

export default function useMarketData(trend: MarketTrend) {
  const [data, setData] = useState(generateInitialData());
  const [currentPrice, setCurrentPrice] = useState(
    data[data.length - 1]?.price || REALISTIC_STARTING_PRICE
  );
  
  const trendRef = useRef(trend);
  useEffect(() => {
      trendRef.current = trend;
  }, [trend])

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const lastPrice =
          prevData.length > 0
            ? prevData[prevData.length - 1].price
            : REALISTIC_STARTING_PRICE;
            
        let change = 0;
        const currentTrend = trendRef.current;

        const volatilityFactor = {
            bullish: 0.0005,
            bearish: 0.0005,
            sideways: 0.0002,
            volatile: 0.0015,
        };

        const trendFactor = {
            bullish: 0.0001,
            bearish: -0.0001,
            sideways: 0,
            volatile: 0,
        };
        
        const noise = (Math.random() - 0.5) * volatilityFactor[currentTrend];
        const trendMovement = trendFactor[currentTrend];
        change = (noise + trendMovement) * lastPrice;

        const newPrice = Math.max(0, lastPrice + change);
        const newTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        setCurrentPrice(parseFloat(newPrice.toFixed(2)));

        const newDataPoint = { time: newTime, price: parseFloat(newPrice.toFixed(2)) };
        const updatedData = [...prevData.slice(1), newDataPoint];
        return updatedData;
      });
    }, 1500); // Update every 1.5 seconds for a more active feel

    return () => clearInterval(interval);
  }, []);

  const ohlc = useMemo(() => {
    if (data.length === 0) {
        return { open: 0, high: 0, low: 0, close: 0 };
    }
    const prices = data.map(d => d.price);
    return {
        open: data[0].price,
        high: Math.max(...prices),
        low: Math.min(...prices),
        close: data[data.length-1].price,
    }
  }, [data])

  return { data, currentPrice, ohlc };
}
