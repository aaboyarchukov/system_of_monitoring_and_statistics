"use client"

import { useRef, useEffect } from "react"
import { X } from "lucide-react"

interface StatColumn {
  key: string
  label: string
}

interface PlayerStat {
    [key: string]: string | number
}

interface TeamStats {
  teamName: string
  score: number
  players: PlayerStat[]
}

interface MatchStatisticsModalProps {
  isOpen: boolean
  onClose: () => void
  match: {
    id: string
    team1: string
    team2: string
    score1: number | null
    score2: number | null
    date: string
    round: number
    statistics?: {
      team1Stats: TeamStats
      team2Stats: TeamStats
      columns: StatColumn[]
    }
  }
}

export default function MatchStatisticsModal({ isOpen, onClose, match }: MatchStatisticsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Default columns if none provided
  const defaultColumns: StatColumn[] = [
    { key: "number", label: "N" },
    { key: "name", label: "Имя" },
    { key: "points", label: "Очки" },
    { key: "assists", label: "Пер." },
  ]

  // Use provided statistics or fallback to default data
  const statistics = match.statistics || {
    columns: defaultColumns,
    team1Stats: {
      teamName: match.team1,
      score: match.score1 || 0,
      players: Array(6)
        .fill(null)
        .map(() => ({
          number: 1,
          name: "Имя1",
          points: 20,
          assists: 5,
        })),
    },
    team2Stats: {
      teamName: match.team2,
      score: match.score2 || 0,
      players: Array(6)
        .fill(null)
        .map(() => ({
            number: 1,
            name: "Имя1",
            points: 20,
            assists: 5,
        })),
    },
  }

  const { columns, team1Stats, team2Stats } = statistics

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div ref={modalRef} className="bg-[#374b9b] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-6 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1"></div>
            <h2 className="text-white text-2xl font-bold text-center flex-1">Счет</h2>
            <div className="flex-1 flex justify-end">
              <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors" aria-label="Close">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center mb-8">
            <div className="text-white text-5xl font-bold">{team1Stats.score}</div>
            <div className="text-white text-5xl font-bold mx-4">:</div>
            <div className="text-white text-5xl font-bold">{team2Stats.score}</div>
          </div>

          <h3 className="text-white text-2xl font-bold text-center mb-6">Статистика</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team 1 Statistics */}
            <div className="flex flex-col">
              <h4 className="text-white text-xl font-bold mb-3 text-center">{team1Stats.teamName}</h4>
              <div className="bg-white rounded-xl overflow-hidden">
                <div
                  className="overflow-x-auto max-h-[300px] scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-[#374b9b]/20">
                        {columns.map((column) => (
                          <th
                            key={column.key}
                            className="py-3 px-4 text-[#374b9b] font-bold text-center whitespace-nowrap"
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {team1Stats.players.map((player, index) => (
                        <tr key={index} className="border-b border-[#374b9b]/10">
                          {columns.map((column) => (
                            <td
                              key={`${index}-${column.key}`}
                              className="py-3 px-4 text-[#374b9b] text-center whitespace-nowrap"
                            >
                              {player[column.key as keyof typeof player]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Team 2 Statistics */}
            <div className="flex flex-col">
              <h4 className="text-white text-xl font-bold mb-3 text-center">{team2Stats.teamName}</h4>
              <div className="bg-white rounded-xl overflow-hidden">
                <div
                  className="overflow-x-auto max-h-[300px] scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-[#374b9b]/20">
                        {columns.map((column) => (
                          <th
                            key={column.key}
                            className="py-3 px-4 text-[#374b9b] font-bold text-center whitespace-nowrap"
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {team2Stats.players.map((player, index) => (
                        <tr key={index} className="border-b border-[#374b9b]/10">
                          {columns.map((column) => (
                            <td
                              key={`${index}-${column.key}`}
                              className="py-3 px-4 text-[#374b9b] text-center whitespace-nowrap"
                            >
                              {player[column.key as keyof typeof player]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
