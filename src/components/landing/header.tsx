
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
  FileText,
  MessageCircle,
  Settings,
  Sun,
  User,
  Wallet,
  Bell,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const NavLink = ({
  children,
  hasDropdown = false,
}: {
  children: React.ReactNode;
  hasDropdown?: boolean;
}) => (
  <Button
    variant="ghost"
    className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
  >
    {children}
    {hasDropdown && <ChevronDown className="h-4 w-4" />}
  </Button>
);

export function LandingHeader() {
  const { setNeedsLogin } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="ml-10 hidden md:flex items-center gap-2 text-sm font-medium">
          <NavLink hasDropdown>Trading</NavLink>
          <NavLink hasDropdown>Portfolio</NavLink>
          <NavLink hasDropdown>Investments</NavLink>
          <NavLink hasDropdown>Marketplace</NavLink>
          <NavLink hasDropdown>Services</NavLink>
          <NavLink>Insights</NavLink>
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
