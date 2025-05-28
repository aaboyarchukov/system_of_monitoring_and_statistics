"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TimeAdjustmentModalProps {
  isOpen: boolean
  currentTime: number
  onClose: () => void
  onTimeChange: (newTime: number) => void
}

export function TimeAdjustmentModal({ isOpen, currentTime, onClose, onTimeChange }: TimeAdjustmentModalProps) {
  const [minutes, setMinutes] = useState(Math.floor(currentTime / 60))
  const [seconds, setSeconds] = useState(currentTime % 60)

  if (!isOpen) return null

  const handleSave = () => {
    const newTime = minutes * 60 + seconds
    onTimeChange(newTime)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4 text-center text-[#0F2D69]">Настройка времени</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <label className="block text-sm font-medium mb-2 text-[#0F2D69]">Минуты</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Number.parseInt(e.target.value) || 0))}
                className="w-20 p-2 border rounded text-center text-[#0F2D69] border-[#0F2D69]"
              />
            </div>
            <div className="text-2xl font-bold text-[#0F2D69]">:</div>
            <div className="text-center">
              <label className="block text-sm font-medium mb-2 text-[#0F2D69]">Секунды</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number.parseInt(e.target.value) || 0)))}
                className="w-20 p-2 border rounded text-center text-[#0F2D69] border-[#0F2D69]"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={onClose} className="bg-[#0F2D69] text-white hover:bg-[#0A1F4A]">
              Отмена
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
