"use client"

import type React from "react"
import { useState } from "react"

interface CreateTeamModalProps {
  onClose: () => void
  onCreate: () => void
}

export default function CreateTeamModal({ onClose, onCreate }: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle team creation logic here
    onCreate()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-bold text-white text-center mb-8">Новая команда</h2>

        <div className="bg-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-center mb-8">Создание команды</h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                placeholder="Название команды*"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2"
                required
              />
            </div>

            <button type="submit" className="primary-button w-full">
              Создать команду
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
