
"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, Send, Paperclip, X } from 'lucide-react';
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

export function FeedbackPopup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const resetForm = () => {
        setName('');
        setEmail('');
        setMessage('');
        setScreenshot(null);
        setScreenshotPreview(null);
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
        console.log('Feedback submitted:', { name, email, message, page: pathname, screenshot: screenshotPreview });

        toast({
            title: 'Feedback Submitted!',
            description: "Thank you for helping us improve.",
        });
        
        resetForm();
        setIsOpen(false);
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
                    <div className="space-y-2">
                        <Label htmlFor="feedback-screenshot">Attach Screenshot</Label>
                        <Input 
                            id="feedback-screenshot"
                            type="file"
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            className="text-sm"
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
