"use client";

import { MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { entities, type Entity } from '@/lib/placeholder-data';
import { useState } from 'react';

const statusVariants: { [key in Entity['status']]: BadgeProps['variant']} = {
    Activated: 'default',
    Suspended: 'destructive',
    Deactivated: 'secondary',
};

const StatusBadge = ({ status }: { status: Entity['status'] }) => (
    <Badge variant={statusVariants[status]}>
        {status}
    </Badge>
);

export function EntityTable() {
    const [entityList, setEntityList] = useState<Entity[]>(entities);

    return (
        <div className="w-full rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Entity Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered On</TableHead>
                    <TableHead>Link Expiry</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {entityList.map((entity) => (
                <TableRow key={entity.id}>
                    <TableCell className="font-medium">{entity.name}</TableCell>
                    <TableCell>{entity.type}</TableCell>
                    <TableCell><StatusBadge status={entity.status} /></TableCell>
                    <TableCell>{new Date(entity.registeredOn).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(entity.linkExpiry).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Activate</DropdownMenuItem>
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                            <DropdownMenuItem>Suspend</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    );
}
