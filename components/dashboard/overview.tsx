"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, UserCheck, UserX, AlertTriangle } from "lucide-react";
import { useEmailTrack } from "../../hooks/useEmail";
import { useCallback } from "react";

export function Overview() {
  const { data: emailTrack, isLoading, isError } = useEmailTrack();

  const renderPending = useCallback(() => {
    if (
      emailTrack?.emailSent !== undefined &&
      emailTrack?.emailRespond !== undefined
    ) {
      return (
        <div className="text-2xl font-bold">
          {emailTrack?.emailSent - emailTrack?.emailRespond}
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }, [emailTrack]);
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Emails Sent
          </CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{emailTrack?.emailSent}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Responses Received
          </CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{emailTrack?.emailRespond}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Responses
          </CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>{renderPending()}</CardContent>
      </Card>
    </div>
  );
}
