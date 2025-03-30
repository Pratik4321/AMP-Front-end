"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "../lib/api";
import { EmailTrack } from "../app/types/email-track";
import { RecentActivity } from "../app/types/recent-activity";

const fetchRecentActivity = async (): Promise<RecentActivity[]> => {
  const { data } = await apiClient.get<any>("/recent-activities");
  return data.recentResponses;
};

export const useRecentActivities = () => {
  return useQuery<RecentActivity[], Error>({
    queryKey: ["recent-activities"], // Unique key for the query
    queryFn: fetchRecentActivity, // Function to fetch data
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2,
  });
};
