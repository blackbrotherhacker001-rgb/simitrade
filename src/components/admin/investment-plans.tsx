
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
import { MoreHorizontal, Edit, Trash, PlusCircle } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const mockPlans = [
    { id: '1', name: 'Conservative Growth', title: 'Conservative Growth Plan', status: true, trending: true, invested: 150000, profit: 5, minProfit: 2.5, maxProfit: 8, minAmount: 100, maxAmount: 10000, defaultResult: 'WIN' },
    { id: '2', name: 'Aggressive Crypto', title: 'Aggressive Crypto Speculation', status: true, trending: false, invested: 75000, profit: 25, minProfit: 10, maxProfit: 50, minAmount: 500, maxAmount: 5000, defaultResult: 'WIN' },
    { id: '3', name: 'Stable Yield', title: 'Stable Yield Farming', status: false, trending: false, invested: 300000, profit: 8, minProfit: 5, maxProfit: 12, minAmount: 1000, maxAmount: 100000, defaultResult: 'WIN' },
];


const planSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  minProfit: z.coerce.number().min(0, 'Must be a positive number'),
  maxProfit: z.coerce.number().min(0, 'Must be a positive number'),
  minAmount: z.coerce.number().min(0, 'Must be a positive number'),
  maxAmount: z.coerce.number().min(0, 'Must be a positive number'),
  defaultResult: z.enum(['WIN', 'LOSS', 'DRAW']),
  status: z.boolean().default(true),
  trending: z.boolean().default(false),
});

type PlanFormValues = z.infer<typeof planSchema>;


export function InvestmentPlans() {
  const [plans, setPlans] = useState(mockPlans);
  const [isCreatePlanOpen, setCreatePlanOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: '',
      title: '',
      description: '',
      minProfit: 0,
      maxProfit: 0,
      minAmount: 0,
      maxAmount: 0,
      defaultResult: 'WIN',
      status: true,
      trending: false,
    },
  });

  const handleCreatePlan = (values: PlanFormValues) => {
    const newPlan = {
      id: (plans.length + 1).toString(),
      ...values,
      invested: 0,
      profit: (values.minProfit + values.maxProfit) / 2, // Example logic
    };
    setPlans([...plans, newPlan]);
    toast({
      title: 'Plan Created',
      description: `The "${values.title}" plan has been successfully created.`,
    });
    setCreatePlanOpen(false);
    form.reset();
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI Investment Plans</CardTitle>
          <CardDescription>
            Create and manage investment opportunities for users.
          </CardDescription>
        </div>
         <Dialog open={isCreatePlanOpen} onOpenChange={setCreatePlanOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Investment Plan</DialogTitle>
              <DialogDescription>
                Configure the parameters for a new user-facing investment plan.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreatePlan)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name (Internal)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Conservative Growth" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (Public)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Conservative Growth Plan" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the investment strategy..." {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                     <FormField
                      control={form.control}
                      name="minProfit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Profit (%)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxProfit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Profit (%)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                     <FormField
                      control={form.control}
                      name="minAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Investment ($)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Investment ($)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="defaultResult"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Result</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a default result" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="WIN">WIN</SelectItem>
                            <SelectItem value="LOSS">LOSS</SelectItem>
                            <SelectItem value="DRAW">DRAW</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full">
                          <div className="space-y-0.5">
                            <FormLabel>Active</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trending"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full">
                          <div className="space-y-0.5">
                            <FormLabel>Trending</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                </div>
                <DialogFooter>
                  <Button type="submit">Create Plan</Button>
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

    
