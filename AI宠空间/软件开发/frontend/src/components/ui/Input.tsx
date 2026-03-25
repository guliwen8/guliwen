import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <input
          type={type}
          className={cn(
            "flex w-full rounded-2 border border-border bg-[#0B1220] px-3 py-2 text-sm text-text-1 outline-none transition-all duration-fast ease-standard placeholder:text-text-3 focus:border-accent-500 focus:ring-3 focus:ring-accent-500/20 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-danger-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
