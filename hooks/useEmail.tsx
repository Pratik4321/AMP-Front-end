"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "../lib/api";
import { EmailTrack } from "../app/types/email-track";

const fetchEmailTrack = async (): Promise<EmailTrack> => {
  const { data } = await apiClient.get<any>("/email-tracking");
  return data.emailTrack;
};

export const useEmailTrack = () => {
  return useQuery<EmailTrack, Error>({
    queryKey: ["email-tracking"], // Unique key for the query
    queryFn: fetchEmailTrack, // Function to fetch data
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2,
  });
};
