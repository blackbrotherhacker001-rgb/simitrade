
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const mockMarkets = [
    { id: '1', name: 'BTC/USD', baseAsset: 'BTC', quoteAsset: 'USD', status: true, volume24h: 12500000 },
    { id: '2', name: 'ETH/USD', baseAsset: 'ETH', quoteAsset: 'USD', status: true, volume24h: 8750000 },
    { id: '3', name: 'SOL/USD', baseAsset: 'SOL', quoteAsset: 'USD', status: true, volume24h: 5500000 },
    { id: '4', name: 'DOGE/USD', baseAsset: 'DOGE', quoteAsset: 'USD', status: false, volume24h: 2100000 },
];


const marketSchema = z.object({
  name: z.string().min(1, 'Market name is required').regex(/^[A-Z]+\/[A-Z]+$/, 'Format must be ASSET/CURRENCY, e.g., BTC/USD'),
  baseAsset: z.string().min(1, 'Base asset is required'),
  quoteAsset: z.string().min(1, 'Quote currency is required'),
  status: z.boolean().default(true),
});

type MarketFormValues = z.infer<typeof marketSchema>;


export function BinaryMarkets() {
  const [markets, setMarkets] = useState(mockMarkets);
  const [isCreateMarketOpen, setCreateMarketOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<MarketFormValues>({
    resolver: zodResolver(marketSchema),
    defaultValues: {
      name: '',
      baseAsset: '',
      quoteAsset: 'USD',
      status: true,
    },
  });

  const handleCreateMarket = (values: MarketFormValues) => {
    const newMarket = {
      id: (markets.length + 1).toString(),
      ...values,
      volume24h: 0,
    };
    setMarkets([...markets, newMarket]);
    toast({
      title: 'Market Created',
      description: `The "${values.name}" market has been successfully created.`,
    });
    setCreateMarketOpen(false);
    form.reset();
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Binary Option Markets</CardTitle>
          <CardDescription>
            Create and manage markets for binary options trading.
          </CardDescription>
        </div>
         <Dialog open={isCreateMarketOpen} onOpenChange={setCreateMarketOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Market
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Create New Market</DialogTitle>
              <DialogDescription>
                Configure a new trading pair for binary options.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateMarket)} className="space-y-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. BTC/USD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="grid grid-cols-2 gap-4">
                     <FormField
                      control={form.control}
                      name="baseAsset"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Asset</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. BTC" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quoteAsset"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quote Currency</FormLabel>
                          <FormControl>
                             <Input placeholder="e.g. USD" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Active Status</FormLabel>
                         <FormDescription>
                            Enable or disable trading for this market.
                          </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Create Market</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Market</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>24h Volume</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {markets.map(market => (
              <TableRow key={market.id}>
                <TableCell className="font-medium">{market.name}</TableCell>
                <TableCell>
                  <Badge variant={market.status ? 'default' : 'destructive'}>
                    {market.status ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>${market.volume24h.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
