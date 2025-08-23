'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { LogOut, Wallet } from 'lucide-react';
import { TradeDialog } from './trade-dialog';

export function Header() {
  const { user, logout } = useAuth();

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user && (
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="w-4 h-4 text-primary" />
                <span>{formatAddress(user.walletAddress)}</span>
              </div>
              <div className="text-sm font-semibold">{formatBalance(user.balance)}</div>
              <TradeDialog />
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
