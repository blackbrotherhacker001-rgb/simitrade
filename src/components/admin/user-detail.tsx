
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const user = {
    name: 'demo user',
    email: 'demouser@gmail.com',
    id: 'ID: 430669de-2bf1-40d4-aefe-5722b54db525',
    avatar: 'https://i.pravatar.cc/150?u=demo-user',
    isAdmin: true,
    score: '32%',
    lastLogin: 'Never',
    activityScore: 32,
    accountAge: '15 days',
    riskLevel: 'High',
    riskScore: '78/100 (20% confidence)',
    joined: 'Aug 19, 2025',
    emailVerified: false,
    failedLogins: 0,
};

export function UserDetail() {
    const router = useRouter();

  return (
    <div className="space-y-6">
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
                    <AvatarFallback className="text-2xl">DU</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <Badge variant="outline">Admin</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.id} | Score: {user.score}</p>
                </div>
                <div className="flex items-center gap-2">
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
                                    <CardTitle className="text-lg">Account Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-around items-center">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold">{user.activityScore}%</p>
                                        <p className="text-sm text-muted-foreground">Activity Score</p>
                                        <p className="text-xs text-muted-foreground">User engagement level</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-destructive">{user.riskLevel}</p>
                                        <p className="text-sm text-muted-foreground">Risk Level</p>
                                        <p className="text-xs text-muted-foreground">Security assessment</p>
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
