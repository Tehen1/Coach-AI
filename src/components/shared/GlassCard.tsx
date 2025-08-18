import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassCard = ({ className, children, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
