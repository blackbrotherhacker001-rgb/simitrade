
'use client';

import React, { useEffect, useRef } from 'react';

export function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "COINBASE:BTCUSD",
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
    []
  );

  return (
    <div className="tradingview-widget-container h-full w-full" ref={container}>
      <div id="tradingview-widget-container-script" className="h-full w-full"></div>
    </div>
  );
}
