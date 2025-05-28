"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface CreateMatchTeamSelectionModalProps {
  onClose: () => void
  onNext: (homeTeam: string, awayTeam: string) => void
  availableTeams: string[]
}

export default function CreateMatchTeamSelectionModal({
  onClose,
  onNext,
  availableTeams,
}: CreateMatchTeamSelectionModalProps) {
  const [homeTeam, setHomeTeam] = useState<string>("")
  const [awayTeam, setAwayTeam] = useState<string>("")

  const handleSelectHomeTeam = (team: string) => {
    setHomeTeam(team)
    // If the same team is selected for away, clear it
    if (awayTeam === team) {
      setAwayTeam("")
    }
  }

  const handleSelectAwayTeam = (team: string) => {
    setAwayTeam(team)
    // If the same team is selected for home, clear it
    if (homeTeam === team) {
      setHomeTeam("")
    }
  }

  const handleNext = () => {
    if (homeTeam && awayTeam && homeTeam !== awayTeam) {
      onNext(homeTeam, awayTeam)
    }
  }

  const isTeamSelected = (team: string) => {
    return team === homeTeam || team === awayTeam
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-6xl relative" onClick={(e) => e.stopPropagation()}>
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

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Home Team Section */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4">Команда хозяев</h3>

            {homeTeam && (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 bg-primary text-black rounded-full py-3 px-6 text-center text-lg font-semibold">
                  {homeTeam}
                </div>
                <button
                  onClick={() => setHomeTeam("")}
                  className="text-primary hover:text-blue-700"
                  aria-label="Убрать команду"
                >
                  <Minus size={24} />
                </button>
              </div>
            )}

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {availableTeams.map((team) => (
                <div key={`home-${team}`} className="flex items-center gap-4">
                  <div className="flex-1 bg-primary text-black rounded-full py-3 px-6 text-center text-lg font-semibold">
                    {team}
                  </div>
                  <button
                    onClick={() => handleSelectHomeTeam(team)}
                    disabled={isTeamSelected(team)}
                    className={`${
                      isTeamSelected(team) ? "text-gray-400 cursor-not-allowed" : "text-primary hover:text-blue-700"
                    }`}
                    aria-label="Выбрать команду хозяев"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Away Team Section */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4">Команда гостей</h3>

            {awayTeam && (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 bg-primary text-black rounded-full py-3 px-6 text-center text-lg font-semibold">
                  {awayTeam}
                </div>
                <button
                  onClick={() => setAwayTeam("")}
                  className="text-primary hover:text-blue-700"
                  aria-label="Убрать команду"
                >
                  <Minus size={24} />
                </button>
              </div>
            )}

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {availableTeams.map((team) => (
                <div key={`away-${team}`} className="flex items-center gap-4">
                  <div className="flex-1 bg-primary text-black rounded-full py-3 px-6 text-center text-lg font-semibold">
                    {team}
                  </div>
                  <button
                    onClick={() => handleSelectAwayTeam(team)}
                    disabled={isTeamSelected(team)}
                    className={`${
                      isTeamSelected(team) ? "text-gray-400 cursor-not-allowed" : "text-primary hover:text-blue-700"
                    }`}
                    aria-label="Выбрать команду гостей"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!homeTeam || !awayTeam || homeTeam === awayTeam}
            className="primary-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  )
}
