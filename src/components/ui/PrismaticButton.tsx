"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PrismaticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
}

export function PrismaticButton({ 
  children, 
  className, 
  onClick,
  variant = "primary" 
}: PrismaticButtonProps) {
  return (
    <div className={cn("prismatic-wrapper", className)}>
      <button className={cn("prismatic-button", variant)} onClick={onClick}>
        <span className="prismatic-label">{children}</span>
      </button>
    </div>
  );
}