
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { MoreHorizontal, Edit, ToggleLeft, ToggleRight, UserPlus, LogIn } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const mockUsers = [
    { id: '1', name: 'Satoshi Nakamoto', wallet_address: '0x1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', balance: 980000.00, is_active: true, last_login_at: '2025-08-23T14:07:03Z' },
    { id: '2', name: 'Vitalik Buterin', wallet_address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', balance: 450000.00, is_active: true, last_login_at: '2025-08-23T13:07:03Z' },
    { id: '3', name: 'Charles Hoskinson', wallet_address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', balance: 250000.00, is_active: true, last_login_at: '2025-08-22T18:30:00Z' },
    { id: '4', name: 'Gavin Wood', wallet_address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', balance: 150000.00, is_active: true, last_login_at: '2025-08-21T11:45:00Z' },
    { id: '5', name: 'Barry Silbert', wallet_address: '0x503828976D22510aad0201ac7EC88293211D23Da', balance: 75000.00, is_active: false, last_login_at: '2025-08-20T09:00:00Z' },
];

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  wallet_address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
  balance: z.coerce.number().min(0, 'Balance cannot be negative'),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [isCreateUserOpen, setCreateUserOpen] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      wallet_address: '',
      balance: 0,
    },
  });

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => user.id === id ? { ...user, is_active: !user.is_active } : user));
  };
  
  const handleLoginAsUser = (walletAddress: string) => {
    login(walletAddress, false);
    router.push('/dashboard');
  };

  const handleCreateUser = (values: CreateUserForm) => {
    const newUser = {
      id: (users.length + 1).toString(),
      name: values.name,
      wallet_address: values.wallet_address,
      balance: values.balance,
      is_active: true,
      last_login_at: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    toast({
      title: 'User Created',
      description: `User ${values.name} has been created successfully.`,
    });
    setCreateUserOpen(false);
    form.reset();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View, manage, and adjust user accounts.
          </CardDescription>
        </div>
        <Dialog open={isCreateUserOpen} onOpenChange={setCreateUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new user account.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateUser)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Satoshi Nakamoto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wallet_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Address</FormLabel>
                      <FormControl>
                        <Input placeholder="0x..." {...field} />
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
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.wallet_address}</TableCell>
                <TableCell>${user.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                <TableCell>
                  <Badge variant={user.is_active ? 'default' : 'destructive'}>
                    {user.is_active ? 'Active' : 'Suspended'}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.last_login_at)}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleLoginAsUser(user.wallet_address)}>
                            <LogIn className="mr-2 h-4 w-4" />
                            Login as User
                        </DropdownMenuItem>
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

    