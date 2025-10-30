
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { File, MoreHorizontal, CheckCircle, Clock, Paperclip, Loader2, X, CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const getFormattedDate = (timestamp) => {
    try {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
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
    const [nameFilter, setNameFilter] = useState('all');
    const [pageFilter, setPageFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateRange, setDateRange] = useState(undefined);


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

    const uniqueNames = useMemo(() => {
        const names = new Set(feedbackList.map(fb => fb.user));
        return Array.from(names);
    }, [feedbackList]);

    const uniquePages = useMemo(() => {
        const pages = new Set(feedbackList.map(fb => fb.page));
        return Array.from(pages);
    }, [feedbackList]);

    const handleResetFilters = () => {
        setNameFilter('all');
        setPageFilter('all');
        setStatusFilter('all');
        setDateRange(undefined);
    };

    const filteredFeedback = useMemo(() => {
        return feedbackList.filter(feedback => {
            const nameMatch = nameFilter === 'all' || feedback.user === nameFilter;
            const pageMatch = pageFilter === 'all' || feedback.page === pageFilter;
            const statusMatch = statusFilter === 'all' || feedback.status === statusFilter;

            const dateMatch = (() => {
                if (!dateRange || (!dateRange.from && !dateRange.to)) return true;
                const feedbackDate = new Date(feedback.timestamp);
                if (dateRange.from && dateRange.to) {
                    return feedbackDate >= dateRange.from && feedbackDate <= dateRange.to;
                }
                if (dateRange.from) {
                    return feedbackDate >= dateRange.from;
                }
                if (dateRange.to) {
                    return feedbackDate <= dateRange.to;
                }
                return true;
            })();

            return nameMatch && pageMatch && statusMatch && dateMatch;
        });
    }, [feedbackList, nameFilter, pageFilter, statusFilter, dateRange]);

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
                    Review, filter, and manage all feedback submitted by users.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Select value={nameFilter} onValueChange={setNameFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            {uniqueNames.map(name => (
                                <SelectItem key={name} value={name}>{name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={pageFilter} onValueChange={setPageFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Pages</SelectItem>
                             {uniquePages.map(page => (
                                <SelectItem key={page} value={page}>{page}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                     <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={"w-full sm:w-[280px] justify-start text-left font-normal"}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(dateRange.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date range</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleResetFilters} variant="ghost">
                        <X className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Feedback</TableHead>
                                <TableHead>Page</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFeedback.length > 0 ? (
                                filteredFeedback.map((feedback) => {
                                    const StatusIcon = statusConfig[feedback.status]?.icon;
                                    return (
                                        <TableRow key={feedback.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border">
                                                        <AvatarFallback>{getInitials(feedback.user)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{feedback.user}</p>
                                                        <p className="text-xs text-muted-foreground">{feedback.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <p className="truncate text-sm text-muted-foreground">{feedback.message}</p>
                                            </TableCell>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-1 py-0.5 rounded">{feedback.page}</code>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{feedback.formattedDate}</TableCell>
                                            <TableCell>
                                                <Badge variant={statusConfig[feedback.status]?.variant}>
                                                    {StatusIcon && <StatusIcon className="mr-1.5 h-3 w-3" />}
                                                    {statusConfig[feedback.status]?.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                 <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {feedback.screenshot && (
                                                          <Dialog>
                                                              <DialogTrigger asChild>
                                                                  <Button variant="ghost" className="w-full justify-start font-normal h-auto py-1.5 px-2 text-sm">
                                                                    <Paperclip className="mr-2 h-4 w-4" /> View Screenshot
                                                                  </Button>
                                                              </DialogTrigger>
                                                              <DialogContent className="max-w-3xl">
                                                                  <Image src={feedback.screenshot} alt="Feedback screenshot" width={1280} height={720} className="rounded-md w-full h-auto" data-ai-hint="feedback screenshot" />
                                                              </DialogContent>
                                                          </Dialog>
                                                        )}
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
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        No feedback found for the selected filters.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
