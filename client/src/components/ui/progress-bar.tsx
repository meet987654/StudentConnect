import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "default" | "gradient" | "success" | "warning";
  size?: "sm" | "md" | "lg";
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    label, 
    showPercentage = true, 
    variant = "default",
    size = "md",
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
      sm: "h-2",
      md: "h-3", 
      lg: "h-4"
    };

    const variantClasses = {
      default: "bg-primary",
      gradient: "bg-gradient-to-r from-solana-purple to-solana-green",
      success: "bg-green-500",
      warning: "bg-yellow-500"
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(label || showPercentage) && (
          <div className="flex items-center justify-between mb-2">
            {label && (
              <span className="text-sm font-medium text-slate-700">{label}</span>
            )}
            {showPercentage && (
              <span className="text-sm font-medium text-slate-600">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        
        <div className={cn(
          "w-full overflow-hidden rounded-full bg-slate-200",
          sizeClasses[size]
        )}>
          <div
            className={cn(
              "h-full transition-all duration-300 ease-in-out",
              variantClasses[variant]
            )}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label || `Progress: ${Math.round(percentage)}%`}
          />
        </div>
        
        {label && showPercentage && (
          <div className="mt-1 text-xs text-slate-500">
            {value} of {max} completed
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
