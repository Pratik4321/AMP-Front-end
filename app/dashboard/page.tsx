import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { DashboardNav } from "@/components/dashboard/nav";
import { Overview } from "@/components/dashboard/overview";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { InstructorList } from "@/components/dashboard/instructor-list";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader
          heading="Dashboard"
          text="Manage instructor responses and course availability."
        />
        <Suspense fallback={<LoadingSpinner />}>
          <Overview />
        </Suspense>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Suspense fallback={<LoadingSpinner />}>
            <InstructorList />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>
    </DashboardShell>
  );
}
