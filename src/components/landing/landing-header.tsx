
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
import { LogIn, User, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '../common/logo';
import { useRouter } from 'next/navigation';

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
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium"></nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
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
                <Button variant="ghost" onClick={() => router.push('/admin')}>
                    <Shield className="mr-2 h-4 w-4" />
                    Admin
                </Button>
                <Button onClick={handleLogin}>
                    <User className="mr-2 h-4 w-4" />
                    Login / Register
                </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
