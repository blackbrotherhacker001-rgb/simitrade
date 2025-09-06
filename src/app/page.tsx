
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { LandingHeader } from '@/components/landing/header';
import { MarketCard } from '@/components/landing/market-card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const { user, setNeedsLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [user, router]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <LandingHeader />
      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              #1 Crypto Trading Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Trade Crypto <br />
              <span className="text-primary">like a pro</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Advanced trading tools, lightning-fast execution, and unmatched
              security. Join millions of traders worldwide.
            </p>
            <div className="flex gap-4">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg" onClick={() => setNeedsLogin(true)}>
                    Start Trading <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Secure Trading</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time Data</span>
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 Support</span>
                </div>
            </div>
          </div>
          <div>
            <MarketCard />
          </div>
        </div>
      </main>
    </div>
  );
}
