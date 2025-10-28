"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { feedback as initialFeedback } from '@/lib/placeholder-data';

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

    if (!isClient) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Feedback</CardTitle>
                <CardDescription>
                    Review all feedback submitted by users during the testing phase.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {feedbackList.length > 0 ? (
                    feedbackList.map((feedback) => (
                        <div key={feedback.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <Avatar className="h-10 w-10 border">
                                <AvatarFallback>{getInitials(feedback.user)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1.5 flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold leading-none">
                                        {feedback.user}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{feedback.relativeTime}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {feedback.message}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground text-center">No feedback submitted yet.</p>
                )}
            </CardContent>
        </Card>
    );
}
