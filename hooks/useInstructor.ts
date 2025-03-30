// hooks/usePosts.ts
"use client"; // Mark this as a Client Component

import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../lib/api";
import { Instructor, InstructorResponse } from "../types/instructor";

export const createInstructor = async (
  instructor: Instructor
): Promise<Instructor> => {
  const response = await apiClient.post<Instructor>("/instructors", instructor);
  return response.data;
};
const fetchInstructurs = async (): Promise<Instructor[]> => {
  const { data } = await apiClient.get<Instructor[]>("/instructors");
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

const fetchInstructorResponse = async (
  nameFilter: string,
  emailFilter: string,
  availabilityFilter: boolean | null
): Promise<InstructorResponse[]> => {
  const params: any = {};

  if (nameFilter) params.name = nameFilter;
  if (emailFilter) params.email = emailFilter;
  if (availabilityFilter !== null)
    params.available = availabilityFilter.toString();

  const { data } = await apiClient.get<any>("/recent-activities", { params });
  return data.recentResponses;
};

export const useInstructorResponse = (
  nameFilter: string,
  emailFilter: string,
  availabilityFilter: boolean | null
) => {
  return useQuery<InstructorResponse[], Error>({
    queryKey: ["instructor-response"],
    queryFn: () =>
      fetchInstructorResponse(nameFilter, emailFilter, availabilityFilter),
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2,
    enabled: true, // Always enabled to fetch initial data on mount
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
