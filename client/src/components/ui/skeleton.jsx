import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-muted/70 via-muted to-muted/70 bg-[length:400%_100%] shadow-sm",
        className
      )} 
      {...props} 
    />
  );
}

export { Skeleton }
