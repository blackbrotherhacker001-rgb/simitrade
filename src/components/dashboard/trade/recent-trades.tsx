
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const trades = [
  { price: 110856.00, amount: 0.0032, time: '11:10:53', type: 'buy' },
  { price: 110855.99, amount: 0.0150, time: '11:10:52', type: 'sell' },
  { price: 110856.01, amount: 0.0010, time: '11:10:51', type: 'buy' },
  { price: 110855.98, amount: 0.0200, time: '11:10:50', type: 'sell' },
  { price: 110856.00, amount: 0.0050, time: '11:10:49', type: 'buy' },
];

export function RecentTrades() {
  return (
    <div className="p-2 text-xs">
        <Table>
            <TableHeader>
                <TableRow className="border-b-border/60">
                    <TableHead className="text-left text-muted-foreground h-8">Price (USDT)</TableHead>
                    <TableHead className="text-right text-muted-foreground h-8">Amount (BTC)</TableHead>
                    <TableHead className="text-right text-muted-foreground h-8">Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {trades.map((trade, index) => (
                <TableRow key={index} className="border-none">
                    <TableCell className={`p-1 ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>{trade.price.toFixed(2)}</TableCell>
                    <TableCell className="p-1 text-right">{trade.amount.toFixed(4)}</TableCell>
                    <TableCell className="p-1 text-right text-muted-foreground">{trade.time}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
