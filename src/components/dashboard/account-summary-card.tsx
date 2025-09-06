

'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function AccountSummaryCard() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
  }

  const handleKycClick = () => {
    toast({
        title: "Feature in development",
        description: "The KYC verification flow is coming soon!",
    })
  }

  return (
    <Card className="bg-card/50 border-border/60">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Your Account Summary</h3>
          <p className="text-sm text-muted-foreground">
            Account Status: <span className="text-green-500 font-medium">ACTIVE</span> • Member since {formatDate(user?.lastLoginAt)}
          </p>
        </div>
        <Button onClick={handleKycClick}>
          KYC Verification
        </Button>
      </CardContent>
    </Card>
  );
}
