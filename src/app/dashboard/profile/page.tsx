
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WalletDialog } from '@/components/dashboard/wallet-dialog';
import { DollarSign, Calendar, Wallet, Activity, User, ArrowDownLeft, ArrowUpRight, Settings, Bell, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(balance);
  };
  
  const formatDate = (dateString?: string) => {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
      });
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">User Profile</CardTitle>
          <CardDescription>View and manage your account details and wallet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={user.name} />
                <AvatarFallback><User className="h-10 w-10"/></AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.walletAddress}</p>
              <Badge className="mt-2 bg-green-600/20 text-green-400 border-green-600">Active</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-green-600/20 rounded-md">
                        <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Balance</p>
                        <p className="text-xl font-bold">{formatBalance(user.balance)}</p>
                    </div>
                  </CardContent>
              </Card>
               <Card className="bg-card/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-md">
                        <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Last Login</p>
                        <p className="text-xl font-bold">{formatDate(user.lastLoginAt)}</p>
                    </div>
                  </CardContent>
              </Card>
          </div>

          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Wallet className="h-5 w-5"/> Wallet Management</h3>
            <div className="flex flex-col md:flex-row justify-between items-center bg-card/50 p-6 rounded-lg">
                <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-4xl font-bold">{formatBalance(user.balance)}</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <WalletDialog type="deposit">
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <ArrowDownLeft className="mr-2 h-4 w-4" />
                        Deposit
                        </Button>
                    </WalletDialog>
                    <WalletDialog type="withdraw">
                        <Button variant="secondary">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Withdraw
                        </Button>
                    </WalletDialog>
                </div>
            </div>
          </div>

          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Settings className="h-5 w-5"/> Settings</h3>
            <Card className="bg-card/50">
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="manage-profile" className="text-base">Profile Information</Label>
                            <p className="text-sm text-muted-foreground">
                                Manage your name and connected wallet.
                            </p>
                        </div>
                        <Button id="manage-profile" variant="secondary">Manage Profile</Button>
                    </div>
                     <div className="space-y-4">
                        <h4 className="text-md font-medium flex items-center gap-2"><Bell className="h-4 w-4"/> Notification Settings</h4>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="price-alerts">Price Alerts</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive alerts when asset prices change dramatically.
                                </p>
                            </div>
                            <Switch id="price-alerts" />
                        </div>
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="trade-confirmations">Trade Confirmations</Label>
                                <p className="text-sm text-muted-foreground">
                                    Get an email confirmation for every trade.
                                </p>
                            </div>
                            <Switch id="trade-confirmations" defaultChecked/>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <h4 className="text-md font-medium flex items-center gap-2"><Shield className="h-4 w-4"/> Security</h4>
                         <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="2fa">Two-Factor Authentication (2FA)</Label>
                                <p className="text-sm text-muted-foreground">
                                   Add an extra layer of security to your account.
                                </p>
                            </div>
                            <Button id="2fa" variant="secondary">Enable</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4"><Activity className="h-5 w-5"/> Recent Activity</h3>
            <div className="text-center text-muted-foreground py-8 bg-card/50 rounded-lg">
                <p>No recent activity or messages.</p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
