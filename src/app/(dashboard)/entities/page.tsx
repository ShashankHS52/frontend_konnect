"use client";

import { EntityTable } from './components/entity-table';
import { entities } from '@/lib/placeholder-data';
import { subDays, isBefore, parseISO } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EntitiesPage() {
  const [expiringSoon, setExpiringSoon] = useState<typeof entities>([]);

  useEffect(() => {
    const now = new Date();
    const thirtyDaysFromNow = subDays(now, -30);

    const expiring = entities
      .filter(e => {
          try {
              const expiryDate = parseISO(e.linkExpiry);
              return isBefore(expiryDate, thirtyDaysFromNow) && isBefore(now, expiryDate);
          } catch {
              return false;
          }
      })
      .sort((a, b) => parseISO(a.linkExpiry).getTime() - parseISO(b.linkExpiry).getTime());
    setExpiringSoon(expiring);
  }, []);


  return (
    <div className="flex flex-col gap-6">
      {expiringSoon.length > 0 && (
         <Card className="border-accent">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <AlertCircle className="w-6 h-6 text-accent" />
                <CardTitle>Entities with Links Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-1 text-sm">
                    {expiringSoon.map(entity => (
                        <li key={entity.id} className="flex justify-between">
                            <span>{entity.name}</span>
                            <span className="font-medium text-accent">
                                Expires on {new Date(entity.linkExpiry).toLocaleDateString()}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
         </Card>
      )}
     
      <Card>
        <CardHeader>
            <CardTitle>All Entities</CardTitle>
            <CardDescription>Review and manage all registered colleges and organizations.</CardDescription>
        </CardHeader>
        <CardContent>
            <EntityTable />
        </CardContent>
      </Card>
    </div>
  );
}
