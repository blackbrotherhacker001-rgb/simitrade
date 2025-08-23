
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Wallet } from 'lucide-react';
import { ADMIN_WALLET_ADDRESS } from '@/lib/constants';

const DEPOSIT_WALLET_STORAGE_KEY = 'deposit-wallet-address';

export default function WalletPage() {
  const [depositAddress, setDepositAddress] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const storedAddress = localStorage.getItem(DEPOSIT_WALLET_STORAGE_KEY);
    if (storedAddress) {
      setDepositAddress(storedAddress);
    } else {
      setDepositAddress(ADMIN_WALLET_ADDRESS);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(DEPOSIT_WALLET_STORAGE_KEY, depositAddress);
    toast({
      title: 'Address Saved',
      description: 'The deposit wallet address has been updated.',
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Deposit Wallet Management
          </CardTitle>
          <CardDescription>
            Update the platform's main deposit wallet address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="deposit-address">Deposit Wallet Address</Label>
            <Input
              id="deposit-address"
              value={depositAddress}
              onChange={(e) => setDepositAddress(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                Save Address
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
