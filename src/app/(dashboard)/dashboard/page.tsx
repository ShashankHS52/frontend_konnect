
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart, Briefcase, FileText, PieChart, School } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { collegeStats, organizationStats } from '@/lib/placeholder-data';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';


export default function DashboardPage() {

  const totalColleges = Object.keys(collegeStats).length;
  const totalOrgs = Object.keys(organizationStats).length;

  const totalStudents = Object.values(collegeStats).flat().reduce((acc, curr) => acc + curr.students, 0);
  const totalJobs = Object.values(organizationStats).flat().reduce((acc, curr) => acc + curr.postings, 0);

  const collegeData = Object.entries(collegeStats).map(([name, data]) => ({
    name: name.split(' ').slice(0,2).join(' '),
    students: data.reduce((acc, curr) => acc + curr.students, 0)
  }));

  const orgData = Object.entries(organizationStats).map(([name, data]) => ({
    name: name.split(' ').slice(0,2).join(' '),
    postings: data.reduce((acc, curr) => acc + curr.postings, 0)
  }));


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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>College Registration Statistics</CardTitle>
                <CardDescription>Total students registered per college</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={collegeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="students" fill="hsl(var(--primary))" name="Total Students" />
                  </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Organization Internship Statistics</CardTitle>
                <CardDescription>Total jobs/internships posted per organization</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={orgData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="postings" fill="hsl(var(--accent))" name="Total Postings" />
                  </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
