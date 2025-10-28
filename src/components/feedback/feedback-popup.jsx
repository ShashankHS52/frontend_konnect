
"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, Send } from 'lucide-react';
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

export function FeedbackPopup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleSubmit = () => {
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast({
                title: 'Missing Information',
                description: 'Please fill out all fields.',
                variant: 'destructive',
            });
            return;
        }

        // In a real app, you'd send this to a server.
        // For now, we'll just log it and show a success message.
        console.log('Feedback submitted:', { name, email, message, page: pathname });

        toast({
            title: 'Feedback Submitted!',
            description: "Thank you for helping us improve.",
        });
        
        setName('');
        setEmail('');
        setMessage('');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Provide Feedback</DialogTitle>
                    <DialogDescription>
                        We'd love to hear your thoughts on what we can improve.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="feedback-name">Name</Label>
                        <Input 
                            id="feedback-name"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="feedback-email">Email</Label>
                        <Input 
                            id="feedback-email"
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="feedback-message">Feedback</Label>
                        <Textarea
                            id="feedback-message"
                            placeholder="Type your feedback here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Submitting from: <code className="bg-muted px-1 py-0.5 rounded">{pathname}</code>
                    </p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={!name.trim() || !email.trim() || !message.trim()}>
                        <Send className="mr-2 h-4 w-4" />
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
