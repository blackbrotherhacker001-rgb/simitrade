
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { BarChart2, User, Shield, Bell, Wallet, KeyRound, HelpCircle, Settings, ChevronRight, LogOut, ArrowLeft } from 'lucide-react';
import { Logo } from "../common/logo";

const navItems = [
    { href: "/dashboard", icon: BarChart2, label: "Dashboard" },
    { href: "/dashboard/personal-info", icon: User, label: "Personal Info" },
    { href: "/dashboard/security", icon: Shield, label: "Security" },
    { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
    { href: "/dashboard/wallet", icon: Wallet, label: "Wallet" },
    { href: "/dashboard/api-keys", icon: KeyRound, label: "API Keys" },
]

export function DashboardSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    
    return (
        <aside className="w-64 flex-shrink-0 bg-background border-r border-border/60 flex flex-col">
            <div className="h-16 flex items-center px-6 gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                     <ArrowLeft className="h-4 w-4"/>
                 </Button>
                <h1 className="text-lg font-semibold">Home</h1>
            </div>
            <div className="flex-grow flex flex-col p-4 space-y-4">
                <div className="flex flex-col items-center text-center p-4 rounded-lg">
                    <Avatar className="h-20 w-20 mb-3 border-2 border-primary">
                        <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="font-bold text-lg">{user?.name}</h2>
                    <p className="text-sm text-muted-foreground">@blackbrotherhacker001</p>
                    <Button variant="secondary" size="sm" className="mt-2 text-xs h-7">Level 0 Verified</Button>

                    <div className="w-full mt-4 text-left">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                           <span>Profile Completion</span>
                           <span>40%</span>
                        </div>
                        <Progress value={40} className="h-1"/>
                    </div>

                    <div className="w-full flex justify-between text-xs mt-3">
                        <div className="text-left">
                             <p className="text-muted-foreground">Member Since</p>
                             <p>9/4/2025</p>
                        </div>
                         <div className="text-right flex items-end">
                            <Link href="#" className="flex items-center text-primary hover:underline">
                                Complete Profile <ChevronRight className="h-4 w-4"/>
                            </Link>
                         </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map(item => (
                        <Link key={item.label} href={item.href}>
                            <Button 
                                variant={pathname === item.href ? 'secondary' : 'ghost'} 
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                                {item.label === 'Dashboard' && <span className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse"></span>}
                            </Button>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto space-y-2">
                     <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <Shield className="mx-auto h-8 w-8 text-primary mb-2"/>
                        <h4 className="font-semibold text-sm">Security Tips</h4>
                        <p className="text-xs text-muted-foreground mt-1">Enable 2FA for enhanced account protection.</p>
                        <Button variant="link" size="sm" className="p-0 h-auto text-primary mt-2">Security Settings</Button>
                     </div>
                </div>
            </div>
        </aside>
    );
}
