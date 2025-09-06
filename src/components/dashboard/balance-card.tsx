
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { WalletDialog } from './wallet-dialog';

export function BalanceCard() {
  const { user } = useAuth();

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(balance);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Balance</CardTitle>
        <CardDescription>Manage your funds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-4">
          {user ? formatBalance(user.balance) : '$0.00'}
        </div>
        <div className="flex gap-2">
          <WalletDialog type="deposit">
            <Button className="w-full" variant="outline">
              <ArrowDownLeft className="mr-2 h-4 w-4 text-green-500" />
              Deposit
            </Button>
          </WalletDialog>
          <WalletDialog type="withdraw">
            <Button className="w-full" variant="outline">
              <ArrowUpRight className="mr-2 h-4 w-4 text-red-500" />
              Withdraw
            </Button>
          </WalletDialog>
        </div>
      </CardContent>
    </Card>
  );
}
