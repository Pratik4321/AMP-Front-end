"use client";

import type { Metadata } from "next";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardNav } from "@/components/dashboard/nav";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {/* Render DashboardNav only if not on the login page */}
          {pathname !== "/login" && <DashboardNav />}
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
