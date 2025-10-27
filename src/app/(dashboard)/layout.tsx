
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Home,
  Briefcase,
  FileText,
  BarChart2,
  Plug,
  Settings,
  LogOut,
  Bell,
  Search,
  Moon,
  Sun,
  LayoutGrid,
  File,
  Puzzle,
  List,
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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
    <div className="group-data-[collapsible=icon]:hidden">
        <h1 className="text-2xl font-bold">fillow.</h1>
        <p className="text-xs text-muted-foreground">SaaS Admin Dashboard</p>
    </div>
  </div>
);

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/cms", icon: LayoutGrid, label: "CMS", badge: "New" },
  { href: "/apps", icon: File, label: "Apps" },
  { href: "/charts", icon: BarChart2, label: "Charts" },
  { href: "/bootstrap", icon: Briefcase, label: "Bootstrap" },
  { href: "/plugins", icon: Plug, label: "Plugins" },
  { href: "/widget", icon: Puzzle, label: "Widget" },
  { href: "/forms", icon: FileText, label: "Forms" },
  { href: "/table", icon: List, label: "Table" },
  { href: "/pages", icon: File, label: "Pages" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    for (const item of navItems) {
      if (pathname.startsWith(item.href)) {
        return item.label;
      }
    }
    return "Dashboard";
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="flex h-[88px] items-center p-4">
            <Logo />
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href="#">
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start gap-3"
                  >
                    <item.icon />
                    <span>{item.label}</span>
                    {item.badge && <Badge variant="destructive" className="ml-auto">{item.badge}</Badge>}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 space-y-4 border-t border-sidebar-border">
          <div className="group-data-[collapsible=icon]:hidden space-y-2">
            <div className="flex justify-between items-center text-sm">
                <p>My Progress</p>
                <p>20/45</p>
            </div>
            <Progress value={20/45 * 100} className="h-2"/>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto">
                    <Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="user avatar" width={40} height={40} className="rounded-full" />
                    <div className="text-left group-data-[collapsible=icon]:hidden">
                        <p className="font-medium text-sm">Levi Siregar</p>
                        <p className="text-xs text-sidebar-foreground/70">leviregar@mail.com</p>
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
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold md:text-xl">
            {getPageTitle()}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search here..." className="pl-10 bg-background" />
            </div>
            <Button variant="ghost" size="icon">
                <Moon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs">2</Badge>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="user avatar" width={32} height={32} className="rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/login"><DropdownMenuItem>Logout</DropdownMenuItem></Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-background">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
