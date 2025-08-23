
import { cn } from "@/lib/utils";
import React from "react";
import { Card } from "@/components/ui/card";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassCard = ({ className, children, ...props }: GlassCardProps) => {
  return (
    <Card
      className={cn(
        "bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GlassCard;
