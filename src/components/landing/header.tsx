
'use client';

import { Logo } from '../common/logo';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BarChart2,
  Briefcase,
  ChevronDown,
  LineChart,
  Repeat,
  Settings,
  Sun,
  Bell,
  TrendingUp,
  Landmark,
  Database,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export function LandingHeader() {
  const { setNeedsLogin } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="ml-10 hidden md:flex items-center gap-2 text-sm font-medium">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        Trading
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/trade">
                            <BarChart2 className="mr-2 h-4 w-4" />
                            Spot Trading
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/binary-trading">
                            <LineChart className="mr-2 h-4 w-4" />
                            Binary Options
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/forex">
                            <Repeat className="mr-2 h-4 w-4" />
                            Forex
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Briefcase className="mr-2 h-4 w-4" />
                        P2P Exchange
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Portfolio</Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        Investments
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Investment Plans
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Landmark className="mr-2 h-4 w-4" />
                        Staking Rewards
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Database className="mr-2 h-4 w-4" />
                        Token Sales
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Marketplace</Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Services</Button>
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/markets">Insights</Link>
            </Button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setNeedsLogin(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Admin
          </Button>
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
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Button>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full" onClick={() => setNeedsLogin(true)}>
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
