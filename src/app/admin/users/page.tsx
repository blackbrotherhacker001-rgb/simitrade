
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
import { Eye, UserPlus, LogIn } from 'lucide-react';
import { MOCK_USERS, useAuth } from '@/hooks/use-auth';

const users = Object.entries(MOCK_USERS).map(([walletAddress, userData], index) => ({
    id: walletAddress,
    name: userData.name,
    email: `${userData.name.toLowerCase().replace(/\s/g, '.')}@email.com`,
    avatar: `https://i.pravatar.cc/150?u=${walletAddress}`,
    balance: userData.balance,
    status: index % 2 === 0 ? 'Active' : 'Banned',
    isAdmin: userData.name === 'Admin User'
}));


export default function UserManagementPage() {
    const router = useRouter();
    const { login } = useAuth();

    const handleViewUser = (userId: string) => {
        // For now, we navigate to a generic detail page.
        // In a real app, this would be `/admin/users/${userId}`
        router.push('/admin/users/detail');
    }

    const handleLoginAsUser = (userId: string) => {
      login(userId, false);
      router.push('/user/overview');
    }

  return (
    <div className="container mx-auto p-4 md:p-6">
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
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline" size="sm" onClick={() => handleLoginAsUser(user.id)}>
                                        <LogIn className="mr-2 h-4 w-4"/>
                                        Login
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleViewUser(user.id)}>
                                        <Eye className="mr-2 h-4 w-4"/>
                                        View
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    </div>
  );
}
