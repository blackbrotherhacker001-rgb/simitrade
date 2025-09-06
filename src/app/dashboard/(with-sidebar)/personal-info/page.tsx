
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { Progress } from '@/components/ui/progress';

export default function PersonalInfoPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Personal Information</h1>
        <p className="text-muted-foreground">
          Manage your personal details and verify your account.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            This information will be displayed on your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={user?.name} />
              <AvatarFallback className="text-3xl">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{user?.name}</h3>
              <p className="text-muted-foreground">@blackbrotherhacker001</p>
              <div className="mt-2">
                 <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Profile Completion</span>
                    <span>40%</span>
                 </div>
                 <Progress value={40} className="h-2"/>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue={user?.name} className="mt-1"/>
            </div>
             <div>
                <label className="text-sm font-medium">Username</label>
                <Input defaultValue="@blackbrotherhacker001" className="mt-1"/>
            </div>
             <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="demouser@gmail.com" type="email" readOnly disabled className="mt-1"/>
            </div>
             <div>
                <label className="text-sm font-medium">Wallet Address</label>
                <Input defaultValue={user?.walletAddress} readOnly disabled className="mt-1"/>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
