
"use client";

import { useState } from 'react';
import { Copy, PlusCircle } from 'lucide-react';
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

export function InviteGeneratorDialog({ onInviteGenerated }) {
  const [entityName, setEntityName] = useState('');
  const [entityType, setEntityType] = useState('');
  const [entityEmail, setEntityEmail] = useState('');
  const [newlyGeneratedInvite, setNewlyGeneratedInvite] = useState(null);
  const { toast } = useToast();

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
        id: `inv${Date.now()}`,
        link: link,
        entityName: entityName,
        status: 'Active',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
    };
    
    setNewlyGeneratedInvite(newInvite);
    if(onInviteGenerated) {
        onInviteGenerated(newInvite);
    }
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

  return (
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
  );
}

