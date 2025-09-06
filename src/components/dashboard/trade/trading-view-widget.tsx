
'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const symbolMapping: { [key: string]: string } = {
  '/user/trade': 'COINBASE:BTCUSD',
  '/dashboard/binary-trading': 'COINBASE:BTCUSD',
  '/dashboard/forex': 'FX:EURUSD',
};

export function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const symbol = symbolMapping[pathname] || 'COINBASE:BTCUSD';

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
          "interval": "60",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "withdateranges": false,
          "hide_side_toolbar": false,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "container_id": "tradingview-widget-container-script"
        }`;
      
      const currentContainer = container.current;
      if (currentContainer) {
        // Clear previous widget script if it exists
        while (currentContainer.firstChild) {
            currentContainer.removeChild(currentContainer.firstChild);
        }
        currentContainer.appendChild(script);
      }

      return () => {
        if (currentContainer) {
            while (currentContainer.firstChild) {
                currentContainer.removeChild(currentContainer.firstChild);
            }
        }
      };
    },
    [symbol]
  );

  return (
    <div className="tradingview-widget-container h-full w-full" ref={container}>
      <div id="tradingview-widget-container-script" className="h-full w-full"></div>
    </div>
  );
}
