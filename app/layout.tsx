"use client";

import type { Metadata } from "next";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardNav } from "@/components/dashboard/nav";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/Context/authContext"; // Import useAuth
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

// Separate component to use hooks
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth(); // Use the useAuth hook
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!!user) {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <>
      {/* Render DashboardNav only if the user is logged in */}
      {isLoggedIn && <DashboardNav />}
      {children}
    </>
  );
}
