
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CircularProgress } from './circular-progress';

export function SecurityOverview() {
  return (
    <Card className="h-full bg-card/50 border-border/60">
      <CardHeader>
        <CardTitle className="text-lg">Security Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
            <CircularProgress value={50} />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">50</span>
            </div>
        </div>
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm">Two-factor authentication</span>
            </div>
            <Button variant="secondary" size="sm">Enable</Button>
          </div>
           <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm">Email Verified</span>
            </div>
          </div>
           <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm">Phone Verified</span>
            </div>
            <Button variant="secondary" size="sm">Verify</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
