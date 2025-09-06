
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockLoginHistory = [
    { id: 1, device: 'Chrome on Windows', ip: '192.168.1.101', location: 'New York, USA', time: '2025-08-23 14:07:03', status: 'Success' },
    { id: 2, device: 'Safari on iPhone', ip: '10.0.0.5', location: 'San Francisco, USA', time: '2025-08-22 18:30:15', status: 'Success' },
    { id: 3, device: 'Firefox on Linux', ip: '203.0.113.45', location: 'London, UK', time: '2025-08-21 10:05:45', status: 'Failed' },
    { id: 4, device: 'Chrome on Android', ip: '198.51.100.12', location: 'Tokyo, Japan', time: '2025-08-20 09:01:22', status: 'Success' },
]

export function LoginHistory() {

    const getStatusVariant = (status: string) => {
        if(status === 'Success') return 'default';
        return 'destructive';
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login History</CardTitle>
        <CardDescription>
          A record of recent login attempts to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLoginHistory.map(login => (
              <TableRow key={login.id}>
                <TableCell className="font-medium">{login.device}</TableCell>
                <TableCell>{login.location}</TableCell>
                <TableCell>{login.ip}</TableCell>
                <TableCell>{formatDate(login.time)}</TableCell>
                <TableCell className="text-right">
                    <Badge variant={getStatusVariant(login.status)}>
                        {login.status}
                    </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
