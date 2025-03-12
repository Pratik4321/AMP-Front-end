"use client";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <div className="font-heading text-3xl md:text-4xl">{heading}</div>
        {text && <div className="text-lg text-muted-foreground">{text}</div>}
      </div>
      {children}
    </div>
  );
}
