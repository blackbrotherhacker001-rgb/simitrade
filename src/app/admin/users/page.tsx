
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Eye, UserPlus, LogIn, Database, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { MOCK_USERS } from '@/lib/constants';

const addUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  balance: z.coerce.number().min(0, { message: "Balance must be a non-negative number." }),
});

type AddUserFormValues = z.infer<typeof addUserSchema>;

export default function UserManagementPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<AddUserFormValues>({
        resolver: zodResolver(addUserSchema),
        defaultValues: {
            name: "",
            balance: 1000,
        },
    });

    const fetchUsers = () => {
        setLoading(true);
        const userList = Object.entries(MOCK_USERS).map(([walletAddress, data]) => ({
            ...data,
            walletAddress,
            isAdmin: walletAddress === '0xbd9A66ff3694e47726C1C8DD572A38168217BaA1',
        }));
        userList.sort((a, b) => (a.isAdmin === b.isAdmin) ? 0 : a.isAdmin ? -1 : 1);
        setUsers(userList);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = (values: AddUserFormValues) => {
        const newWalletAddress = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        const newUser: User = {
            walletAddress: newWalletAddress,
            name: values.name,
            balance: values.balance,
            isAdmin: false,
            lastLoginAt: new Date().toISOString(),
        };

        // In a real app, this would be an API call. Here, we just add to the local state.
        MOCK_USERS[newWalletAddress] = {
            name: newUser.name,
            balance: newUser.balance,
            lastLoginAt: newUser.lastLoginAt!,
        };
        
        setUsers(prevUsers => [...prevUsers, newUser]);
        
        toast({
            title: "User Added",
            description: `${values.name} has been added successfully.`,
        });
        
        setAddUserDialogOpen(false);
        form.reset();
    };

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
                <Dialog open={isAddUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New User</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to add a new user to the system.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="balance"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Initial Balance (USD)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="button" variant="secondary" onClick={() => setAddUserDialogOpen(false)}>Cancel</Button>
                                    <Button type="submit">Create User</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
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
