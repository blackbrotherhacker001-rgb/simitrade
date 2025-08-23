
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { LogOut, Wallet, User as UserIcon } from 'lucide-react';
import { TradeDialog } from './trade-dialog';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto hidden md:flex">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium mr-6">
            <Link
                href="/dashboard"
                className={cn(
                  'flex items-center gap-2 transition-colors hover:text-foreground',
                  pathname === '/dashboard'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Trading
              </Link>
             <Link
                href="/dashboard/profile"
                className={cn(
                  'flex items-center gap-2 transition-colors hover:text-foreground',
                  pathname === '/dashboard/profile'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Profile
              </Link>
        </nav>
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
