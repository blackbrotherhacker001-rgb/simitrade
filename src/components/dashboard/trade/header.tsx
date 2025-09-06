
'use client';

import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Bell,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export function Header() {
  const { user, setNeedsLogin } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <img
              src="https://cdn.weglot.com/flags/circle/us.svg"
              alt="USA Flag"
              className="h-6 w-6"
            />
          </Button>
          <Button variant="ghost" size="icon">
            <Sun className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={user ? `/user/${user.walletAddress}/notifications` : '#'}>
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </Link>
          </Button>
          {user ? (
                <Button asChild>
                    <Link href={`/user/${user.walletAddress}/overview`}>
                        Dashboard
                    </Link>
                </Button>
            ) : (
                 <Button onClick={() => setNeedsLogin(true)}>
                    Login
                </Button>
            )}
        </div>
      </div>
    </header>
  );
}
