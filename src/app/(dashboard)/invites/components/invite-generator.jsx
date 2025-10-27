"use client";

import { useState } from 'react';
import { Copy, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

export function InviteGenerator() {
  const [invites, setInvites] = useState(initialInvites);
  const [newLink, setNewLink] = useState('');
  const [entityName, setEntityName] = useState('');
  const [newlyGeneratedInvite, setNewlyGeneratedInvite] = useState(null);
  const { toast } = useToast();

  const generateLink = () => {
    if (!entityName.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide an entity name.',
        variant: 'destructive',
      });
      return;
    }
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    const link = `https://super.app/invite/${uniqueId}`;
    setNewLink(link);

    const newInvite = {
        id: `inv${invites.length + 1}`,
        link: link,
        entityName: entityName,
        status: 'Active',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
    };
    setNewlyGeneratedInvite(newInvite);
    setInvites(prev => [newInvite, ...prev]);
    setEntityName('');
    toast({
        title: 'Invite Generated!',
        description: `Link for ${newInvite.entityName} has been created.`,
    });
  };
  
  const copyToClipboard = () => {
    if(!newLink) return;
    navigator.clipboard.writeText(newLink);
    toast({
      title: 'Copied!',
      description: 'Invite link copied to clipboard.',
    });
  };

  const getLocalDateString = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  }

  return (
    <div className="space-y-6">
        <Dialog onOpenChange={(open) => { if(!open) { setNewLink(''); setNewlyGeneratedInvite(null); }}}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Generate New Invite
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Generate Invite Link</DialogTitle>
                <DialogDescription>Create a new single-use invite link for an entity.</DialogDescription>
                </DialogHeader>
                {newLink && newlyGeneratedInvite ? (
                    <div className="space-y-4 py-4">
                        <p>Here is the new invite link for <strong>{newlyGeneratedInvite.entityName}</strong>:</p>
                        <div className="flex items-center space-x-2">
                            <Input id="new-link" value={newLink} readOnly />
                            <Button type="button" size="icon" onClick={copyToClipboard}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">This link is valid for 30 days.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Entity Name</Label>
                            <Input id="name" value={entityName} onChange={e => setEntityName(e.target.value)} className="col-span-3" placeholder="e.g., Greenwood University" />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    {newLink ? (
                        <DialogClose asChild>
                            <Button type="button">Done</Button>
                        </DialogClose>
                    ) : (
                        <Button type="submit" onClick={generateLink} disabled={!entityName.trim()}>Generate</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>

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
                            <TableCell>{getLocalDateString(invite.expiresAt)}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="sm" onClick={() => {
                                    navigator.clipboard.writeText(invite.link);
                                    toast({ title: 'Copied!' });
                                }}>
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
