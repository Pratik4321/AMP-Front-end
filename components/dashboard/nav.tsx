"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export function DashboardNav() {
  const pathname = usePathname();

  const items: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
    },
    {
      title: "Instructors",
      href: "/dashboard/add-instructor",
    },
    {
      title: "Courses",
      href: "/dashboard/courses",
    },
    {
      title: "Reports",
      href: "/dashboard/Instructor-response",
    },
  ];

  return (
    <nav className="flex space-x-2 lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
