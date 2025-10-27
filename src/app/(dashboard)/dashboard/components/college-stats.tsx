"use client";

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { collegeStats } from '@/lib/placeholder-data';

const colleges = Object.keys(collegeStats);
const chartConfig = {
  students: {
    label: 'Students',
    color: 'hsl(var(--chart-1))',
  },
};

export function CollegeStats() {
  const [selectedCollege, setSelectedCollege] = useState(colleges[0]);

  const chartData = collegeStats[selectedCollege as keyof typeof collegeStats];

  return (
    <Card>
      <CardHeader>
        <CardTitle>College Registration Statistics</CardTitle>
        <CardDescription>Total students registered per college annually.</CardDescription>
        <Select value={selectedCollege} onValueChange={setSelectedCollege}>
          <SelectTrigger className="w-[200px] mt-2">
            <SelectValue placeholder="Select a college" />
          </SelectTrigger>
          <SelectContent>
            {colleges.map((college) => (
              <SelectItem key={college} value={college}>
                {college}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toString()}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="students" fill="var(--color-students)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
