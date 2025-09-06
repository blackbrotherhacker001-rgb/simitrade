
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeBuoy, MessageSquare, Clock, Users, Shield, Ticket } from 'lucide-react';
import Link from 'next/link';

const supportFeatures = [
    {
        id: 'tickets',
        icon: <Ticket className="h-6 w-6 text-primary" />,
        title: 'Support Tickets',
        description: 'Create and manage support tickets for your issues',
        features: [
            'Track your issues with unique ticket IDs',
            'Set priority levels (Low, Medium, High)',
            'Real-time updates via WebSocket',
            'Full conversation history'
        ],
        buttonText: 'Go to Support Center',
        buttonVariant: 'default',
        href: '/admin/support-tickets' // Example link
    },
    {
        id: 'chat',
        icon: <MessageSquare className="h-6 w-6 text-primary" />,
        title: 'Live Chat',
        description: 'Get instant help from our support agents',
        features: [
            'Direct connection with support agents',
            'Real-time messaging',
            'Queue position tracking',
            'File sharing capabilities'
        ],
        buttonText: 'Open Live Chat',
        buttonVariant: 'outline',
        href: '/admin/live-chat'
    }
]

const valueProps = [
    {
        icon: <Clock className="h-8 w-8 text-primary" />,
        title: 'Real-time Updates',
        description: 'WebSocket connections ensure instant message delivery and status updates'
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: 'Agent Assignment',
        description: 'Automatic agent assignment based on availability and expertise'
    },
     {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: 'Secure Communication',
        description: 'All conversations are encrypted and securely stored'
    }
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Support Center
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get help when you need it with our comprehensive support system
        </p>
        <div className="mt-6 flex justify-center gap-4">
            <Button size="lg">View Support Tickets</Button>
            <Button size="lg" variant="outline">Contact Us</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
        {supportFeatures.map(feature => (
            <Card key={feature.title} className="bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        {feature.icon}
                        <span className="text-2xl">{feature.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{feature.description}</p>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                        {feature.features.map(item => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <Button className="w-full" variant={feature.buttonVariant as any} asChild>
                      <Link href={feature.href}>{feature.buttonText}</Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {valueProps.map(prop => (
            <Card key={prop.title} className="bg-card/50 border-none text-center p-8">
                <div className="flex justify-center mb-4">
                    {prop.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
                <p className="text-muted-foreground">{prop.description}</p>
            </Card>
        ))}
      </div>
    </div>
  );
}
