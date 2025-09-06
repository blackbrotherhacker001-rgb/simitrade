
'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { BarChart2, User, Shield, Bell, Wallet, Home } from 'lucide-react';

const navItems = [
    { href: "/dashboard/trade", icon: BarChart2, label: "Trade" },
    { href: "/dashboard/personal-info", icon: User, label: "Personal Info" },
    { href: "/dashboard/security", icon: Shield, label: "Security" },
    { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
    { href: "/dashboard/wallet", icon: Wallet, label: "Wallet" },
]

export function DashboardSidebar() {
    const pathname = usePathname();
    
    return (
        <aside className="w-64 flex-shrink-0 bg-background border-r border-border/60 flex flex-col">
            <div className="h-16 flex items-center px-6 gap-2">
                 <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "h-8 w-8")}>
                     <Home className="h-4 w-4"/>
                 </Link>
                <h1 className="text-lg font-semibold">Home</h1>
            </div>
            <div className="flex-grow flex flex-col p-4 space-y-4">
                <nav className="flex-1 space-y-2">
                    {navItems.map(item => (
                        <Link key={item.label} href={item.href}>
                            <Button 
                                variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'} 
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                                {item.href === '/dashboard/trade' && <span className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse"></span>}
                            </Button>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto space-y-2">
                     <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <Shield className="mx-auto h-8 w-8 text-primary mb-2"/>
                        <h4 className="font-semibold text-sm">Security Tips</h4>
                        <p className="text-xs text-muted-foreground mt-1">Enable 2FA for enhanced account protection.</p>
                        <Link href="/dashboard/security">
                            <Button variant="link" size="sm" className="p-0 h-auto text-primary mt-2">Security Settings</Button>
                        </Link>
                     </div>
                </div>
            </div>
        </aside>
    );
}
