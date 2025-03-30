"use client";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";

export function InstructorList() {
  const { data: instructors, isLoading, isError, refetch } = useInstructurs();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const totalItems = instructors?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedInstructors = instructors?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          {paginatedInstructors?.map((instructor, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${instructor.Name?.replace(
                    " ",
                    "-"
                  )}.png`}
                  alt={instructor.Name}
                />
                <AvatarFallback>
                  {instructor.Name?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {instructor.Name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {instructor.Email}
                </p>
              </div>
              <div className="ml-auto">
                <Badge
                  variant={
                    instructor.status === "available"
                      ? "success"
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
