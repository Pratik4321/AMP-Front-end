"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useInstructurs } from "@/hooks/useInstructor";
import { Skeleton } from "../ui/skeleton";

export function InstructorList() {
  const { data: instructors, isLoading, isError, refetch } = useInstructurs();

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Instructors</CardTitle>
        <CardDescription>Overview of instructor responses</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
        )}
        <div className="space-y-8">
          {instructors?.map((instructor, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${instructor.name?.replace(
                    " ",
                    "-"
                  )}.png`}
                  alt={instructor.name}
                />
                <AvatarFallback>
                  {instructor.name?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {instructor.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {instructor.email}
                </p>
              </div>
              <div className="ml-auto">
                <Badge
                  variant={
                    instructor.status === "approved"
                      ? "default"
                      : instructor.status === "pending"
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
