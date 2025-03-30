// app/form/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface FormData {
  email: string;
  name: string;
  availability: string;
  course: string;
  instructorId: string;
}

const AvailabilityForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    availability: "",
    course: "",
    instructorId: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // To manage the pop-up visibility

  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const availability = searchParams.get("availability");
    const course = searchParams.get("course");
    const instructorId = searchParams.get("instructorId");

    if (email && name && course && instructorId) {
      setFormData({
        email,
        name,
        availability: availability || "",
        course,
        instructorId,
      });
    }
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent, response: "yes" | "no") => {
    e.preventDefault();
    formData.availability = response;

    try {
      const response = await axios.post(
        "http://localhost:3000/instructors/submit-availability",
        formData
      );

      if (response.status === 200) {
        setIsSubmitted(true); // Show the confirmation pop-up
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Hello {formData.name} !!</h1>
      Would you like to confrim your availability for {formData.course} ?
      <Button onClick={(e) => handleSubmit(e, "yes")}>Confirm</Button>s
      <Button onClick={(e) => handleSubmit(e, "no")} variant="destructive">
        Reject
      </Button>
      {/* Confirmation Pop-up */}
      {isSubmitted && (
        <div className="popup">
          <div className="popup-content">
            <p>Form submitted successfully!</p>
            <button onClick={() => setIsSubmitted(false)}>Close</button>
          </div>
        </div>
      )}
      <style>
        {`
          .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
            z-index: 9999;
          }

          .popup-content {
            text-align: center;
          }

          .popup button {
            padding: 10px 15px;
            margin-top: 10px;
            background-color: #4f46e5;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .popup button:hover {
            background-color: #4338ca;
          }
        `}
      </style>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <div>
      <h1>Availability Form</h1>
      <AvailabilityForm />
    </div>
  );
};

export default Page;
