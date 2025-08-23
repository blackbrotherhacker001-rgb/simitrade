
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
