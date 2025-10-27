"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
    {
        id: 1,
        title: "New Entity Registration",
        description: "Greenwood University has submitted their registration form for review.",
        time: "15m ago",
        read: false,
    },
    {
        id: 2,
        title: "Invite Link Expired",
        description: "The invite link for 'QuantumLeap Corp' has expired.",
        time: "1h ago",
        read: false,
    },
    {
        id: 3,
        title: "Status Change",
        description: "Oakridge College status has been changed to 'Suspended'.",
        time: "3h ago",
        read: true,
    },
    {
        id: 4,
        title: "Invite Link Sent",
        description: "An invite link has been successfully sent to 'Future Forward'.",
        time: "1d ago",
        read: true,
    },
];

const getInitials = (name) => {
    if(!name) return '';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}


export default function NotificationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Review all system notifications and alerts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Mark all as read</Button>
            <Button variant="destructive" size="sm">Clear all</Button>
        </div>
        <div className="rounded-md border">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 ${!notification.read ? 'bg-accent/20' : ''} ${index < notifications.length - 1 ? 'border-b' : ''}`}
            >
              <Avatar className="h-9 w-9 border">
                <AvatarFallback className={!notification.read ? 'bg-primary text-primary-foreground' : ''}>
                    <Bell className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1 flex-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">{notification.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
