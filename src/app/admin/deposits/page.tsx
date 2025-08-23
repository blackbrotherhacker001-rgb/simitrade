
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockRequests = [
  { id: '1', user: 'Vitalik Buterin', amount: 1500.00, date: '2025-08-23T14:07:03Z', status: 'pending' },
  { id: '2', user: 'Charles Hoskinson', amount: 500.50, date: '2025-08-23T13:07:03Z', status: 'pending' },
];

export default function DepositsPage() {
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    setRequests(prev => prev.filter(req => req.id !== id));
    toast({
        title: "Request Approved",
        description: "The deposit request has been successfully approved.",
    })
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
    <div className="container mx-auto p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Deposit Requests</CardTitle>
          <CardDescription>
            Review and approve user deposit requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount (USD)</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(request => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.user}</TableCell>
                  <TableCell>${request.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                  <TableCell>{formatDate(request.date)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">{request.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {requests.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No pending requests.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
