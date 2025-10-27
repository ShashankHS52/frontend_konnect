
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, FileText, School, History } from 'lucide-react';
import { collegeStats, organizationStats, auditLogs as recentActivities } from '@/lib/placeholder-data';
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const totalColleges = Object.keys(collegeStats).length;
  const totalOrgs = Object.keys(organizationStats).length;
  const totalStudents = Object.values(collegeStats).flat().reduce((acc, curr) => acc + curr.students, 0);
  const totalJobs = Object.values(organizationStats).flat().reduce((acc, curr) => acc + curr.postings, 0);

  const collegeData = Object.entries(collegeStats).map(([name, data]) => ({
    name: name.split(' ').slice(0, 2).join(' '),
    students: data.reduce((acc, curr) => acc + curr.students, 0)
  }));

  const orgData = Object.entries(organizationStats).map(([name, data]) => ({
    name: name.split(' ').slice(0, 2).join(' '),
    postings: data.reduce((acc, curr) => acc + curr.postings, 0)
  }));
  
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
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsBarChart data={collegeData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
                                    <YAxis />
                                    <RechartsTooltip />
                                    <Legend wrapperStyle={{paddingTop: 40}} />
                                    <Bar dataKey="students" fill="hsl(var(--primary))" name="Total Students" />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </TabsContent>
                        <TabsContent value="organizations">
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsBarChart data={orgData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
                                    <YAxis />
                                    <RechartsTooltip />
                                    <Legend wrapperStyle={{paddingTop: 40}} />
                                    <Bar dataKey="postings" fill="hsl(var(--accent))" name="Total Postings" />
                                </RechartsBarChart>
                            </ResponsiveContainer>
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

    