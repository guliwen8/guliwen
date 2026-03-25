import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary-500 text-[#04120A] hover:bg-primary-600 active:bg-primary-700",
      secondary: "bg-surface-2 text-text-1 hover:bg-surface-3",
      outline: "border border-border bg-transparent text-text-1 hover:bg-surface-1",
      danger: "bg-danger-500 text-white hover:bg-red-600",
      ghost: "bg-transparent text-text-2 hover:text-text-1 hover:bg-surface-1",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-md",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-2 font-semibold transition-all duration-fast ease-standard focus:outline-none focus:ring-2 focus:ring-accent-500/40 disabled:opacity-45 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          isLoading && "relative text-transparent pointer-events-none",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
