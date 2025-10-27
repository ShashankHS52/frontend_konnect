import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AreaChart, BarChart, DonutChart, LineChart } from 'lucide-react';
import Image from 'next/image';

const projectStatsData = [
  { name: 'Jan', Total: 120, Ongoing: 80, Unfinished: 40 },
  { name: 'Feb', Total: 140, Ongoing: 90, Unfinished: 50 },
  { name: 'Mar', Total: 160, Ongoing: 100, Unfinished: 60 },
  { name: 'Apr', Total: 180, Ongoing: 110, Unfinished: 70 },
  { name: 'May', Total: 200, Ongoing: 120, Unfinished: 80 },
  { name: 'Jun', Total: 220, Ongoing: 130, Unfinished: 90 },
];

export default function DashboardPage() {

  return (
    <div className="flex flex-col gap-6">
       <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Manage your project in one touch</h2>
            <p>Let Fillow manage your project automatically with our best AI systems</p>
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">Try Free Now</Button>
          </div>
          <div>
            <Image src="/placeholder-image.svg" width={250} height={180} alt="Project management illustration" data-ai-hint="illustration dashboard"/>
          </div>
        </CardContent>
       </Card>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">68</div>
              <p className="text-xs text-green-500">+0,5%</p>
            </div>
            <BarChart className="h-10 w-10 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">42</span>
              <span className="text-xs text-muted-foreground">76 left from target</span>
            </div>
            <Progress value={42/76 * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">562</div>
            <p className="text-xs text-red-500">-2% than last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">892</div>
            <p className="text-xs text-green-500">+2% than last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Project Statistics</CardTitle>
                <div className="flex items-center gap-2">
                    <Button size="sm">Monthly</Button>
                    <Button size="sm" variant="ghost">Weekly</Button>
                    <Button size="sm" variant="ghost">Today</Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-around">
                  <div className="text-center">
                    <DonutChart className="h-12 w-12 mx-auto text-primary" />
                    <p className="font-bold text-xl">246</p>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                  </div>
                   <div className="text-center">
                    <DonutChart className="h-12 w-12 mx-auto text-yellow-500" />
                    <p className="font-bold text-xl">246</p>
                    <p className="text-sm text-muted-foreground">On Going</p>
                  </div>
                   <div className="text-center">
                    <DonutChart className="h-12 w-12 mx-auto text-pink-500" />
                    <p className="font-bold text-xl">28</p>
                    <p className="text-sm text-muted-foreground">Unfinished</p>
                  </div>
              </div>
              <div className="h-60">
                 <p className="text-center text-muted-foreground">Chart placeholder</p>
              </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Fillow Company Profile</CardTitle>
                <CardDescription>Website Project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id quibusdam eaque vero ullam odit nostrum nemo excepturi explicabo ipsum voluptas nihil quae doloremque ducimus.</p>
                <div className="flex items-center justify-center space-y-4 flex-col">
                  <div className="w-40 h-40 relative">
                      <DonutChart className="w-full h-full text-accent" strokeWidth="1.5"/>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">70%</span>
                      </div>
                  </div>
                  <p className="text-center font-semibold">On Progress 70%</p>
                </div>
                <div className="flex justify-center gap-2">
                    <Button variant="outline" size="icon">&larr;</Button>
                    <Button variant="outline" size="icon">&rarr;</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
