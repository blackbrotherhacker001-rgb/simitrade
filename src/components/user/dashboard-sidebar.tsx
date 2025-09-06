
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { BarChart2, User, Shield, Bell, Wallet, Home, Key, ArrowLeft, ChevronRight, LayoutDashboard, LineChart } from 'lucide-react';
import { Badge } from "../ui/badge";

const navItems = [
    { href: "/overview", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/personal-info", icon: User, label: "Personal Info" },
    { href: "/security", icon: Shield, label: "Security" },
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: "/wallet", icon: Wallet, label: "Wallet" },
    { href: "/api-keys", icon: Key, label: "API Keys" },
]

export function DashboardSidebar() {
    const pathname = usePathname();
    const { user } = useAuth();
    
    if (!user) return null;

    const baseUserPath = `/user/${user.walletAddress}`;

    return (
        <aside className="w-64 flex-shrink-0 bg-card border-r border-border/60 flex flex-col">
            <div className="h-16 flex items-center px-4 gap-2 border-b border-border/60">
                 <Link href="/" className="flex items-center gap-2 text-foreground/80 hover:text-foreground">
                     <ArrowLeft className="h-4 w-4"/>
                     <span className="text-sm">Home</span>
                 </Link>
            </div>
            <div className="flex-grow flex flex-col p-4 space-y-4">
                <div className="flex flex-col items-center text-center space-y-3">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user.walletAddress}`} alt={user?.name} />
                        <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="font-semibold text-lg">{user?.name}</h2>
                        <p className="text-sm text-muted-foreground">@{user.name.toLowerCase().replace(' ', '')}</p>
                         <Badge variant="outline" className="mt-2">Level 0 Verified</Badge>
                    </div>
                     <div className="w-full space-y-1 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Profile Completion</span>
                            <span>40%</span>
                        </div>
                        <Progress value={40} className="h-1.5" />
                     </div>
                     <div className="w-full flex justify-between text-xs text-muted-foreground">
                         <span>Member Since 9/4/2025</span>
                          <Link href={`${baseUserPath}/personal-info`} className="flex items-center text-primary">
                            Complete Profile <ChevronRight className="h-3 w-3 ml-1"/>
                         </Link>
                     </div>
                </div>

                <nav className="flex-1 space-y-1 pt-4 border-t border-border/60">
                    {navItems.map(item => (
                        <Link key={item.label} href={`${baseUserPath}${item.href}`}>
                            <Button 
                                variant={pathname === `${baseUserPath}${item.href}` ? 'secondary' : 'ghost'} 
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                                {pathname === `${baseUserPath}${item.href}` && <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>}
                            </Button>
                        </Link>
                    ))}
                     <Link href="/trade">
                        <Button 
                            variant={pathname === '/trade' ? 'secondary' : 'ghost'} 
                            className="w-full justify-start"
                        >
                            <LineChart className="mr-3 h-5 w-5" />
                            Trade
                        </Button>
                    </Link>
                </nav>

                <div className="mt-auto space-y-2">
                     <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <Shield className="mx-auto h-8 w-8 text-primary mb-2"/>
                        <h4 className="font-semibold text-sm">Security Tips</h4>
                        <p className="text-xs text-muted-foreground mt-1">Enable 2FA for enhanced account protection.</p>
                        <Link href={`${baseUserPath}/security`}>
                            <Button variant="link" size="sm" className="p-0 h-auto text-primary mt-2">Security Settings</Button>
                        </Link>
                     </div>
                </div>
            </div>
        </aside>
    );
}
