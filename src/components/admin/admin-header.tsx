
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
  Monitor,
  CheckCircle,
} from 'lucide-react';

const navLinks = [
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/market', label: 'Market', icon: LineChart },
  { href: '/admin/deposits', label: 'Deposits', icon: Wallet },
  { href: '/admin/transactions', label: 'Transactions', icon: Send },
  { href: '/admin/wallet', label: 'Wallet', icon: Wallet },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
  { href: '/admin/live-chat', label: 'Live Chat', icon: MessageSquare },
  { href: '/admin/monitor', label: 'Monitor', icon: Monitor },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card">
      <div className="container flex h-16 items-center">
        <nav className="flex items-center space-x-6 text-sm font-medium">
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
      </div>
    </header>
  );
}
