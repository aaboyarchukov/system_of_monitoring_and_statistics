"use client"

import type React from "react"

import { useState } from "react"

interface Player {
  id: string
  name: string
  firstName?: string
  lastName?: string
}

interface AssignPlayerNumberModalProps {
  player: Player
  onClose: () => void
  onAssignNumber: (player: Player, number: string) => void
}

export default function AssignPlayerNumberModal({ player, onClose, onAssignNumber }: AssignPlayerNumberModalProps) {
  const [gameNumber, setGameNumber] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (gameNumber.trim()) {
      onAssignNumber(player, gameNumber.trim())
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

        <h2 className="text-3xl font-bold text-white text-center mb-8">Добавить игрока</h2>

        <div className="bg-white rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                placeholder="Input game number*"
                value={gameNumber}
                onChange={(e) => setGameNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-lg"
                required
                maxLength={3}
              />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="primary-button">
                Добавить игрока
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
