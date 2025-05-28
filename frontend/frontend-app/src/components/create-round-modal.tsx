"use client"

import type React from "react"

import { useState } from "react"

interface CreateRoundModalProps {
  onClose: () => void
  onCreateRound: (roundName: string) => void
}

export default function CreateRoundModal({ onClose, onCreateRound }: CreateRoundModalProps) {
  const [roundName, setRoundName] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (roundName.trim()) {
      onCreateRound(roundName.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-8">Новый тур</h2>

        <div className="bg-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-center mb-8">Название тура</h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                placeholder="Name*"
                value={roundName}
                onChange={(e) => setRoundName(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2"
                required
              />
            </div>

            <button type="submit" className="primary-button w-full">
              Создать
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
