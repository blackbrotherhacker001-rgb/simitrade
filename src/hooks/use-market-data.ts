'use client';

import { useState, useEffect, useRef } from 'react';

type MarketTrend = 'bullish' | 'bearish' | 'sideways' | 'volatile';

const generateInitialData = (count = 50) => {
  const data = [];
  let price = 65000;
  const now = new Date();
  for (let i = count-1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fluctuation = (Math.random() - 0.5) * 500;
    price += fluctuation;
    data.push({ time, price });
  }
  return data;
};


export default function useMarketData(initialTrend: MarketTrend) {
  const [data, setData] = useState(generateInitialData());
  const [currentPrice, setCurrentPrice] = useState(data[data.length - 1]?.price || 65000);
  const trendRef = useRef(initialTrend);
  
  const setTrend = (newTrend: MarketTrend) => {
    trendRef.current = newTrend;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const lastPrice = prevData.length > 0 ? prevData[prevData.length - 1].price : 65000;
        let change = 0;
        const trend = trendRef.current;

        switch (trend) {
          case 'bullish':
            change = (Math.random() * 200) + 50; // Mostly positive
            break;
          case 'bearish':
            change = (Math.random() * -200) - 50; // Mostly negative
            break;
          case 'sideways':
            change = (Math.random() - 0.5) * 100; // Small fluctuations
            break;
          case 'volatile':
            change = (Math.random() - 0.5) * 1000; // Large fluctuations
            break;
        }

        const newPrice = Math.max(0, lastPrice + change);
        const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setCurrentPrice(newPrice);
        
        const newDataPoint = { time: newTime, price: newPrice };
        const updatedData = [...prevData.slice(1), newDataPoint];
        return updatedData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { data, currentPrice, setTrend };
}
