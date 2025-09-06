
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, CheckCheck, Mail, MessageSquare, Settings, AlertTriangle, BadgePercent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const mockNotifications = [
    { id: 1, type: 'trade_win', title: 'Trade Won!', description: 'Your BTC/USD trade for $100 was successful. You earned $87.', time: '5 minutes ago', read: false, icon: <BadgePercent className="h-5 w-5 text-green-500" /> },
    { id: 2, type: 'security_alert', title: 'New Device Login', description: 'A new device (Chrome on Windows) has logged into your account.', time: '1 hour ago', read: false, icon: <AlertTriangle className="h-5 w-5 text-yellow-500" /> },
    { id: 3, type: 'deposit_success', title: 'Deposit Confirmed', description: 'Your deposit of $1,000 has been successfully credited to your account.', time: '3 hours ago', read: true, icon: <CheckCheck className="h-5 w-5 text-blue-500" /> },
    { id: 4, type: 'trade_loss', title: 'Trade Lost', description: 'Your ETH/USD trade for $50 was unsuccessful.', time: '1 day ago', read: true, icon: <MessageSquare className="h-5 w-5 text-red-500" /> },
    { id: 5, type: 'promo', title: 'New Feature Unlocked!', description: 'You can now trade on the SOL/USD pair with up to 90% profit.', time: '2 days ago', read: true, icon: <Bell className="h-5 w-5 text-primary" /> },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const { toast } = useToast();

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: 'Notifications Updated',
      description: 'All notifications have been marked as read.',
    });
  };
  
  const handleSaveSettings = () => {
      toast({
          title: "Preferences Saved",
          description: "Your notification settings have been updated.",
      })
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
       <div className="space-y-2">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Manage your notifications and stay up-to-date.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Notifications</CardTitle>
                    <Button variant="link" onClick={handleMarkAllRead}>Mark all as read</Button>
                </CardHeader>
                <CardContent className="divide-y divide-border">
                    {notifications.map(notification => (
                        <div key={notification.id} className={cn("flex items-start gap-4 p-4", !notification.read && "bg-muted/30")}>
                            <div className="p-2 bg-card/50 rounded-full mt-1">
                               {notification.icon}
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold">{notification.title}</p>
                                <p className="text-sm text-muted-foreground">{notification.description}</p>
                            </div>
                            <div className="text-xs text-muted-foreground text-right space-y-1">
                                <p>{notification.time}</p>
                                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary ml-auto" />}
                            </div>
                        </div>
                    ))}
                </CardContent>
           </Card>
        </div>
         <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Notification Settings
                    </CardTitle>
                    <CardDescription>
                        Choose what you want to be notified about.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <CheckCheck className="h-5 w-5 text-muted-foreground" />
                            <label htmlFor="trade-alerts" className="font-medium text-sm">Trade Alerts</label>
                        </div>
                        <Switch id="trade-alerts" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                            <label htmlFor="security-alerts" className="font-medium text-sm">Security Alerts</label>
                        </div>
                        <Switch id="security-alerts" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <label htmlFor="promotional-emails" className="font-medium text-sm">Promotional Emails</label>
                        </div>
                        <Switch id="promotional-emails" />
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <MessageSquare className="h-5 w-5 text-muted-foreground" />
                            <label htmlFor="chat-messages" className="font-medium text-sm">Chat Messages</label>
                        </div>
                        <Switch id="chat-messages" defaultChecked />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleSaveSettings}>Save Preferences</Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
