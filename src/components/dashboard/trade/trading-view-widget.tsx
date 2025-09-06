
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
      
      if (container.current) {
        // Clear previous widget script if it exists
        while (container.current.firstChild) {
            container.current.removeChild(container.current.firstChild);
        }
        container.current.appendChild(script);
      }

      return () => {
        if (container.current) {
            while (container.current.firstChild) {
                container.current.removeChild(container.current.firstChild);
            }
        }
      };
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div id="tradingview-widget-container-script" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}
