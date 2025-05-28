"use client"

import { useState } from "react"
import { Search } from "lucide-react"

interface Player {
  id: string
  name: string
  firstName?: string
  lastName?: string
}

interface AddPlayerModalProps {
  onClose: () => void
  onCreateNewPlayer: () => void
  onAssignPlayerNumber: (player: Player) => void
}

export default function AddPlayerModal({ onClose, onCreateNewPlayer, onAssignPlayerNumber }: AddPlayerModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Mock data for available players in the league (not in current team)
  const availablePlayers: Player[] = [
    { id: "4", name: "Игрок1", firstName: "Алексей", lastName: "Алексеев" },
    { id: "5", name: "Игрок2", firstName: "Дмитрий", lastName: "Дмитриев" },
    { id: "6", name: "Игрок3", firstName: "Николай", lastName: "Николаев" },
    { id: "7", name: "Игрок4", firstName: "Андрей", lastName: "Андреев" },
    { id: "8", name: "Игрок5", firstName: "Михаил", lastName: "Михайлов" },
  ]

  // Filter players based on search query
  const filteredPlayers = availablePlayers.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAssignNumber = (player: Player) => {
    onAssignPlayerNumber(player)
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

        <h2 className="text-3xl font-bold text-white text-center mb-8">Добавить игрока</h2>

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
          <button onClick={onCreateNewPlayer} className="primary-button whitespace-nowrap">
            Создать игрока
          </button>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <div key={player.id} className="flex items-center gap-4">
                  <div className="flex-1 bg-primary text-0F2D69 rounded-lg p-4 text-xl font-semibold text-center">
                    {player.name}
                  </div>
                  <button onClick={() => handleAssignNumber(player)} className="primary-button whitespace-nowrap">
                    Ввести игровой номер
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                {searchQuery ? "Игроки не найдены" : "Нет доступных игроков"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
