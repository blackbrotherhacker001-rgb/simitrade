
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
import { BarChart, Briefcase, ChevronDown, Cog, Home, LineChart, LogIn, Bell, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '../common/logo';
import { useRouter } from 'next/navigation';

export function LandingHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard'); 
  };


  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center gap-4">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#" className="flex items-center gap-1 transition-colors hover:text-foreground text-foreground">
            <LineChart className="h-4 w-4" />
            Trading
            <ChevronDown className="h-4 w-4" />
          </Link>
          <Link href="#" className="flex items-center gap-1 transition-colors hover:text-foreground text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            Portfolio
            <ChevronDown className="h-4 w-4" />
          </Link>
          <Link href="#" className="flex items-center gap-1 transition-colors hover:text-foreground text-muted-foreground">
            <BarChart className="h-4 w-4" />
            Investments
             <ChevronDown className="h-4 w-4" />
          </Link>
          <Link href="#" className="flex items-center gap-1 transition-colors hover:text-foreground text-muted-foreground">
            <Home className="h-4 w-4" />
            Marketplace
            <ChevronDown className="h-4 w-4" />
          </Link>
          <Link href="#" className="flex items-center gap-1 transition-colors hover:text-foreground text-muted-foreground">
            <Cog className="h-4 w-4" />
            Services
             <ChevronDown className="h-4 w-4" />
          </Link>
          <Link href="#" className="flex items-center gap-1 transition-colors hover:text-foreground text-muted-foreground">
            <LineChart className="h-4 w-4" />
            Insights
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
         <Button variant="ghost" size="sm" onClick={() => router.push('/admin')}>
            <Settings className="mr-2 h-4 w-4" />
            Admin
          </Button>
           <Button variant="ghost" size="icon">
                <img src="https://em-content.zobj.net/source/apple/354/flag-united-states_1f1fa-1f1f8.png" alt="US Flag" className="h-5 w-5"/>
            </Button>
            <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5"/>
            </Button>
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
                        <DropdownMenuItem onClick={() => router.push('/dashboard')}>Dashboard</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button onClick={handleLogin}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                </Button>
            )}
        </div>
      </div>
    </header>
  );
}
