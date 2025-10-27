"use client";

import { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [entityName, setEntityName] = useState('');
  const [entityType, setEntityType] = useState('');
  const [entityEmail, setEntityEmail] = useState('');
  const [newlyGeneratedInvite, setNewlyGeneratedInvite] = useState(null);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateLink = () => {
    if (!entityName.trim() || !entityType || !entityEmail.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields.',
        variant: 'destructive',
      });
      return;
    }
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    const link = `${window.location.origin}/register/${uniqueId}?name=${encodeURIComponent(entityName)}&type=${encodeURIComponent(entityType)}&email=${encodeURIComponent(entityEmail)}`;

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
    setEntityType('');
    setEntityEmail('');
    toast({
        title: 'Invite Generated!',
        description: `Link for ${newInvite.entityName} has been created.`,
    });
  };
  
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
        <Dialog onOpenChange={(open) => { if(!open) { setNewlyGeneratedInvite(null); }}}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Generate New Invite
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>Generate Invite Link</DialogTitle>
                  <DialogDescription>Create a new single-use invite link for an entity.</DialogDescription>
                </DialogHeader>
                {newlyGeneratedInvite ? (
                    <div className="space-y-4 py-4">
                        <p>Here is the new registration link for <strong>{newlyGeneratedInvite.entityName}</strong>:</p>
                        <div className="flex items-center space-x-2">
                            <Input id="new-link" value={newlyGeneratedInvite.link} readOnly />
                            <Button type="button" size="icon" onClick={() => copyToClipboard(newlyGeneratedInvite.link)}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">This link is valid for 30 days and has been sent to the entity's email.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Entity Type</Label>
                            <Select onValueChange={setEntityType} value={entityType} className="col-span-3">
                              <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="College">College/University</SelectItem>
                                <SelectItem value="Organization">Organization</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Entity Name</Label>
                            <Input id="name" value={entityName} onChange={e => setEntityName(e.target.value)} className="col-span-3" placeholder="e.g., Greenwood University" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" value={entityEmail} onChange={e => setEntityEmail(e.target.value)} className="col-span-3" placeholder="e.g., contact@greenwood.edu" />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    {newlyGeneratedInvite ? (
                        <DialogClose asChild>
                            <Button type="button">Done</Button>
                        </DialogClose>
                    ) : (
                        <Button type="submit" onClick={generateLink} disabled={!entityName.trim() || !entityType || !entityEmail.trim()}>Generate</Button>
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
