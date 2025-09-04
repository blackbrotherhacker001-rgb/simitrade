
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
  Paintbrush,
  User,
  Maximize,
  Sun,
  ChevronRight,
  Landmark,
  CreditCard,
  ArrowDownToLine,
  CandlestickChart,
  Binary,
  AreaChart,
  FileText,
  FileUp,
  ArrowUpFromLine,
  Clock
} from 'lucide-react';
import { AdminLogo } from '../common/admin-logo';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const NavLink = ({ href, label, icon: Icon, currentPath }: { href: string; label: string; icon: React.ElementType; currentPath: string; }) => (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 h-10 px-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground',
        currentPath === href
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </Link>
);


export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <AdminLogo />
           <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <NavLink href="/admin/analytics" label="Dashboard" icon={LayoutDashboard} currentPath={pathname} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground h-10 px-3">
                  Finance
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="start">
                <DropdownMenuItem asChild>
                   <Link href="/admin/analytics" className="flex items-center gap-2">
                        <BarChart className="mr-2 h-4 w-4" />
                        Revenue Analytics
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Landmark className="mr-2 h-4 w-4"/>
                        Payment Systems
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                               <CreditCard className="mr-2 h-4 w-4"/>
                               Payment Gateways
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                               <CreditCard className="mr-2 h-4 w-4"/>
                               Payment Methods
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/admin/deposits" className="flex items-center gap-2">
                                    <ArrowDownToLine className="mr-2 h-4 w-4"/>
                                    Deposit Records
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <CandlestickChart className="mr-2 h-4 w-4"/>
                        Trading Infrastructure
                    </DropdownMenuSubTrigger>
                     <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                             <DropdownMenuItem asChild>
                                <Link href="/admin/market" className="flex items-center gap-2">
                                    <LineChart className="mr-2 h-4 w-4"/>
                                    Market Simulation
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Binary className="mr-2 h-4 w-4"/>
                        Binary Options
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                               <AreaChart className="mr-2 h-4 w-4"/>
                               Binary Markets
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                               <Clock className="mr-2 h-4 w-4"/>
                               Trading Durations
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                 <DropdownMenuItem asChild>
                    <Link href="/admin/ai/investment/plan" className="flex items-center gap-2">
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        Investment Management
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4"/>
                    Order Management
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                     <Link href="/admin/transactions" className="flex items-center gap-2">
                        <Send className="mr-2 h-4 w-4" />
                        Transaction Management
                    </Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem>
                    <ArrowUpFromLine className="mr-2 h-4 w-4"/>
                    Withdrawal Management
                 </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground h-10 px-3">
                  Extensions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
               <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                    <Link href="/admin/users" className="flex items-center gap-2">
                        <Users className="mr-2 h-4 w-4"/>
                        User Management
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin/live-chat" className="flex items-center gap-2">
                        <MessageSquare className="mr-2 h-4 w-4"/>
                        Live Chat
                    </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground h-10 px-3">
                  Design
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                 <DropdownMenuItem>
                    <Paintbrush className="mr-2 h-4 w-4"/>
                    Theme Customizer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4"/>
                User
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
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
                <Maximize className="h-4 w-4"/>
            </Button>
            <Button variant="ghost" size="icon">
                <Sun className="h-4 w-4"/>
            </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                             <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                             <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
