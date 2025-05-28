"use client"

import type React from "react"

import { useState } from "react"

interface CreateLeagueModalProps {
  onClose: () => void
}

export default function CreateLeagueModal({ onClose }: CreateLeagueModalProps) {
  const [leagueName, setLeagueName] = useState<string>("")
  const [sportType, setSportType] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle league creation logic here
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-bold text-white text-center mb-8">Новая лига</h2>

        <div className="bg-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-center mb-8">Название лиги</h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <input
                type="text"
                placeholder="Name*"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-2"
                required
              />
            </div>

            <div>
              <div className="relative">
                <select
                  value={sportType}
                  onChange={(e) => setSportType(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 appearance-none"
                  required
                >
                  <option value="" disabled>
                    Choose type of sport
                  </option>
                  <option value="basketball">Ба��кетбол</option>
                  <option value="football">Футбол</option>
                  <option value="volleyball">Волейбол</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <button type="submit" className="primary-button w-full">
              Создать новую лигу
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
