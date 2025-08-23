
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function WalletPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Admin wallet content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
