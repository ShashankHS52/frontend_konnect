"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';
import Image from 'next/image';

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-primary p-2 rounded-lg">
      <Shield className="h-6 w-6 text-primary-foreground" />
    </div>
    <div>
        <h1 className="text-2xl font-bold">SuperAdmin</h1>
        <p className="text-xs text-muted-foreground">Internship Management Platform</p>
    </div>
  </div>
);

export default function RegistrationPage({ params }) {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const entityName = searchParams.get('name') || '';
  const entityType = searchParams.get('type') || '';
  const entityEmail = searchParams.get('email') || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
        title: "Registration Submitted!",
        description: "Your details have been submitted for review. You'll be notified once approved.",
    });
    // Here you would typically handle form submission to your backend
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl">Entity Registration</CardTitle>
          <CardDescription>
            Complete the form below to register your {entityType || 'organization'}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" required defaultValue={entityName} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required defaultValue={entityEmail} />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" type="url" placeholder="https://example.com" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="establishedYear">Established Year</Label>
                        <Input id="establishedYear" type="number" placeholder="e.g., 1998" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium">Location</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                        <Label htmlFor="address">Full Address</Label>
                        <Textarea id="address" placeholder="123 Main Street" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="state">State / Province</Label>
                        <Input id="state" placeholder="NY" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="USA" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" placeholder="10001" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium">Branding</h3>
                <div className="space-y-1">
                    <Label htmlFor="image">Logo / Image</Label>
                    <Input id="image" type="file" accept="image/*" />
                    <p className="text-xs text-muted-foreground">Upload a logo or a representative image for your entity.</p>
                </div>
            </div>

            <Button className="w-full mt-4" type="submit">
              Submit for Review
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
