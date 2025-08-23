
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function MonitorPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>System Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <p>System monitoring content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
