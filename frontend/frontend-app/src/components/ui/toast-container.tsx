import type * as React from "react"
import { cn } from "../../lib/utils"

export type ToastContainerProps = React.HTMLAttributes<HTMLDivElement>

export function ToastContainer({ className, children, ...props }: ToastContainerProps) {
  return (
    <div
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
