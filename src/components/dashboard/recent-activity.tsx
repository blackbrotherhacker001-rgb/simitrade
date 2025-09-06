
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

export function RecentActivity() {
  return (
    <Card className="h-full bg-card/50 border-border/60">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <Button variant="link" size="sm" className="p-0 h-auto text-primary">
          View All <ChevronRight className="h-4 w-4"/>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          No recent activity to display
        </div>
      </CardContent>
    </Card>
  );
}
