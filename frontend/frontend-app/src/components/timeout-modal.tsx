"use client"

import { useEffect, useState } from "react"

interface TimeoutModalProps {
  isOpen: boolean
  team: string
  duration: number
  onComplete: () => void
}

export function TimeoutModal({ isOpen, team, duration, onComplete }: TimeoutModalProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration)

  useEffect(() => {
    if (!isOpen) {
      setTimeRemaining(duration)
      return
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, duration])

  useEffect(() => {
    if (isOpen && timeRemaining === 0) {
      onComplete()
    }
  }, [timeRemaining, isOpen, onComplete])

  if (!isOpen) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-blue-600 to-blue-800 p-8 rounded-lg border-4 border-white">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">ТАЙМ-АУТ</h2>
          <h3 className="text-2xl font-bold mb-6">{team}</h3>
          <div className="text-6xl font-bold mb-4 bg-white text-blue-900 rounded-full px-8 py-4">
            {formatTime(timeRemaining)}
          </div>
          <p className="text-lg">Ожидание завершения тайм-аута...</p>
        </div>
      </div>
    </div>
  )
}
