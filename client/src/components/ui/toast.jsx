import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority";
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props} />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-5 pr-8 shadow-lg transition-all duration-300 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border border-border/40 bg-background/95 backdrop-blur-sm text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-500/30 bg-green-500/95 backdrop-blur-sm text-white",
        warning: "border-yellow-500/30 bg-yellow-500/95 backdrop-blur-sm text-white",
        info: "border-blue-500/30 bg-blue-500/95 backdrop-blur-sm text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    (<ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props} />)
  );
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors duration-200 hover:bg-secondary hover:text-secondary-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive group-[.success]:border-green-500/30 group-[.success]:hover:border-green-500/50 group-[.success]:hover:bg-green-600 group-[.success]:focus:ring-green-500 group-[.warning]:border-yellow-500/30 group-[.warning]:hover:border-yellow-500/50 group-[.warning]:hover:bg-yellow-600 group-[.warning]:focus:ring-yellow-500 group-[.info]:border-blue-500/30 group-[.info]:hover:border-blue-500/50 group-[.info]:hover:bg-blue-600 group-[.info]:focus:ring-blue-500",
      className
    )}
    {...props} />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1.5 text-foreground/50 opacity-0 transition-all duration-200 hover:bg-accent/80 hover:text-foreground hover:scale-105 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-primary group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 group-[.success]:text-green-100 group-[.success]:hover:text-white group-[.success]:focus:ring-green-400 group-[.warning]:text-yellow-100 group-[.warning]:hover:text-white group-[.warning]:focus:ring-yellow-400 group-[.info]:text-blue-100 group-[.info]:hover:text-white group-[.info]:focus:ring-blue-400",
      className
    )}
    toast-close=""
    {...props}>
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-base font-semibold text-foreground leading-tight group-[.success]:text-white group-[.warning]:text-white group-[.info]:text-white", className)} {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90 mt-1 text-muted-foreground group-[.success]:text-white/90 group-[.warning]:text-white/90 group-[.info]:text-white/90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };
