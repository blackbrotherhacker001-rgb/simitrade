'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export function MarketParameters() {
  const [volatility, setVolatility] = useState(50);
  const [updateSpeed, setUpdateSpeed] = useState(30);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="volatility" className="flex justify-between">
            <span>Volatility: {volatility}%</span>
            <span className="text-muted-foreground">Controls how much prices fluctuate</span>
          </Label>
          <Slider
            id="volatility"
            defaultValue={[volatility]}
            onValueChange={(value) => setVolatility(value[0])}
            max={100}
            step={1}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="update-speed" className="flex justify-between">
            <span>Update Speed: {updateSpeed}%</span>
            <span className="text-muted-foreground">How frequently new market data is generated</span>
          </Label>
          <Slider
            id="update-speed"
            defaultValue={[updateSpeed]}
            onValueChange={(value) => setUpdateSpeed(value[0])}
            max={100}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
