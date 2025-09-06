
'use client';

import { useState, useEffect } from 'react';
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
import { Eye, UserPlus, LogIn, Database, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { seedUsers } from '@/lib/seed-db';

export default function UserManagementPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);
    const { toast } = useToast();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersCollection = collection(db, 'users');
            const userSnapshot = await getDocs(usersCollection);
            const userList = userSnapshot.docs.map(doc => doc.data() as User);
             // Sort to ensure admin user is always at the top
            userList.sort((a, b) => (a.isAdmin === b.isAdmin) ? 0 : a.isAdmin ? -1 : 1);
            setUsers(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast({
                variant: "destructive",
                title: "Failed to load users",
                description: "Could not retrieve user data from the database.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSeedData = async () => {
        setSeeding(true);
        try {
            const result = await seedUsers();
            if (result.success) {
                toast({
                    title: "Database Seeded",
                    description: `${result.count} users have been added to the database.`,
                });
                await fetchUsers(); // Refresh the user list
            } else {
                throw result.error;
            }
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Database Seeding Failed",
                description: "Could not seed the database. Check console for errors.",
            });
        } finally {
            setSeeding(false);
        }
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
                <Button onClick={handleSeedData} disabled={seeding}>
                    {seeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                    {seeding ? 'Seeding...' : 'Seed Database'}
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
                            <TableCell colSpan={6} className="text-center py-8">
                                <div className="flex justify-center items-center">
                                    <Loader2 className="mr-2 h-6 w-6 animate-spin"/>
                                    Loading users...
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : users.length === 0 ? (
                        <TableRow>
                             <TableCell colSpan={6} className="text-center py-8">
                                No users found. Click "Seed Database" to populate users.
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
