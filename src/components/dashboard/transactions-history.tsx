'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/types';

const mockTransactions: Transaction[] = [
  { id: '1', type: 'buy', symbol: 'BTC', quantity: 0.1, price: 65000, total: 6500, timestamp: '2024-05-20T10:00:00Z' },
  { id: '2', type: 'deposit', symbol: 'USD', quantity: 10000, price: 1, total: 10000, timestamp: '2024-05-20T09:00:00Z' },
  { id: '3', type: 'sell', symbol: 'ETH', quantity: 2, price: 3500, total: 7000, timestamp: '2024-05-19T15:30:00Z' },
  { id: '4', type: 'withdrawal', symbol: 'USD', quantity: 2000, price: 1, total: 2000, timestamp: '2024-05-19T11:00:00Z' },
  { id: '5', type: 'buy', symbol: 'SOL', quantity: 50, price: 150, total: 7500, timestamp: '2024-05-18T12:00:00Z' },
];

const getTypeBadgeVariant = (type: Transaction['type']) => {
  switch (type) {
    case 'buy': return 'default';
    case 'sell': return 'destructive';
    case 'deposit': return 'secondary';
    case 'withdrawal': return 'outline';
    default: return 'default';
  }
};

export function TransactionsHistory() {
  const [transactions] = useState<Transaction[]>(mockTransactions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>A record of your recent activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell>
                  <Badge variant={getTypeBadgeVariant(tx.type)} className="capitalize">{tx.type}</Badge>
                </TableCell>
                <TableCell>{tx.symbol}</TableCell>
                <TableCell className="text-right">{tx.quantity.toLocaleString()}</TableCell>
                <TableCell className="text-right">${tx.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">${tx.total.toLocaleString()}</TableCell>
                <TableCell className="text-right">{new Date(tx.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
