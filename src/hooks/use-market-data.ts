
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type MarketTrend = 'bullish' | 'bearish' | 'sideways' | 'volatile';

// Set a more realistic starting price for BTC
const REALISTIC_STARTING_PRICE = 68500;

const generateInitialData = (count = 50) => {
  const data = [];
  let price = REALISTIC_STARTING_PRICE;
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    // Start with smaller fluctuations for the initial historical data
    const fluctuation = (Math.random() - 0.5) * 300;
    price += fluctuation;
    data.push({ time, price });
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

        // Make fluctuations more dynamic and realistic
        switch (currentTrend) {
          case 'bullish':
            change = Math.random() * 250 + (Math.random() > 0.2 ? 10 : -50); // Strong upward moves with pullbacks
            break;
          case 'bearish':
            change = Math.random() * -250 - (Math.random() > 0.2 ? 10 : -50); // Strong downward moves with bounces
            break;
          case 'sideways':
            change = (Math.random() - 0.5) * 150; // Tighter range for sideways movement
            break;
          case 'volatile':
            change = (Math.random() - 0.5) * 1200; // Wider swings for volatility
            break;
        }

        const newPrice = Math.max(0, lastPrice + change);
        const newTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        setCurrentPrice(newPrice);

        const newDataPoint = { time: newTime, price: newPrice };
        const updatedData = [...prevData.slice(1), newDataPoint];
        return updatedData;
      });
    }, 2000); // Interval remains 2 seconds for frequent updates

    return () => clearInterval(interval);
  }, []);

  return { data, currentPrice };
}
