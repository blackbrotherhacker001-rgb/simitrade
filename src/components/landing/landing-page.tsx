
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { LandingHeader } from './landing-header';
import { MarketCard } from './market-card';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900/10 via-background to-background text-foreground">
      <LandingHeader />
      <main className="container mx-auto py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              #1 Crypto Trading Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Trade Crypto <br />
              <span className="text-primary">like a pro</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Advanced trading tools, lightning-fast execution, and unmatched security. Join millions of traders worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                Start Trading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
             <div className="flex items-center gap-6 text-sm text-muted-foreground mt-8">
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500"/>
                    Secure Trading
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500"/>
                    Real-time Data
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500"/>
                    24/7 Support
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
