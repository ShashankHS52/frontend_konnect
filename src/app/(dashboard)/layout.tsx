
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Building2,
  FileClock,
  LayoutDashboard,
  Link2,
  LogOut,
  Settings,
  User,
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
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/entities", icon: Building2, label: "Entities" },
  { href: "/invites", icon: Link2, label: "Invites" },
  { href: "/audit-logs", icon: FileClock, label: "Audit Logs" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    for (const item of navItems) {
      if (pathname.startsWith(item.href)) {
        return item.label;
      }
    }
    return "SuperAdmin";
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="flex h-14 items-center border-b border-sidebar-border p-2">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">SuperAdmin</span>
            </div>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 p-2">
                    <div className="size-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                        <User className="w-4 h-4 text-sidebar-accent-foreground" />
                    </div>
                    <div className="text-left group-data-[collapsible=icon]:hidden">
                        <p className="font-medium text-sm">Admin User</p>
                        <p className="text-xs text-sidebar-foreground/70">admin@super.app</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mb-2 w-56" side="right" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
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
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold md:text-xl">
            {getPageTitle()}
          </h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-background">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
