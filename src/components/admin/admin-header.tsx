'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Shield } from 'lucide-react';
import { Badge } from '../ui/badge';

export function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">ForgeTrader Admin</h1>
            <Badge variant="outline"><Shield className="w-3 h-3 mr-1"/>ADMIN</Badge>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live
              </div>
               <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-1 right-1 flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500">
                    <span className="absolute -top-1 -right-1.5 text-xs text-white">3</span>
                  </span>
                </span>
              </Button>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
