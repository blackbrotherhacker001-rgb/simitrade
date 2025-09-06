
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, KeyRound, Smartphone, Mail, Eye, ShieldOff } from 'lucide-react';
import { LoginHistory } from '@/components/dashboard/security/login-history';

export default function SecurityPage() {

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground">Manage your account's security features and monitor login activity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Two-Factor Authentication (2FA)
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account. Once enabled, you'll be asked for a code from your authenticator app when you log in.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <ShieldOff className="h-8 w-8 text-destructive"/>
                    <div>
                        <p className="font-semibold">2FA is Not Enabled</p>
                        <p className="text-sm text-muted-foreground">Your account is less secure without two-factor authentication.</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
              <Button>Enable 2FA</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                It's a good practice to use a strong password that you're not using elsewhere.
              </CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Current Password</label>
                    <input type="password" placeholder="••••••••" className="mt-1 block w-full bg-input rounded-md border-border p-2"/>
                </div>
                 <div>
                    <label className="text-sm font-emibold">New Password</label>
                    <input type="password" placeholder="••••••••" className="mt-1 block w-full bg-input rounded-md border-border p-2"/>
                </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <LoginHistory />
        </div>

        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Verification Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground"/>
                            <span className="font-medium">Email</span>
                        </div>
                        <span className="text-sm text-green-500 font-semibold">Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-muted-foreground"/>
                            <span className="font-medium">Phone Number</span>
                        </div>
                         <Button variant="secondary" size="sm">Verify</Button>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <Eye className="h-5 w-5"/>
                        Privacy Overview
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                    <p>Your data is used to enhance your experience and for security purposes.</p>
                    <p>We do not share your personal information with third-party marketers.</p>
                    <Button variant="link" className="p-0 h-auto">Read our Privacy Policy</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
