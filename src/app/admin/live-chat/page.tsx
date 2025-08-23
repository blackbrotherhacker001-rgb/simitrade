
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function LiveChatPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Live chat content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
