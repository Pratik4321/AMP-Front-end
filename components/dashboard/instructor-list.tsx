import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function InstructorList() {
  const instructors = [
    { name: "Dr. Smith", department: "Mathematics", status: "Confirmed" },
    { name: "Prof. Randy", department: "Physics", status: "Pending" },
    { name: "Dr. Lee", department: "Chemistry", status: "Declined" },
    { name: "Prof. Sayeed", department: "Biology", status: "Confirmed" },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Instructors</CardTitle>
        <CardDescription>Overview of instructor responses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {instructors.map((instructor, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${instructor.name.replace(
                    " ",
                    "-"
                  )}.png`}
                  alt={instructor.name}
                />
                <AvatarFallback>
                  {instructor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {instructor.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {instructor.department}
                </p>
              </div>
              <div className="ml-auto">
                <Badge
                  variant={
                    instructor.status === "Confirmed"
                      ? "default"
                      : instructor.status === "Pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {instructor.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
