"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useInstructorResponse } from "../../../hooks/useInstructor";

export default function InstructorTable() {
  const {
    data: instructorResponses,
    isLoading,
    isError,
  } = useInstructorResponse();

  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("all"); // Default to "all"
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(
    null
  );

  // Filtered data
  const filteredData = instructorResponses?.filter((instructor) => {
    const matchesName = instructor.instructorId?.Name.toLowerCase().includes(
      nameFilter.toLowerCase()
    );
    const matchesEmail = instructor.instructorId?.Email.toLowerCase().includes(
      emailFilter.toLowerCase()
    );
    const matchesCourse =
      courseFilter === "all"
        ? true
        : instructor.instructorId.Courses === courseFilter;
    const matchesAvailability =
      availabilityFilter !== null ? instructor.availability === "yes" : true;

    return matchesName && matchesEmail && matchesCourse && matchesAvailability;
  });

  // Unique courses for dropdown
  const uniqueCourses = ["Software Engineering", "Data Science", "AI"];

  // Function to download CSV
  const downloadCSV = () => {
    // Create CSV headers
    const headers = ["Name", "Email", "Course", "Availability"];
    const rows = filteredData?.map((instructor) => [
      instructor.instructorId?.Name,
      instructor.instructorId?.Email,
      instructor.instructorId?.Courses,
      instructor.availability ? "Available" : "Not Available",
    ]);

    // Combine headers and rows
    const csvContent = [headers, ...(rows || [])]
      .map((row) => row.map((cell: any) => `"${cell}"`).join(","))
      .join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "instructors.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Instructor Table</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-48"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Filter by email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="w-48"
          />
        </div>
        <div>
          <Label htmlFor="course">Course</Label>
          <Select
            value={courseFilter}
            onValueChange={(value) => setCourseFilter(value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {uniqueCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="availability">Availability</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="availability"
              checked={availabilityFilter === true}
              onCheckedChange={(checked) =>
                setAvailabilityFilter(checked ? true : null)
              }
            />
            <label htmlFor="availability" className="text-sm">
              Available
            </label>
          </div>
        </div>
        <Button
          onClick={() => {
            setNameFilter("");
            setEmailFilter("");
            setCourseFilter("all");
            setAvailabilityFilter(null);
          }}
          className="self-end"
        >
          Clear Filters
        </Button>
        <Button onClick={downloadCSV} className="self-end bg-green-600">
          Download CSV
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Course</th>
              <th className="px-4 py-2 text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {instructorResponses?.map((instructor) => (
              <tr key={instructor._id} className="border-t">
                <td className="px-4 py-2">{instructor?.instructorId?.Name}</td>
                <td className="px-4 py-2">{instructor?.instructorId?.Email}</td>
                <td className="px-4 py-2">
                  {instructor?.instructorId?.Courses}
                </td>
                <td className="px-4 py-2">
                  {instructor.availability === "yes" ? (
                    <span className="text-green-600">Available</span>
                  ) : (
                    <span className="text-red-600">Not Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
