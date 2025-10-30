
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { File, MoreHorizontal, CheckCircle, Clock, Paperclip, Loader2 } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getFormattedDate = (timestamp) => {
    try {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    } catch {
        return timestamp;
    }
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
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchFeedback = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/feedback');
            if (!response.ok) {
                throw new Error('Failed to fetch feedback');
            }
            const data = await response.json();
            const processedFeedback = data.map(fb => ({
                ...fb,
                id: fb._id, // Use MongoDB's _id
                formattedDate: getFormattedDate(fb.timestamp)
            }));
            setFeedbackList(processedFeedback);
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Could not load feedback.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    const handleStatusChange = async (feedbackId, newStatus) => {
        try {
            const response = await fetch('/api/feedback', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: feedbackId, status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            
            setFeedbackList(currentList =>
                currentList.map(item =>
                    item.id === feedbackId ? { ...item, status: newStatus } : item
                )
            );
            toast({
                title: 'Status Updated',
                description: `Feedback marked as ${newStatus}.`,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Could not update status.',
                variant: 'destructive',
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
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
                                        <p className="text-xs text-muted-foreground">{feedback.formattedDate}</p>
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
                                {feedback.screenshot && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="mt-2 w-fit">
                                                <Paperclip className="mr-2 h-4 w-4" />
                                                View Screenshot
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                            <Image src={feedback.screenshot} alt="Feedback screenshot" width={1280} height={720} className="rounded-md w-full h-auto" data-ai-hint="feedback screenshot" />
                                        </DialogContent>
                                    </Dialog>
                                )}
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                                    <div className="flex items-center gap-2">
                                        <File className="h-3 w-3" />
                                        <span>Submitted from: <code className="bg-muted px-1 py-0.5 rounded">{feedback.page}</code></span>
                                    </div>
                                    <Badge variant={statusConfig[feedback.status]?.variant}>
                                        {StatusIcon && (
                                            <StatusIcon className="mr-1.5 h-3 w-3" />
                                        )}
                                        {statusConfig[feedback.status]?.label}
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
