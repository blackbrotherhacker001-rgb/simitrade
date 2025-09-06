
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
import { Eye, UserPlus, LogIn, Database } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { MOCK_USERS } from '@/lib/constants';

export default function UserManagementPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [users, setUsers] = useState<User[]>(() => {
        const userList = Object.entries(MOCK_USERS).map(([walletAddress, userData]) => ({
            ...userData,
            walletAddress,
            isAdmin: walletAddress === '0xbd9A66ff3694e47726C1C8DD572A38168217BaA1',
        }));
        userList.sort((a, b) => (a.isAdmin === b.isAdmin) ? 0 : a.isAdmin ? -1 : 1);
        return userList;
    });
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSeedData = async () => {
        toast({
            title: "Database Seeding Disabled",
            description: "This feature is temporarily disabled for stability.",
        });
    }

    const handleViewUser = (userId: string) => {
        router.push(`/admin/users/${userId}`);
    }

    const handleLoginAsUser = (userId: string, isAdmin: boolean) => {
      login(userId, isAdmin);
      router.push(`/user/${userId}/overview`);
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
            <div className="flex gap-2">
                <Button onClick={handleSeedData}>
                    <Database className="mr-2 h-4 w-4" />
                    Seed Database
                </Button>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>
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
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">Loading users...</TableCell>
                        </TableRow>
                    ) : users.length === 0 ? (
                        <TableRow>
                             <TableCell colSpan={6} className="text-center py-8">
                                No users found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map(user => (
                            <TableRow key={user.walletAddress}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.walletAddress}`} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{`${user.name.toLowerCase().replace(/\s/g, '.')}@email.com`}</TableCell>
                                <TableCell>
                                    {user.isAdmin ? <Badge variant="secondary">Admin</Badge> : <Badge variant="outline">User</Badge>}
                                </TableCell>
                                <TableCell>${user.balance.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={'default'}>
                                        Active
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
                                        {!user.isAdmin && (
                                            <Button variant="outline" size="sm" onClick={() => handleLoginAsUser(user.walletAddress, user.isAdmin)}>
                                                <LogIn className="mr-2 h-4 w-4"/>
                                                Login
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm" onClick={() => handleViewUser(user.walletAddress)}>
                                            <Eye className="mr-2 h-4 w-4"/>
                                            View
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    </div>
  );
}
