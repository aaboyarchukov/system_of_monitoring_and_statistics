"use client"

import { useState } from "react"
import { Plus, ArrowLeft } from "lucide-react"

interface LeagueDetailsScreenProps {
  leagueName: string
  sportType: string
  onCreateTournament: () => void
  onCreateTeam: () => void
  onTeamClick: (teamName: string) => void
  onTournamentClick: (tournamentName: string) => void
  onBackClick: () => void
}

export default function LeagueDetailsScreen({
  leagueName,
  sportType,
  onCreateTournament,
  onCreateTeam,
  onTeamClick,
  onTournamentClick,
  onBackClick,
}: LeagueDetailsScreenProps) {
  const [activeTab, setActiveTab] = useState<string>("tournaments")
  const tournaments = ["Турнир1", "Турнир2"]
  const teams = ["Команда1", "Команда2", "Команда3", "Команда4"]

  return (
    <div className="p-6">
      <button
        onClick={onBackClick}
        className="text-white hover:text-gray-200 mb-4 flex items-center"
        aria-label="Назад"
      >
        <ArrowLeft size={24} className="mr-2" />
      </button>

      <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-primary">{leagueName}</h1>
        <p className="text-xl text-primary">{sportType}</p>
      </div>

      <div className="flex mb-4">
        <div className="flex items-center">
          <button
            className={`text-2xl text-white mr-4 pb-2 ${activeTab === "tournaments" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("tournaments")}
          >
            Турниры
          </button>
          <button
            onClick={onCreateTournament}
            className="text-white hover:text-gray-200 mr-8"
            aria-label="Создать турнир"
          >
            <Plus size={28} />
          </button>
        </div>

        <div className="flex items-center">
          <button
            className={`text-2xl text-white mr-4 pb-2 ${activeTab === "teams" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("teams")}
          >
            Команды
          </button>
          <button onClick={onCreateTeam} className="text-white hover:text-gray-200" aria-label="Создать команду">
            <Plus size={28} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
          {activeTab === "tournaments" ? (
            tournaments.length > 0 ? (
              tournaments.map((tournament, index) => (
                <div
                  key={index}
                  className="tournament-item cursor-pointer"
                  onClick={() => onTournamentClick(tournament)}
                >
                  {tournament}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Нет турниров</p>
            )
          ) : teams.length > 0 ? (
            teams.map((team, index) => (
              <div key={index} className="tournament-item cursor-pointer" onClick={() => onTeamClick(team)}>
                {team}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Нет команд</p>
          )}
        </div>
      </div>
    </div>
  )
}
