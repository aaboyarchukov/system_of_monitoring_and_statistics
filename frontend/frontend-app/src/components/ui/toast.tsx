"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-50",
        error: "border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-50",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-50",
        info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  visible: boolean
  onClose: () => void
  autoClose?: boolean
  autoCloseTime?: number
}

export function Toast({
  className,
  variant,
  visible,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
  children,
  ...props
}: ToastProps) {
  React.useEffect(() => {
    if (visible && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseTime)

      return () => clearTimeout(timer)
    }
  }, [visible, autoClose, autoCloseTime, onClose])

  if (!visible) return null

  return (
    <div className={cn(toastVariants({ variant }), className)} {...props}>
      <div className="flex-1">{children}</div>
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

export type ToastTitleProps = React.HTMLAttributes<HTMLHeadingElement>

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <h5 className={cn("font-medium", className)} {...props} />
}

export type ToastDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return <div className={cn("text-sm opacity-90", className)} {...props} />
}
