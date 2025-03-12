"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateInstructor, useInstructurs } from "@/hooks/useInstructor";
import { Oval } from "react-loader-spinner";
import Papa from "papaparse";

export default function AddInstructorForm() {
  const { data: instructors, isLoading, isError, refetch } = useInstructurs();
  const { mutate: createInstructor, isPending } = useCreateInstructor();

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [csvData, setCsvData] = useState([]);
  const [isSending, setIsSending] = useState(false);

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

  const handleSendAll = async () => {
    setIsSending(true);
    try {
      // Map CSV data to the format expected by the back-end
      const mappedInstructors = csvData.map((instructor) => ({
        name: instructor.name,
        email: instructor.email,
      }));

      // Call the back-end endpoint
      const response = await fetch("http://localhost:3000/send-batch-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instructors: mappedInstructors,
          course: {
            name: "CSE",
            description: "This is a great course",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send batch emails");
      }

      const result = await response.json();
      console.log(result.message);
      alert("Batch emails sent successfully!");
    } catch (error) {
      console.error("Error sending batch emails:", error);
      alert("Failed to send batch emails");
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      Papa.parse(e.target.files[0], {
        complete: (result) => {
          // Map all relevant columns from the CSV
          const formattedData = result.data.slice(1).map((row) => ({
            offering: row[0], // 1st column (Offering)
            campus: row[1], // 2nd column (Campus)
            delivery: row[2], // 3rd column (Delivery)
            name: row[3], // 4th column (Name)
            email: row[4], // 5th column (Email)
          }));
          setCsvData(formattedData);
        },
      });
    }
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

      <Card className="w-[50%] shadow-lg border border-gray-300">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-blue-600">
            Instructor List
          </CardTitle>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csvUpload"
          />
          <label
            htmlFor="csvUpload"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Upload CSV
          </label>
          <Button
            onClick={handleSendAll}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            disabled={isSending || csvData.length === 0}
          >
            {isSending ? (
              <Oval height={20} width={20} color="#fff" secondaryColor="#ccc" />
            ) : (
              "Send All"
            )}
          </Button>
        </CardHeader>
        <CardContent>
          {csvData.length > 0 ? (
            <ul className="space-y-3">
              {csvData.map((instructor, index) => (
                <li
                  key={index}
                  className="p-3 bg-white rounded-lg shadow-md border border-gray-200"
                >
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-700">
                      {instructor.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Email:</span>{" "}
                      {instructor.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Offering:</span>{" "}
                      {instructor.offering}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Campus:</span>{" "}
                      {instructor.campus}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Delivery:</span>{" "}
                      {instructor.delivery}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">
              No CSV data uploaded yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
