// hooks/usePosts.ts
"use client"; // Mark this as a Client Component

import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../lib/api";

export const createInstructor = async (
  instructor: Instructor
): Promise<Instructor> => {
  const response = await apiClient.post<Instructor>("/instructurs", instructor);
  return response.data;
};
const fetchInstructurs = async (): Promise<Instructor[]> => {
  const { data } = await apiClient.get<Instructor[]>("/instructurs");
  return data;
};

export const useInstructurs = () => {
  return useQuery<Instructor[], Error>({
    queryKey: ["instructurs"], // Unique key for the query
    queryFn: fetchInstructurs, // Function to fetch data
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2,
  });
};

export const useCreateInstructor = () => {
  return useMutation<Instructor, Error, Instructor>({
    mutationFn: createInstructor,
    onSuccess: (data) => {
      console.log("Instructor created:", data);
    },
    onError: (error) => {
      console.error("Error creating instructor:", error);
      // alert("Failed to create instructor. Please try again.");
    },
  });
};
