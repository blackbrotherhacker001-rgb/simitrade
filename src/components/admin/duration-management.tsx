
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
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const mockDurations = [
    { id: '1', timeframe: 'HOUR', value: 1, status: true },
    { id: '2', timeframe: 'DAY', value: 1, status: true },
    { id: '3', timeframe: 'DAY', value: 7, status: false },
    { id: '4', timeframe: 'MONTH', value: 1, status: true },
];


const durationSchema = z.object({
  timeframe: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH']),
  value: z.coerce.number().min(1, 'Duration value must be at least 1'),
  status: z.boolean().default(true),
});

type DurationFormValues = z.infer<typeof durationSchema>;


export function DurationManagement() {
  const [durations, setDurations] = useState(mockDurations);
  const [isCreateDurationOpen, setCreateDurationOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<DurationFormValues>({
    resolver: zodResolver(durationSchema),
    defaultValues: {
      timeframe: 'DAY',
      value: 1,
      status: true,
    },
  });

  const handleCreateDuration = (values: DurationFormValues) => {
    const newDuration = {
      id: (durations.length + 1).toString(),
      ...values,
    };
    setDurations([...durations, newDuration]);
    toast({
      title: 'Duration Created',
      description: `The "${values.value} ${values.timeframe.toLowerCase()}" duration has been created.`,
    });
    setCreateDurationOpen(false);
    form.reset();
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Duration Management</CardTitle>
          <CardDescription>
            Create and manage timeframes for investment plans.
          </CardDescription>
        </div>
         <Dialog open={isCreateDurationOpen} onOpenChange={setCreateDurationOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Duration
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Create New Duration</DialogTitle>
              <DialogDescription>
                Set up a new timeframe for investment plans.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateDuration)} className="space-y-4">
                 <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeframe Type</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a timeframe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="HOUR">Hour(s)</SelectItem>
                            <SelectItem value="DAY">Day(s)</SelectItem>
                            <SelectItem value="WEEK">Week(s)</SelectItem>
                            <SelectItem value="MONTH">Month(s)</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration Value</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 7" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Active Status</FormLabel>
                         <FormDescription>
                            Enable or disable this duration for new plans.
                          </FormDescription>
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
                <DialogFooter>
                  <Button type="submit">Create Duration</Button>
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
              <TableHead>Duration</TableHead>
              <TableHead>Timeframe</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {durations.map(duration => (
              <TableRow key={duration.id}>
                <TableCell className="font-medium">{duration.value}</TableCell>
                <TableCell>{duration.timeframe}</TableCell>
                <TableCell>
                  <Badge variant={duration.status ? 'default' : 'destructive'}>
                    {duration.status ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
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
