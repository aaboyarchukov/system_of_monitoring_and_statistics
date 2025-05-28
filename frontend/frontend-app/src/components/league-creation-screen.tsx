"use client"

import { Plus } from "lucide-react"

interface LeagueCreationScreenProps {
  onLeagueClick: (leagueName: string) => void
  onCreateLeague: () => void
  sportType: string
}

export default function LeagueCreationScreen({ onLeagueClick, onCreateLeague, sportType }: LeagueCreationScreenProps) {
  const leagues = ["Лига1", "Лига2", "Лига2"]

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white mb-8">{sportType}</h1>

      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Лиги</h2>
        <button onClick={onCreateLeague} className="ml-4 text-white hover:text-gray-200" aria-label="Создать лигу">
          <Plus size={28} />
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
          {leagues.map((league, index) => (
            <div key={index} className="league-item" onClick={() => onLeagueClick(league)}>
              {league}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
