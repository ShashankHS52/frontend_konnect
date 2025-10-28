
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { feedback as initialFeedback } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { File, MoreHorizontal, CheckCircle, Clock } from 'lucide-react';

const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
};

const statusConfig = {
    Pending: {
        variant: 'secondary',
        icon: Clock,
        label: 'Pending'
    },
    Resolved: {
        variant: 'default',
        icon: CheckCircle,
        label: 'Resolved'
    },
};

export default function FeedbackPage() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const processedFeedback = initialFeedback.map(fb => ({
            ...fb,
            relativeTime: getRelativeTime(fb.timestamp)
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setFeedbackList(processedFeedback);
    }, []);

    const handleStatusChange = (feedbackId, newStatus) => {
        setFeedbackList(currentList =>
            currentList.map(item =>
                item.id === feedbackId ? { ...item, status: newStatus } : item
            )
        );
    };

    if (!isClient) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Feedback</CardTitle>
                <CardDescription>
                    Review and manage all feedback submitted by users.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {feedbackList.length > 0 ? (
                    feedbackList.map((feedback) => {
                        const StatusIcon = statusConfig[feedback.status]?.icon;
                        return (
                        <div key={feedback.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <Avatar className="h-10 w-10 border">
                                <AvatarFallback>{getInitials(feedback.user)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1.5 flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold leading-none">
                                            {feedback.user}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{feedback.email}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-muted-foreground">{feedback.relativeTime}</p>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleStatusChange(feedback.id, 'Resolved')}>
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Mark as Resolved
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(feedback.id, 'Pending')}>
                                                    <Clock className="mr-2 h-4 w-4" />
                                                     Mark as Pending
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {feedback.message}
                                </p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                    <div className="flex items-center gap-2">
                                        <File className="h-3 w-3" />
                                        <span>Submitted from: <code className="bg-muted px-1 py-0.5 rounded">{feedback.page}</code></span>
                                    </div>
                                    <Badge variant={statusConfig[feedback.status].variant}>
                                        {StatusIcon && (
                                            <StatusIcon className="mr-1.5 h-3 w-3" />
                                        )}
                                        {statusConfig[feedback.status].label}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )})
                ) : (
                    <p className="text-sm text-muted-foreground text-center">No feedback submitted yet.</p>
                )}
            </CardContent>
        </Card>
    );
}
