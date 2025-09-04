
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
  BrainCircuit
} from 'lucide-react';
import { AdminLogo } from '../common/admin-logo';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
    SidebarProvider,
    Sidebar,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter
} from '@/components/ui/sidebar';

const navLinks = [
  { href: '/admin/deposits', label: 'Deposits', icon: Wallet },
  { href: '/admin/transactions', label: 'Transactions', icon: Send },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/market', label: 'Market Simulation', icon: LineChart },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
  { href: '/admin/live-chat', label: 'Live Chat', icon: MessageSquare },
  { href: '/admin/wallet', label: 'Wallet Settings', icon: Settings },
  { href: '/admin/ai/investment/plan', label: 'AI Plans', icon: BrainCircuit },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <AdminLogo />
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 transition-colors hover:text-foreground',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>

        <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400/50 gap-2">
                <Circle className="h-2 w-2 fill-current text-green-400" />
                Live
            </Badge>
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
