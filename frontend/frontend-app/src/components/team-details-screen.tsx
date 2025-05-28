"use client"
import { Plus, ArrowLeft } from "lucide-react"

interface Player {
  id: string
  number: string
  name: string
  firstName?: string
  lastName?: string
  height?: string
  weight?: string
  age?: string
}

interface TeamDetailsScreenProps {
  teamName: string
  leagueName: string
  sportType: string
  onBackClick: () => void
  onPlayerClick: (player: Player) => void
  onAddPlayer: () => void
}

export default function TeamDetailsScreen({
  teamName,
  leagueName,
  sportType,
  onBackClick,
  onPlayerClick,
  onAddPlayer,
}: TeamDetailsScreenProps) {
  // Mock player data
  const players: Player[] = [
    {
      id: "1",
      number: "23",
      name: "Игрок1",
      firstName: "Иван",
      lastName: "Иванов",
      height: "185",
      weight: "75",
      age: "25",
    },
    {
      id: "2",
      number: "2",
      name: "Игрок2",
      firstName: "Петр",
      lastName: "Петров",
      height: "190",
      weight: "80",
      age: "23",
    },
    {
      id: "3",
      number: "11",
      name: "Игрок3",
      firstName: "Сергей",
      lastName: "Сергеев",
      height: "178",
      weight: "70",
      age: "27",
    },
  ]

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
        <h1 className="text-3xl font-bold text-primary">{teamName}</h1>
        <p className="text-xl text-primary">
          {sportType}. {leagueName}
        </p>
      </div>

      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold text-white">Игроки</h2>
        <button onClick={onAddPlayer} className="ml-4 text-white hover:text-gray-200" aria-label="Добавить игрока">
          <Plus size={28} />
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
          {players.length > 0 ? (
            players.map((player) => (
              <div
                key={player.id}
                className="bg-primary text-0F2D69 rounded-lg p-4 flex items-center cursor-pointer hover:bg-opacity-90 transition-colors"
                onClick={() => onPlayerClick(player)}
              >
                <div className="text-2xl font-bold mr-6 min-w-[60px]">{player.number}</div>
                <div className="text-xl font-semibold">{player.name}</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Нет игроков в команде</p>
          )}
        </div>
      </div>
    </div>
  )
}
