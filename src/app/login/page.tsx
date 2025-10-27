import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Logo = () => (
    <div className="flex items-center gap-2">
    <div className="bg-primary p-2 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="h-6 w-6"
      >
        <path d="M12.82,2.2L6.87,4.64C5.11,5.29 4.35,7.34 5.3,8.93L6.15,10.29L14,6.24L12.82,2.2M13.25,6.91L7,10.95L8,12.35C8.94,13.94 11,14.69 12.75,14.04L19.23,11.43L13.25,6.91M18.5,12.19L12.03,14.8C10.28,15.45 8.23,14.69 7.29,13.1L6.2,11.5L2,13.91V18.5C2,20.43 3.57,22 5.5,22H18.5C20.43,22 22,20.43 22,18.5V13.91L18.5,12.19Z" />
      </svg>
    </div>
    <div>
        <h1 className="text-2xl font-bold">fillow.</h1>
        <p className="text-xs text-muted-foreground">SaaS Admin Dashboard</p>
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
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user_id">User ID</Label>
              <Input id="user_id" placeholder="admin@example.com" required type="text" defaultValue="leviregar@mail.com"/>
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
