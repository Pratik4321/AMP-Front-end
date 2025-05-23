"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecentActivities } from "../../hooks/useRecentActivity";

export function RecentActivity() {
  const activities = [
    {
      instructor: "Dr. Smith",
      action: "Confirmed availability",
      course: "MATH101",
      time: "2 hours ago",
    },
    {
      instructor: "Danish Syed",
      action: "Declined course",
      course: "PHYS202",
      time: "5 hours ago",
    },
    {
      instructor: "Randy Lin",
      action: "Requested more information",
      course: "CHEM301",
      time: "1 day ago",
    },
    {
      instructor: "Prof. Garcia",
      action: "Confirmed availability",
      course: "BIO101",
      time: "2 days ago",
    },
  ];
  const { data: recentActivities, isLoading, isError } = useRecentActivities();
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest instructor responses and actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentActivities?.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity?.instructorId?.Name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity?.availability} for {activity?.instructorId?.Courses}
                </p>
              </div>
              {/* <div className="ml-auto font-medium">{activity.createdAt}</div> */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
