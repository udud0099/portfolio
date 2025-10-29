"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A bar chart with an active bar";
const chartData = [
  { browser: "chrome", visitors: 80, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 70, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 90, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 95, fill: "var(--color-edge)" },
  { browser: "other", visitors: 60, fill: "var(--color-other)" },
];
const chartConfig = {
  visitors: {
    label: "Percentage",
  },
  chrome: {
    label: "JS",
    color: "var(--chart-1)",
  },
  safari: {
    label: "React",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Next JS",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Tailwind",
    color: "var(--chart-4)",
  },
  other: {
    label: "Typescript",
    color: "var(--chart-5)",
  },
};

const MySkills = () => {
  return (
    <div id="MySkills" className="h-screen  w-full">
      <div className="px-[250px] py-12">
        <Card>
          <CardHeader>
            <CardTitle>My Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="browser"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => chartConfig[value]?.label}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="visitors"
                  strokeWidth={2}
                  radius={8}
                  activeIndex={2}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={props.payload.fill}
                        strokeDasharray={4}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MySkills;
