
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockPlans = [
    { id: '1', name: 'Conservative Growth', title: 'Conservative Growth Plan', status: true, trending: true, invested: 150000, profit: 5 },
    { id: '2', name: 'Aggressive Crypto', title: 'Aggressive Crypto Speculation', status: true, trending: false, invested: 75000, profit: 25 },
    { id: '3', name: 'Stable Yield', title: 'Stable Yield Farming', status: false, trending: false, invested: 300000, profit: 8 },
];

export function InvestmentPlans() {
  const [plans, setPlans] = useState(mockPlans);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI Investment Plans</CardTitle>
          <CardDescription>
            Create and manage investment opportunities for users.
          </CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Trending</TableHead>
              <TableHead>Total Invested</TableHead>
              <TableHead>Avg. Profit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map(plan => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{plan.title}</TableCell>
                <TableCell>
                  <Badge variant={plan.status ? 'default' : 'destructive'}>
                    {plan.status ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={plan.trending ? 'secondary' : 'outline'}>
                    {plan.trending ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell>${plan.invested.toLocaleString()}</TableCell>
                <TableCell>{plan.profit}%</TableCell>
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
