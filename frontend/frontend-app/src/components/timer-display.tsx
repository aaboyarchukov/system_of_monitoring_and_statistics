"use client"

interface TimerDisplayProps {
  timeRemaining: number
  isRunning: boolean
  onToggle: () => void
  onTimeClick: () => void
}

export function TimerDisplay({ timeRemaining, isRunning, onToggle, onTimeClick }: TimerDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3">
      <button onClick={onTimeClick} className="text-2xl font-bold text-blue-900 hover:text-blue-700 cursor-pointer">
        {formatTime(timeRemaining)}
      </button>
      <button onClick={onToggle} className="ml-2 text-blue-900 hover:text-blue-700">
        {isRunning ? "⏸️" : "▶️"}
      </button>
    </div>
  )
}
