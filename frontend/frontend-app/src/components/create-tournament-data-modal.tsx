"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface CreateTournamentDataModalProps {
  initialData: { name: string; place: string; date: string }
  currentStep: "data" | "settings"
  onNext: (data: { name: string; place: string; date: string }) => void
  onClose: () => void
}

export default function CreateTournamentDataModal({
  initialData,
  currentStep,
  onNext,
  onClose,
}: CreateTournamentDataModalProps) {
  const [name, setName] = useState<string>(initialData.name)
  const [place, setPlace] = useState<string>(initialData.place)
  const [date, setDate] = useState<string>(initialData.date)

  useEffect(() => {
    setName(initialData.name)
    setPlace(initialData.place)
    setDate(initialData.date)
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ name, place, date })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="flex justify-center mb-4">
          <div className="flex w-full max-w-md bg-white rounded-full overflow-hidden">
            <button
              className={`flex-1 py-3 px-4 text-xl font-bold ${currentStep === "data" ? "text-primary tab-active" : "text-gray-400"}`}
            >
              Данные
            </button>
            <button
              className={`flex-1 py-3 px-4 text-xl font-bold ${currentStep === "settings" ? "text-primary tab-active" : "text-gray-400"}`}
            >
              Настройки
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Place*"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2"
                required
              />
            </div>

            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2"
                required
              />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="primary-button">
                Далее
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
