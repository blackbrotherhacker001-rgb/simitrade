
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, UserPlus } from 'lucide-react';
import { MOCK_USERS } from '@/hooks/use-auth';

const users = Object.entries(MOCK_USERS).map(([walletAddress, userData], index) => ({
    id: walletAddress,
    name: userData.name,
    email: `${userData.name.toLowerCase().replace(/\s/g, '.')}@email.com`,
    avatar: `https://i.pravatar.cc/150?u=${walletAddress}`,
    balance: userData.balance,
    status: index % 2 === 0 ? 'Active' : 'Banned',
    isAdmin: userData.name === 'Admin User'
}));


export function UserManagement() {
    const router = useRouter();

    const handleViewUser = (userId: string) => {
        // For now, we navigate to a generic detail page.
        // In a real app, this would be `/admin/users/${userId}`
        router.push('/admin/users/detail');
    }

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>User List</CardTitle>
                <CardDescription>
                    Browse and manage all registered users on the platform.
                </CardDescription>
            </div>
            <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
            </Button>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{user.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                             <TableCell>
                                {user.isAdmin ? <Badge variant="secondary">Admin</Badge> : <Badge variant="outline">User</Badge>}
                            </TableCell>
                            <TableCell>${user.balance.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                                {user.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" onClick={() => handleViewUser(user.id)}>
                                    <Eye className="mr-2 h-4 w-4"/>
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
