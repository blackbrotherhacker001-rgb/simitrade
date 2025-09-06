
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  RefreshCw,
  Info,
  Calendar,
  AlertTriangle,
  User,
  Power,
  PowerOff,
  ChevronLeft,
  Mail,
  Clock,
  Wallet,
  FileText,
  MessageSquare,
  Lock,
  Eye,
  CheckCircle,
  XCircle,
  LogIn,
  TrendingUp,
  TrendingDown,
  Shuffle,
  ShieldQuestion,
  Loader2,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/hooks/use-auth';
import type { User as UserType } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { MOCK_USERS } from '@/lib/constants';

type UserDetail = UserType & {
    email: string;
    score: string;
    activityScore: number;
    accountAge: string;
    riskLevel: string;
    riskScore: string;
    joined: string;
    emailVerified: boolean;
    failedLogins: number;
    avatar: string;
}

export default function UserDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { login } = useAuth();
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUser = async () => {
            const userId = params.userId as string;
            if (!userId) return;

            setLoading(true);
            const mockUserData = MOCK_USERS[userId];

            if (mockUserData) {
                setUser({
                    walletAddress: userId,
                    name: mockUserData.name,
                    balance: mockUserData.balance,
                    isAdmin: userId === '0xbd9A66ff3694e47726C1C8DD572A38168217BaA1',
                    email: `${mockUserData.name.toLowerCase().replace(/\s/g, '.')}@email.com`,
                    avatar: `https://i.pravatar.cc/150?u=${userId}`,
                    score: '32%',
                    lastLogin: mockUserData.lastLoginAt ? new Date(mockUserData.lastLoginAt).toLocaleDateString() : 'Never',
                    activityScore: 32,
                    accountAge: '15 days',
                    riskLevel: 'High',
                    riskScore: '78/100 (20% confidence)',
                    joined: 'Aug 19, 2025',
                    emailVerified: false,
                    failedLogins: 0,
                });
            } else {
                 toast({
                    variant: "destructive",
                    title: "User Not Found",
                    description: "The requested user does not exist.",
                });
            }
            setLoading(false);
        }

        fetchUser();
    }, [params.userId, toast]);


    const handleLoginAsUser = () => {
        if (!user) return;
        login(user.walletAddress, user.isAdmin);
        router.push(`/user/overview`);
    }

    const handleTradeControl = (outcome: 'win' | 'loss' | 'default') => {
        if (!user) return;
        
        let allTradeControls = {};
        try {
            const stored = localStorage.getItem('trade-controls');
            if(stored) {
                allTradeControls = JSON.parse(stored);
            }
        } catch (e) {
            console.error("Could not parse trade controls from localStorage", e);
        }

        const newControls = { ...allTradeControls, [user.walletAddress]: outcome };
        localStorage.setItem('trade-controls', JSON.stringify(newControls));
        
        toast({
            title: 'Trade Control Set',
            description: `User ${user.name}'s next trade is set to ${outcome}.`,
        });
    }


    if (loading) {
         return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <p>Loading user details...</p>
            </div>
         )
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="mb-4">User not found.</p>
                <Button onClick={() => router.back()}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
            </div>
        )
    }

  return (
    <div className="space-y-6 container mx-auto p-4 md:p-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold">User Details</h1>
        </div>

        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30 p-4 flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        {user.isAdmin && <Badge variant="outline">Admin</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">ID: {user.walletAddress.slice(0,15)}... | Score: {user.score}</p>
                </div>
                <div className="flex items-center gap-2">
                    {!user.isAdmin && (
                        <Button variant="outline" size="sm" onClick={handleLoginAsUser}>
                            <LogIn className="mr-2 h-4 w-4" />
                            Login as User
                        </Button>
                    )}
                    <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                    <Badge className="bg-green-600/20 text-green-400 border-green-600 py-1 px-3">
                        <Power className="mr-2 h-4 w-4" />
                        ACTIVE
                    </Badge>
                     <Button variant="destructive" size="sm">
                        <PowerOff className="mr-2 h-4 w-4" />
                        Block User
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                            Last Login <Info className="h-4 w-4" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{user.lastLogin}</p>
                        <p className="text-xs text-muted-foreground">User has never logged in</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                           Activity Score <Info className="h-4 w-4" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{user.activityScore}%</p>
                        <Progress value={user.activityScore} className="h-2 mt-1" />
                        <p className="text-xs text-muted-foreground mt-2">User engagement level</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                           Account Age <Calendar className="h-4 w-4" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{user.accountAge}</p>
                        <p className="text-xs text-muted-foreground">Since registration</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
                           Risk Level <AlertTriangle className="h-4 w-4" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-destructive">{user.riskLevel}</p>
                        <p className="text-xs text-muted-foreground">Score: {user.riskScore}</p>
                    </CardContent>
                </Card>
            </CardContent>
            <div className="px-4 pb-4">
                 <Tabs defaultValue="overview">
                    <TabsList className="bg-transparent border-b rounded-none p-0 h-auto">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"><Eye className="mr-2 h-4 w-4" />Overview</TabsTrigger>
                        <TabsTrigger value="transactions" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"><FileText className="mr-2 h-4 w-4"/>Transactions</TabsTrigger>
                        <TabsTrigger value="wallets" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"><Wallet className="mr-2 h-4 w-4"/>Wallets</TabsTrigger>
                        <TabsTrigger value="kyc" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"><User className="mr-2 h-4 w-4"/>KYC</TabsTrigger>
                        <TabsTrigger value="support" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"><MessageSquare className="mr-2 h-4 w-4"/>Support</TabsTrigger>
                        <TabsTrigger value="security" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"><Lock className="mr-2 h-4 w-4"/>Security</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="text-lg">Personal Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4 text-sm">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Email</span>
                                        <span className="font-medium">{user.email}</span>
                                        {user.emailVerified ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500"/>}
                                    </div>
                                     <div className="flex items-center gap-4 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Joined</span>
                                        <span className="font-medium">{user.joined}</span>
                                    </div>
                                     <div className="flex items-center gap-4 text-sm">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Last Login</span>
                                        <span className="font-medium">{user.lastLogin}</span>
                                    </div>
                                </CardContent>
                            </Card>
                             <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="text-lg">Trade Control</CardTitle>
                                    <CardDescription className="text-xs">Set the outcome for the user's next trade.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center">
                                    <div className="grid grid-cols-3 gap-2 w-full">
                                        <Button variant="outline" onClick={() => handleTradeControl('win')} className="text-green-500 border-green-500 hover:bg-green-500/10 hover:text-green-600 flex-1">
                                            <TrendingUp className="mr-2 h-4 w-4" /> Win
                                        </Button>
                                        <Button variant="outline" onClick={() => handleTradeControl('loss')} className="text-red-500 border-red-500 hover:bg-red-500/10 hover:text-red-600 flex-1">
                                            <TrendingDown className="mr-2 h-4 w-4" /> Loss
                                        </Button>
                                        <Button variant="secondary" onClick={() => handleTradeControl('default')} className="flex-1">
                                            <Shuffle className="mr-2 h-4 w-4" /> Default
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                             <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="text-muted-foreground">Account Age</TableCell>
                                                <TableCell className="text-right font-medium">{user.accountAge}</TableCell>
                                            </TableRow>
                                             <TableRow>
                                                <TableCell className="text-muted-foreground">Last Active</TableCell>
                                                <TableCell className="text-right font-medium">{user.lastLogin}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="text-muted-foreground">Email Verified</TableCell>
                                                <TableCell className="text-right font-medium">
                                                    <Badge variant={user.emailVerified ? 'default' : 'destructive'}>{user.emailVerified ? 'Yes' : 'No'}</Badge>
                                                </TableCell>
                                            </TableRow>
                                             <TableRow>
                                                <TableCell className="text-muted-foreground">Failed Logins</TableCell>
                                                <TableCell className="text-right font-medium">{user.failedLogins}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="transactions" className="mt-4">
                        <p className="text-center text-muted-foreground py-8">Transaction history not available.</p>
                    </TabsContent>
                 </Tabs>
            </div>
        </Card>
    </div>
  );
}

    