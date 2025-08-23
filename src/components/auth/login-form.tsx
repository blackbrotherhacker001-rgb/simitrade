'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, User, Shield } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';
import { ADMIN_WALLET_ADDRESS, USER_WALLET_ADDRESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export function LoginForm() {
  const [open, setOpen] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (isAdmin: boolean) => {
    const walletAddress = isAdmin ? ADMIN_WALLET_ADDRESS : USER_WALLET_ADDRESS;
    login(walletAddress, isAdmin);
    setOpen(false);
    router.push(isAdmin ? '/admin' : '/dashboard');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Wallet Connect</CardTitle>
          <CardDescription>
            Connect your Web3 wallet to start trading.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              <QrCode className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          </DialogTrigger>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            We do not store your private keys. Your assets are always secure.
          </p>
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your Wallet</DialogTitle>
          <DialogDescription>
            Scan the QR code with your Web3 wallet or use the simulation buttons below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 bg-background rounded-lg">
          <Image
            src="https://placehold.co/256x256/ffffff/111827?text=QR+Code"
            alt="QR Code"
            width={256}
            height={256}
            className="rounded-md"
            data-ai-hint="qr code"
          />
        </div>
        <div className="flex flex-col gap-3 pt-4">
            <p className="text-sm text-center text-muted-foreground">For simulation purposes:</p>
            <Button onClick={() => handleLogin(false)}>
                <User className="mr-2 h-4 w-4" />
                Login as User
            </Button>
            <Button variant="secondary" onClick={() => handleLogin(true)}>
                <Shield className="mr-2 h-4 w-4" />
                Login as Admin
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
