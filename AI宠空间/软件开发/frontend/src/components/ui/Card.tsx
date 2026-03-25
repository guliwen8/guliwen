import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "surface";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3 border border-slate-400/20 shadow-e1",
        variant === "default" ? "bg-surface-1/80 backdrop-blur-md" : "bg-surface-2",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
