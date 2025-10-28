
"use client";

import { Shield } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';

const Logo = () => (
    <div className="flex items-center gap-2">
      <div className="bg-primary p-2 rounded-lg">
        <Shield className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
          <h1 className="text-xl font-bold">SuperAdmin</h1>
          <p className="text-xs text-muted-foreground">Feedback Portal</p>
      </div>
    </div>
  );

export default function FeedbackLayout({ children }) {
  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
        <Link href="/dashboard">
            <Logo />
        </Link>
      </header>
      <main className="flex-1 p-4 sm:p-6 bg-background">
        {children}
      </main>
      <Toaster />
    </>
  );
}
