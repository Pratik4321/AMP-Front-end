"use client";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useInstructorResponse } from "../../../hooks/useInstructor";

export default function InstructorTable() {
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(
    null
  );

  // Fetch initial data when the component mounts
  const {
    data: instructorResponses,
    isLoading,
    isError,
    refetch,
  } = useInstructorResponse(nameFilter, emailFilter, availabilityFilter);

  // Fetch data when Apply Filters button is pressed
  const filterInstructor = () => {
    // Trigger refetch based on the new filter criteria
    refetch();
  };

  const clearFilters = useCallback(() => {
    setNameFilter("");
    setEmailFilter("");
    setAvailabilityFilter(null);
    refetch();
  }, [nameFilter, emailFilter]);

  // Function to download CSV
  const downloadCSV = () => {
    const headers = ["Name", "Email", "Course", "Availability"];
    const rows = instructorResponses?.map((instructor) => [
      instructor.instructorId?.Name,
      instructor.instructorId?.Email,
      instructor.instructorId?.Courses,
      instructor.availability === "yes" ? "Available" : "Not Available",
    ]);

    const csvContent = [headers, ...(rows || [])]
      .map((row) => row.map((cell: any) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "instructors.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (isError) {
    return <div>Error loading data</div>;
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
        {/* <div>
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
        </div> */}
        <Button onClick={filterInstructor} className="self-end bg-green-600">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} className="self-end">
          Clear Filters
        </Button>
        <Button onClick={downloadCSV} className="self-end bg-red-600">
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
