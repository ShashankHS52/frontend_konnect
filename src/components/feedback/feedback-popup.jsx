
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, Send, Paperclip, X, Loader2, PlusCircle } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

function AddUserDialog({ onUserAdded }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const handleAddUser = async () => {
        if (!name.trim() || !email.trim()) {
            toast({
                title: 'Missing Information',
                description: 'Please provide both name and email.',
                variant: 'destructive',
            });
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/test-users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });
            if (!response.ok) throw new Error('Failed to add user');
            const { user } = await response.json();
            toast({ title: 'Success', description: 'New test user added.' });
            onUserAdded(user);
            setName('');
            setEmail('');
            setIsOpen(false);
        } catch (error) {
            toast({ title: 'Error', description: 'Could not add user.', variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-center mt-1">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New User
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add New Test User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-user-name">Name</Label>
                        <Input id="new-user-name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-user-email">Email</Label>
                        <Input id="new-user-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" disabled={isSubmitting}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAddUser} disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function FeedbackPopup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
        if (isOpen) {
            const fetchUsers = async () => {
                try {
                    const response = await fetch('/api/test-users');
                    if (!response.ok) throw new Error('Failed to fetch users');
                    const data = await response.json();
                    setUsers(data);
                } catch (error) {
                    toast({ title: 'Error', description: 'Could not load test users.', variant: 'destructive' });
                }
            };
            fetchUsers();
        }
    }, [isOpen, toast]);

    const handleUserSelect = (userId) => {
        const selectedUser = users.find(u => u._id === userId);
        if (selectedUser) {
            setSelectedUserId(userId);
            setName(selectedUser.name);
            setEmail(selectedUser.email);
        }
    };

    const handleUserAdded = (newUser) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        handleUserSelect(newUser._id);
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setMessage('');
        setScreenshot(null);
        setScreenshotPreview(null);
        setSelectedUserId('');
    };

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScreenshot(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshotPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setScreenshot(null);
            setScreenshotPreview(null);
        }
    };

    const handleSubmit = async () => {
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast({
                title: 'Missing Information',
                description: 'Please fill out all fields.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: name,
                    email,
                    message,
                    page: pathname,
                    screenshot: screenshotPreview, // Send base64 string
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            toast({
                title: 'Feedback Submitted!',
                description: "Thank you for helping us improve.",
            });
            
            resetForm();
            setIsOpen(false);

        } catch (error) {
            console.error('Feedback submission error:', error);
            toast({
                title: 'Submission Failed',
                description: 'Could not submit your feedback. Please try again later.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                resetForm();
            }
        }}>
            <DialogTrigger asChild>
                <Button
                    variant="primary"
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
                    size="icon"
                >
                    <MessageSquare className="h-6 w-6" />
                    <span className="sr-only">Provide Feedback</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Provide Feedback</DialogTitle>
                    <DialogDescription>
                        We'd love to hear your thoughts. Attach a screenshot if it helps explain the issue.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] -mx-6">
                    <div className="grid gap-4 py-4 px-6">
                        <div className="space-y-2">
                            <Label htmlFor="feedback-user">User</Label>
                            <Select
                                value={selectedUserId}
                                onValueChange={handleUserSelect}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger id="feedback-user">
                                    <SelectValue placeholder="Select a user..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map(user => (
                                        <SelectItem key={user._id} value={user._id}>
                                            {user.name} ({user.email})
                                        </SelectItem>
                                    ))}
                                    <AddUserDialog onUserAdded={handleUserAdded} />
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="feedback-message">Feedback</Label>
                            <Textarea
                                id="feedback-message"
                                placeholder="Type your feedback here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-[100px]"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="feedback-screenshot">Attach Screenshot</Label>
                            <Input 
                                id="feedback-screenshot"
                                type="file"
                                accept="image/*"
                                onChange={handleScreenshotChange}
                                className="text-sm"
                                disabled={isSubmitting}
                            />
                            {screenshotPreview && (
                                <div className="mt-2 relative">
                                    <Image
                                        src={screenshotPreview}
                                        alt="Screenshot preview"
                                        width={400}
                                        height={225}
                                        className="rounded-md object-cover w-full h-auto"
                                        data-ai-hint="feedback screenshot"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => {
                                            setScreenshot(null);
                                            setScreenshotPreview(null);
                                            document.getElementById('feedback-screenshot').value = '';
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Remove screenshot</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Submitting from: <code className="bg-muted px-1 py-0.5 rounded">{pathname}</code>
                        </p>
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" disabled={isSubmitting}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={isSubmitting || !name.trim() || !email.trim() || !message.trim()}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

    