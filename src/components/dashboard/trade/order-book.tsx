
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { OrderBookEntry } from '@/types';

const bids: OrderBookEntry[] = [
  { price: 110855.99, amount: 6.2162, total: 6.2162 },
  { price: 110855.98, amount: 0.0001, total: 6.2163 },
  { price: 110855.97, amount: 0.0001, total: 6.2164 },
  { price: 110855.71, amount: 0.0001, total: 6.2201 },
  { price: 110855.70, amount: 0.0014, total: 6.2215 },
];

const asks: OrderBookEntry[] = [
  { price: 110856.00, amount: 3.1080, total: 3.1080 },
  { price: 110856.01, amount: 0.0004, total: 3.1084 },
  { price: 110856.96, amount: 0.0064, total: 3.1148 },
  { price: 110857.25, amount: 0.0001, total: 3.1149 },
  { price: 110857.26, amount: 0.0640, total: 3.1789 },
];

export function OrderBook() {
  return (
    <div className="grid grid-cols-2 gap-4 p-2 text-xs">
        <div>
            <Table>
                <TableHeader>
                    <TableRow className="border-b-transparent">
                        <TableHead className="text-left text-muted-foreground h-8">Price (USDT)</TableHead>
                        <TableHead className="text-right text-muted-foreground h-8">Amount (BTC)</TableHead>
                        <TableHead className="text-right text-muted-foreground h-8">Total</TableHead>
                    </TableRow>
                </TableHeader>
                 <TableBody>
                    {asks.map((ask) => (
                    <TableRow key={ask.price} className="border-none relative">
                        <TableCell className="p-1 text-[#ef4444]">{ask.price.toFixed(2)}</TableCell>
                        <TableCell className="p-1 text-right">{ask.amount.toFixed(4)}</TableCell>
                        <TableCell className="p-1 text-right">
                            {ask.total.toFixed(4)}
                             <div
                                className="absolute top-0 right-0 h-full bg-red-500/20"
                                style={{ width: `${(ask.total / 10) * 100}%`, zIndex: -1 }}
                            />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div>
            <Table>
                <TableHeader>
                     <TableRow className="border-b-transparent">
                        <TableHead className="text-left text-muted-foreground h-8">Price (USDT)</TableHead>
                        <TableHead className="text-right text-muted-foreground h-8">Amount (BTC)</TableHead>
                        <TableHead className="text-right text-muted-foreground h-8">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bids.map((bid) => (
                    <TableRow key={bid.price} className="border-none relative">
                        <TableCell className="p-1 text-[#10b981]">{bid.price.toFixed(2)}</TableCell>
                        <TableCell className="p-1 text-right">{bid.amount.toFixed(4)}</TableCell>
                        <TableCell className="p-1 text-right">
                           {bid.total.toFixed(4)}
                            <div
                                className="absolute top-0 right-0 h-full bg-green-500/20"
                                style={{ width: `${(bid.total / 10) * 100}%`, zIndex: -1 }}
                            />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
