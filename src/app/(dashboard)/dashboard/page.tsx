"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, FileText, School, History } from 'lucide-react';
import { collegeStats, organizationStats, auditLogs as recentActivities } from '@/lib/placeholder-data';
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const totalColleges = Object.keys(collegeStats).length;
  const totalOrgs = Object.keys(organizationStats).length;
  const totalStudents = Object.values(collegeStats).flat().reduce((acc, curr) => acc + curr.students, 0);
  const totalJobs = Object.values(organizationStats).flat().reduce((acc, curr) => acc + curr.postings, 0);

  const collegeData = [
    { year: '2021', Greenwood: 450, Oakridge: 300, Pinecrest: 150, Mapleleaf: 0 },
    { year: '2022', Greenwood: 620, Oakridge: 410, Pinecrest: 250, Mapleleaf: 200 },
    { year: '2023', Greenwood: 850, Oakridge: 550, Pinecrest: 350, Mapleleaf: 450 },
    { year: '2024', Greenwood: 980, Oakridge: 630, Pinecrest: 450, Mapleleaf: 700 },
  ];
  
  const orgData = [
    { year: '2022', Innovate: 15, Tech: 0, Future: 0, Quantum: 0 },
    { year: '2023', Innovate: 25, Tech: 5, Future: 30, Quantum: 0 },
    { year: '2024', Innovate: 40, Tech: 12, Future: 55, Quantum: 22 },
  ];

  const collegeChartConfig: ChartConfig = {
    Greenwood: { label: "Greenwood", color: "hsl(var(--chart-1))" },
    Oakridge: { label: "Oakridge", color: "hsl(var(--chart-2))" },
    Pinecrest: { label: "Pinecrest", color: "hsl(var(--chart-3))" },
    Mapleleaf: { label: "Mapleleaf", color: "hsl(var(--chart-4))" },
  } satisfies ChartConfig;

  const orgChartConfig: ChartConfig = {
    Innovate: { label: "Innovate Inc.", color: "hsl(var(--chart-1))" },
    Tech: { label: "Tech Solutions", color: "hsl(var(--chart-2))" },
    Future: { label: "Future Forward", color: "hsl(var(--chart-3))" },
    Quantum: { label: "QuantumLeap", color: "hsl(var(--chart-4))" },
  } satisfies ChartConfig;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
};


  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalColleges}</div>
            <p className="text-xs text-muted-foreground">Managed colleges & universities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrgs}</div>
            <p className="text-xs text-muted-foreground">Managed organizations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Registered across all colleges</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Job Postings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs}</div>
            <p className="text-xs text-muted-foreground">Across all organizations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Tabs defaultValue="colleges">
                <Card>
                    <CardHeader>
                        <CardTitle>Platform Statistics</CardTitle>
                        <CardDescription>
                            An overview of registrations and postings on the platform.
                        </CardDescription>
                         <TabsList className="grid w-full grid-cols-2 mt-4">
                            <TabsTrigger value="colleges">Colleges</TabsTrigger>
                            <TabsTrigger value="organizations">Organizations</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <CardContent>
                        <TabsContent value="colleges">
                            <ChartContainer config={collegeChartConfig} className="min-h-[200px] w-full">
                                <RechartsAreaChart accessibilityLayer data={collegeData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Area dataKey="Greenwood" type="natural" fill="var(--color-Greenwood)" fillOpacity={0.4} stroke="var(--color-Greenwood)" stackId="a" />
                                    <Area dataKey="Oakridge" type="natural" fill="var(--color-Oakridge)" fillOpacity={0.4} stroke="var(--color-Oakridge)" stackId="a" />
                                    <Area dataKey="Pinecrest" type="natural" fill="var(--color-Pinecrest)" fillOpacity={0.4} stroke="var(--color-Pinecrest)" stackId="a" />
                                    <Area dataKey="Mapleleaf" type="natural" fill="var(--color-Mapleleaf)" fillOpacity={0.4} stroke="var(--color-Mapleleaf)" stackId="a" />
                                </RechartsAreaChart>
                            </ChartContainer>
                        </TabsContent>
                        <TabsContent value="organizations">
                           <ChartContainer config={orgChartConfig} className="min-h-[200px] w-full">
                                <RechartsAreaChart accessibilityLayer data={orgData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Area dataKey="Innovate" type="natural" fill="var(--color-Innovate)" fillOpacity={0.4} stroke="var(--color-Innovate)" stackId="a" />
                                    <Area dataKey="Tech" type="natural" fill="var(--color-Tech)" fillOpacity={0.4} stroke="var(--color-Tech)" stackId="a" />
                                    <Area dataKey="Future" type="natural" fill="var(--color-Future)" fillOpacity={0.4} stroke="var(--color-Future)" stackId="a" />
                                    <Area dataKey="Quantum" type="natural" fill="var(--color-Quantum)" fillOpacity={0.4} stroke="var(--color-Quantum)" stackId="a" />
                                </RechartsAreaChart>
                            </ChartContainer>
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>A log of recent important actions in the system.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-9 w-9 border">
                        <AvatarFallback>{getInitials(activity.entity)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            {activity.action}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">{activity.entity}</span>
                            <span className="mx-1">&middot;</span>
                            {getRelativeTime(activity.timestamp)}
                        </p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
