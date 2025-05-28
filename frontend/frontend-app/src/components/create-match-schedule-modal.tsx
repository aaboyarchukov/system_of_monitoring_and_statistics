"use client"

import type React from "react"

import { useState } from "react"

interface CreateMatchScheduleModalProps {
  homeTeam: string
  awayTeam: string
  onClose: () => void
  onSave: (homeTeam: string, awayTeam: string, dateTime: string) => void
  onBack: () => void
}

export default function CreateMatchScheduleModal({
  homeTeam,
  awayTeam,
  onClose,
  onSave,
  onBack,
}: CreateMatchScheduleModalProps) {
  const [dateTime, setDateTime] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (dateTime) {
      onSave(homeTeam, awayTeam, dateTime)
    }
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

        <div className="text-center mb-8">
          <div className="bg-white rounded-full py-4 px-8 mb-6 inline-block">
            <h2 className="text-2xl font-bold text-primary">Данные матча</h2>
          </div>

          <div className="bg-white rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl font-bold text-primary">{homeTeam}</span>
                <span className="text-2xl font-bold text-gray-400">:</span>
                <span className="text-2xl font-bold text-primary">{awayTeam}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="datetime-local"
                  placeholder="DateAndTime*"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={onBack} className="flex-1 primary-button bg-gray-500 hover:bg-gray-600">
                  Назад
                </button>
                <button type="submit" className="flex-1 primary-button">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
