
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auditLogs } from '@/lib/placeholder-data';
import { useEffect, useState } from 'react';

export default function AuditLogsPage() {
    const [logs, setLogs] = useState(auditLogs);

    useEffect(() => {
        // Mocks real-time update
        const interval = setInterval(() => {
            const newLog = {
                id: `log${Date.now()}`,
                timestamp: new Date().toISOString(),
                entity: 'New Entity',
                action: 'Entity Created',
                user: 'system',
                reason: 'Automatic generation'
            };
            setLogs(prev => [newLog, ...prev]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    const getLocalDateTimeString = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return dateString;
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>A log of all important actions performed in the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Entity</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Performed By</TableHead>
                                <TableHead>Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>{getLocalDateTimeString(log.timestamp)}</TableCell>
                                    <TableCell className="font-medium">{log.entity}</TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>{log.user}</TableCell>
                                    <TableCell>{log.reason || 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
