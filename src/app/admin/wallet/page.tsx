
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Wallet, KeyRound, PlusCircle, Import, Info, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const networks = [
    { id: 'eth', name: 'Ethereum', icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg' },
    { id: 'bsc', name: 'BSC', icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bnb.svg' },
    { id: 'tron', name: 'Tron', icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/trx.svg' },
    { id: 'btc', name: 'Bitcoin', icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/btc.svg' },
]

export default function WalletPage() {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0].id);
  const [masterWallets, setMasterWallets] = useState<Record<string, string | null>>({});
  const { toast } = useToast();

  const handleGenerate = () => {
    const newAddress = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setMasterWallets(prev => ({...prev, [selectedNetwork]: newAddress}));
    toast({
      title: 'Wallet Generated',
      description: `A new wallet has been generated for the ${networks.find(n => n.id === selectedNetwork)?.name} network.`,
    });
  };
  
  const handleImport = () => {
      toast({
        title: 'Import Wallet',
        description: `This would open a dialog to securely import a wallet.`,
      });
  }

  const selectedNetworkInfo = networks.find(n => n.id === selectedNetwork);
  const currentMasterWallet = masterWallets[selectedNetwork];

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Master Wallet Configuration
          </CardTitle>
          <CardDescription>
            Set up the primary wallet for each blockchain network. This wallet will handle fees and manage funds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <label className="text-sm font-medium">Select Blockchain Network</label>
                <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger className="w-full md:w-1/3 mt-1">
                        <SelectValue placeholder="Select a network" />
                    </SelectTrigger>
                    <SelectContent>
                        {networks.map(network => (
                            <SelectItem key={network.id} value={network.id}>
                                <div className="flex items-center gap-2">
                                    <img src={network.icon} alt={network.name} className="h-5 w-5 rounded-full" />
                                    <span>{network.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <Card className="bg-card/50">
                 <CardHeader className="flex flex-row items-center gap-4">
                    <img src={selectedNetworkInfo?.icon} alt={selectedNetworkInfo?.name} className="h-10 w-10 rounded-full" />
                    <div>
                        <CardTitle>{selectedNetworkInfo?.name} Master Wallet</CardTitle>
                        <CardDescription>Manage the master wallet for this network.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {currentMasterWallet ? (
                        <div>
                            <label className="text-sm font-medium">Master Wallet Address</label>
                            <Input readOnly value={currentMasterWallet} className="mt-1"/>
                            <p className="text-xs text-muted-foreground mt-2">This wallet will handle transaction fees and native coin storage on the {selectedNetworkInfo?.name} network.</p>
                        </div>
                    ) : (
                        <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg">
                           <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
                           <h3 className="mt-4 text-lg font-semibold">No Master Wallet Found</h3>
                           <p className="mt-1 text-sm text-muted-foreground">Generate or import a wallet to get started.</p>
                            <div className="mt-6 flex justify-center gap-4">
                                <Button onClick={handleGenerate}>
                                    <PlusCircle className="mr-2 h-4 w-4"/>
                                    Generate New Wallet
                                </Button>
                                 <Button variant="secondary" onClick={handleImport}>
                                     <Import className="mr-2 h-4 w-4"/>
                                    Import Existing Wallet
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Critical Security Notes</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Backup your seed phrase/private keys in a secure, offline location.</li>
            <li>Never share your Master Wallet credentials with anyone.</li>
            <li>Use hardware wallets for additional security when possible.</li>
            <li>Monitor wallet balances regularly for unauthorized transactions.</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
