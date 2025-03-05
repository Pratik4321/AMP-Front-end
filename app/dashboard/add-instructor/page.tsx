"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, ChangeEvent, FormEvent } from "react";
import { useCreateInstructor, useInstructurs } from "@/hooks/useInstructor";
import { Oval } from "react-loader-spinner";

export default function AddInstructorForm() {
  const { data: instructors, isLoading, isError, refetch } = useInstructurs();
  const { mutate: createInstructor, isPending } = useCreateInstructor();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createInstructor(
      { ...formData, status: "pending" },
      {
        onSuccess: () => {
          refetch();
          setFormData({ name: "", email: "" });
        },
      }
    );
  };

  const handleSendAll = () => {
    // Handle sending all instructors
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval height={50} width={50} color="#4f46e5" secondaryColor="#a5b4fc" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center">Error fetching data</div>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen p-6 gap-8">
      {/* Add Instructor Form */}
      <Card className="w-[40%] shadow-lg border border-gray-300">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-blue-600">
            Add Instructor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-gray-300"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-gray-300"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
              disabled={isPending}
            >
              {isPending ? (
                <Oval
                  height={20}
                  width={20}
                  color="#fff"
                  secondaryColor="#ccc"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Instructor List */}
      <Card className="w-[50%] shadow-lg border border-gray-300">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-blue-600">
            Instructor List
          </CardTitle>
          <Button
            onClick={handleSendAll}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Send All
          </Button>
        </CardHeader>
        <CardContent>
          {instructors?.length > 0 ? (
            <ul className="space-y-3">
              {instructors?.map((instructor, index) => (
                <li
                  key={index}
                  className="p-3 bg-white rounded-lg shadow-md border border-gray-200 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      {instructor.name}
                    </p>
                    <p className="text-sm text-gray-500">{instructor.email}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-md ${
                      instructor.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {instructor.status === "approved" ? "Sent" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No instructors added yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
