import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

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

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex items-center justify-center">
            <Logo />
          </div>
          <CardTitle className="text-2xl">SuperAdmin Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user_id">User ID</Label>
              <Input id="user_id" placeholder="admin@super.app" required type="text" defaultValue="admin@super.app"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" defaultValue="password" />
            </div>
            <Button className="w-full mt-4" asChild>
              <Link href="/dashboard">
                Login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
