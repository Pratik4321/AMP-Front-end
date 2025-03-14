"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Oval } from "react-loader-spinner";
import Papa from "papaparse";

export default function AddInstructorForm() {
  const [csvData, setCsvData] = useState([]);
  const [isSending, setIsSending] = useState(false);

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

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-50">
      <Card className="w-[90%] max-w-6xl shadow-lg border border-gray-200 rounded-lg">
        <CardHeader className="bg-blue-50 p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-blue-800">
              Instructor List
            </CardTitle>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csvUpload"
              />
              <label
                htmlFor="csvUpload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition duration-300"
              >
                Upload CSV
              </label>
              <Button
                onClick={handleSendAll}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300"
                disabled={isSending || csvData.length === 0}
              >
                {isSending ? (
                  <Oval
                    height={20}
                    width={20}
                    color="#fff"
                    secondaryColor="#ccc"
                  />
                ) : (
                  "Send All"
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {csvData.length > 0 ? (
            <ul className="space-y-4">
              {csvData.map((instructor, index) => (
                <li
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-gray-800">
                      {instructor.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span>{" "}
                      {instructor.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Offering:</span>{" "}
                      {instructor.offering}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Campus:</span>{" "}
                      {instructor.campus}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Delivery:</span>{" "}
                      {instructor.delivery}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-6">
              No CSV data uploaded yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
