
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  Settings,
  LogOut,
  Bell,
  Search,
  FileKey,
  History,
  Shield,
  MessageSquare,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FeedbackPopup } from "@/components/feedback/feedback-popup";

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="bg-primary p-2 rounded-lg">
      <Shield className="h-6 w-6 text-primary-foreground" />
    </div>
    <div className="group-data-[collapsible=icon]:hidden">
        <h1 className="text-xl font-bold">SuperAdmin</h1>
    </div>
  </div>
);

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/entities", icon: Briefcase, label: "Entities" },
  { href: "/invites", icon: FileKey, label: "Invites" },
  { href: "/audit-logs", icon: History, label: "Audit Logs" },
];

const secondaryNavItems = [
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: "/settings", icon: Settings, label: "Settings" },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === '/dashboard') return "Dashboard";
    if (pathname.startsWith('/entities')) return "Entity Management";
    if (pathname.startsWith('/invites')) return "Invite Link Management";
    if (pathname.startsWith('/audit-logs')) return "Audit Logs";
    if (pathname.startsWith('/notifications')) return "Notifications";
    if (pathname.startsWith('/settings')) return "Settings";
    return "SuperAdmin";
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="flex h-16 items-center p-4">
            <Logo />
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start gap-3"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 space-y-4 border-t border-sidebar-border">
          <SidebarMenu>
             {secondaryNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start gap-3"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto">
                    <Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="user avatar" width={40} height={40} className="rounded-full" data-ai-hint="profile avatar" />
                    <div className="text-left group-data-[collapsible=icon]:hidden">
                        <p className="font-medium text-sm">Super Admin</p>
                        <p className="text-xs text-sidebar-foreground/70">admin@super.app</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mb-2 w-56" side="right" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/settings">
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/login">
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold md:text-xl">
            {getPageTitle()}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 bg-background" />
            </div>
            <Link href="/notifications">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">2</Badge>
                </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="user avatar" width={32} height={32} className="rounded-full" data-ai-hint="profile avatar" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <Link href="/login"><DropdownMenuItem>Logout</DropdownMenuItem></Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-background">
          {children}
        </main>
        <FeedbackPopup />
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
