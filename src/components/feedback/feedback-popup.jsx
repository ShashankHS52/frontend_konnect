"use client";

import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';

export function FeedbackPopup() {
    const [message, setMessage] = useState('');
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        if (message.trim().length < 10) {
            toast({
                title: 'Feedback too short',
                description: 'Please provide at least 10 characters.',
                variant: 'destructive',
            });
            return;
        }

        // In a real app, you'd send this to a server.
        // For now, we'll just log it and show a success message.
        console.log('Feedback submitted:', { message });

        toast({
            title: 'Feedback Submitted!',
            description: "Thank you for helping us improve.",
        });
        
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
                    <Textarea
                        id="feedback-message"
                        placeholder="Type your feedback here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="col-span-4 min-h-[120px]"
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={!message.trim()}>
                        <Send className="mr-2 h-4 w-4" />
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
