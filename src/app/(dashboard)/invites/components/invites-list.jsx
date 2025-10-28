
"use client";

import { useState, useEffect } from 'react';
import { Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { invites as initialInvites } from '@/lib/placeholder-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const statusVariants = {
    Active: 'default',
    Used: 'secondary',
    Expired: 'destructive',
};

const StatusBadge = ({ status }) => (
    <Badge variant={statusVariants[status]}>
        {status}
    </Badge>
);

export function InvitesList() {
  const [invites, setInvites] = useState(initialInvites);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    toast({
      title: 'Copied!',
      description: 'Invite link copied to clipboard.',
    });
  };

  if (!isClient) {
      return null;
  }

  return (
    <div className="space-y-6">
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Entity Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Expires At</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invites.map((invite) => (
                        <TableRow key={invite.id}>
                            <TableCell className="font-medium">{invite.entityName}</TableCell>
                            <TableCell>
                                <StatusBadge status={invite.status} />
                            </TableCell>
                            <TableCell>{new Date(invite.expiresAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(invite.link)}>
                                    <Copy className="mr-2 h-3 w-3" />
                                    Copy Link
                                </Button>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => setInvites(invites.filter(i => i.id !== invite.id))}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                    <span className="sr-only">Delete invite</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
