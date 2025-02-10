import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    { instructor: "Dr. Smith", action: "Confirmed availability", course: "MATH101", time: "2 hours ago" },
    { instructor: "Prof. Johnson", action: "Declined course", course: "PHYS202", time: "5 hours ago" },
    { instructor: "Dr. Lee", action: "Requested more information", course: "CHEM301", time: "1 day ago" },
    { instructor: "Prof. Garcia", action: "Confirmed availability", course: "BIO101", time: "2 days ago" },
  ]

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest instructor responses and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.instructor}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action} for {activity.course}
                </p>
              </div>
              <div className="ml-auto font-medium">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

