
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, User, Shield, ChevronDown, BarChart2, Briefcase, ShoppingCart, Settings2, BarChart, Sun, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '../common/logo';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const NavLink = ({ label, children, icon: Icon }: { label: string, children?: React.ReactNode, icon: React.ElementType }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <Icon className="h-4 w-4" />
                {label}
                <ChevronDown className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
            <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
            <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

export function LandingHeader() {
  const { user, logout, setNeedsLogin } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setNeedsLogin(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center gap-4">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <NavLink label="Trading" icon={BarChart2} />
            <NavLink label="Portfolio" icon={Briefcase} />
            <NavLink label="Investments" icon={BarChart} />
            <NavLink label="Marketplace" icon={ShoppingCart} />
            <NavLink label="Services" icon={Settings2} />
            <Button variant="ghost" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <BarChart className="h-4 w-4" />
                Insights
            </Button>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    router.push(user.isAdmin ? '/admin' : '/dashboard')
                  }
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.push('/admin')}>
                    <Shield className="h-4 w-4"/>
                    Admin
                </Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="w-8 h-8">
                           <img src="https://em-content.zobj.net/source/apple/354/flag-united-states_1f1fa-1f1f8.png" alt="US Flag" className="w-5 h-5 rounded-sm"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>Spanish</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Sun className="h-4 w-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="w-8 h-8 relative">
                    <Bell className="h-4 w-4" />
                    <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></div>
                 </Button>
                <Button onClick={handleLogin} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Login / Register
                </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
