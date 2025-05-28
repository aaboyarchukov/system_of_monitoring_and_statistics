"use client"

import { useState } from "react"
import { Search } from "lucide-react"

interface AddTeamModalProps {
  onClose: () => void
  onCreateNewTeam: () => void
  onAddExistingTeam: (teamName: string) => void
}

export default function AddTeamModal({ onClose, onCreateNewTeam, onAddExistingTeam }: AddTeamModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Mock data for existing teams in the league
  const allTeams = ["Команда1", "Команда2", "Команда3", "Команда4", "Команда5", "Команда6"]

  // Filter teams based on search query
  const filteredTeams = allTeams.filter((team) => team.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddTeam = (teamName: string) => {
    onAddExistingTeam(teamName)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-4xl relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-8">Добавить команду</h2>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search*"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 text-lg"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button onClick={onCreateNewTeam} className="primary-button whitespace-nowrap">
            Создать команду
          </button>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1 bg-primary text-0F2D69 rounded-lg p-4 text-xl font-semibold text-center">
                    {team}
                  </div>
                  <button onClick={() => handleAddTeam(team)} className="primary-button whitespace-nowrap">
                    Добавить
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                {searchQuery ? "Команды не найдены" : "Нет доступных команд"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
