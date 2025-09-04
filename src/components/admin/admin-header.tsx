
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Users,
  LineChart,
  Wallet,
  Send,
  BarChart,
  MessageSquare,
  Bell,
  ArrowLeft,
  Circle,
  Settings,
  BrainCircuit,
  ChevronDown,
  LayoutDashboard,
  DollarSign,
  Briefcase,
  Paintbrush
} from 'lucide-react';
import { AdminLogo } from '../common/admin-logo';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = {
  dashboard: { href: '/admin/analytics', label: 'Dashboard', icon: LayoutDashboard },
  finance: [
    { href: '/admin/deposits', label: 'Deposits', icon: Wallet },
    { href: '/admin/transactions', label: 'Transactions', icon: Send },
  ],
  extensions: [
      { href: '/admin/users', label: 'Users', icon: Users },
      { href: '/admin/market', label: 'Market Simulation', icon: LineChart },
      { href: '/admin/live-chat', label: 'Live Chat', icon: MessageSquare },
      { href: '/admin/wallet', label: 'Wallet Settings', icon: Settings },
      { href: '/admin/ai/investment/plan', label: 'AI Plans', icon: BrainCircuit },
  ],
  design: [
      // Future design-related links can go here
  ]
};

const NavLink = ({ href, label, icon: Icon, currentPath }: { href: string; label: string; icon: React.ElementType; currentPath: string; }) => (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 transition-colors hover:text-foreground',
        currentPath === href
          ? 'text-foreground'
          : 'text-muted-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
);

const NavDropdown = ({ label, icon: Icon, items, currentPath }: { label: string, icon: React.ElementType, items: {href: string, label: string, icon: React.ElementType}[], currentPath: string }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn(
                'flex items-center gap-2 transition-colors hover:text-foreground px-2',
                items.some(item => currentPath.startsWith(item.href))
                    ? 'text-foreground'
                    : 'text-muted-foreground'
            )}>
                <Icon className="h-4 w-4" />
                {label}
                <ChevronDown className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {items.map(item => (
                 <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);


export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <AdminLogo />
        </div>

        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
            <NavLink {...navLinks.dashboard} currentPath={pathname} />
            <NavDropdown label="Finance" icon={DollarSign} items={navLinks.finance} currentPath={pathname} />
            <NavDropdown label="Extensions" icon={Briefcase} items={navLinks.extensions} currentPath={pathname} />
             <NavDropdown label="Design" icon={Paintbrush} items={navLinks.design} currentPath={pathname} />
          </nav>

        <div className="flex items-center gap-4">
            <Button variant="outline">
                <Users className="h-4 w-4 mr-2"/>
                User
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        English
                        <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>English</DropdownMenuItem>
                    <DropdownMenuItem>Spanish</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4"/>
            </Button>
            <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4"/>
            </Button>
        </div>
      </div>
    </header>
  );
}
