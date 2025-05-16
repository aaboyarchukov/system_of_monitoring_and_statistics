"use client"

import React from "react"
import { Toast, ToastTitle, ToastDescription } from "./ui/toast"
import { ToastContainer } from "./ui/toast-container"

export type NotificationType = "success" | "error" | "warning" | "info"

export interface AuthNotificationProps {
  type: NotificationType
  title: string
  message: string
  visible: boolean
  onClose: () => void
}

export function AuthNotification({ type, title, message, visible, onClose }: AuthNotificationProps) {
  return (
    <ToastContainer>
      <Toast variant={type} visible={visible} onClose={onClose}>
        <div>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
        </div>
      </Toast>
    </ToastContainer>
  )
}

// Example usage context provider for global notifications
export const NotificationContext = React.createContext<{
  showNotification: (type: NotificationType, title: string, message: string) => void
  hideNotification: () => void
}>({
  showNotification: () => {},
  hideNotification: () => {},
})

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = React.useState<{
    type: NotificationType
    title: string
    message: string
    visible: boolean
  }>({
    type: "info",
    title: "",
    message: "",
    visible: false,
  })

  const showNotification = (type: NotificationType, title: string, message: string) => {
    setNotification({
      type,
      title,
      message,
      visible: true,
    })
  }

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }))
  }

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <AuthNotification
        type={notification.type}
        title={notification.title}
        message={notification.message}
        visible={notification.visible}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  )
}

// Custom hook for using notifications
export const useNotification = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
