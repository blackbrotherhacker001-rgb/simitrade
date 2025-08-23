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
import { MoreHorizontal, Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockUsers = [
  { id: '1', name: 'Alice', wallet_address: '0x123...def', balance: 10500.50, is_active: true, last_login_at: '2024-05-20 10:00:00' },
  { id: '2', name: 'Bob', wallet_address: '0x456...abc', balance: 7300.00, is_active: true, last_login_at: '2024-05-20 09:30:00' },
  { id: '3', name: 'Charlie', wallet_address: '0x789...xyz', balance: 0.00, is_active: false, last_login_at: '2024-05-18 12:00:00' },
  { id: '4', name: 'David', wallet_address: '0xabc...123', balance: 25000.75, is_active: true, last_login_at: '2024-05-19 18:45:00' },
];


export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, is_active: !user.is_active } : user));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View, manage, and adjust user accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.wallet_address}</TableCell>
                <TableCell>${user.balance.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={user.is_active ? 'default' : 'destructive'}>
                    {user.is_active ? 'Active' : 'Suspended'}
                  </Badge>
                </TableCell>
                <TableCell>{user.last_login_at}</TableCell>
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
                            Adjust Balance
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                            {user.is_active ? <ToggleLeft className="mr-2 h-4 w-4" /> : <ToggleRight className="mr-2 h-4 w-4" />}
                            {user.is_active ? 'Suspend' : 'Activate'}
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
