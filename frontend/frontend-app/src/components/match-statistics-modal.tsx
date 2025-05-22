"use client"
import { useRef, useEffect, useState } from "react"
import { X } from "lucide-react"

interface MeasurementsFields {
  key: string
  label: string
}

interface PlayerMeasurements {
  [key: string]: string | number
}

interface MatchStats {
  statistic_measurements: Array<MeasurementsFields>
  home_team_statistic: TeamStats
  away_team_statistic: TeamStats

}

interface TeamStats {
  name: string
  score: number
  players_stats: Array<PlayerMeasurements>
}

interface MatchStatisticsModalProps {
  isOpen: boolean
  onClose: () => void
  match_id: number
}

export default function MatchStatisticsModal({ isOpen, onClose, match_id }: MatchStatisticsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  
  // TODO: ATTENTION
  // implement fetching data for measurements fields
  // according to sport type 
  const defaultMeasurements: MeasurementsFields[] = [
    { key: "number", label: "N" },
    { key: "name", label: "Имя" },
    { key: "points", label: "Очки" },
    { key: "assists", label: "Пер." },
  ]

  const defaultMatch : MatchStats = {
    statistic_measurements: defaultMeasurements,
    home_team_statistic: {
      name: "Команда 1",
      score: 20,
      players_stats: Array<PlayerMeasurements>(6)
        .map(() => ({
          "game_number": 1,
          "name": "Имя1",
          "points": 20,
          "assists": 5,
        })),
    },
    away_team_statistic: {
      name: "Команда 2",
      score: 40,
      players_stats: Array<PlayerMeasurements>(6)
        .map(() => ({
            game_number: 1,
            name: "Имя1",
            points: 20,
            assists: 5,
        })),
    },
  }

  const [match, setMatch] = useState<MatchStats>(defaultMatch)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

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

  const FetchMatch = async() => {
    try {
          const response = await fetch("http://localhost:50540/get_match_statistic", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
                match_id: match_id,
              }
            ),
          })
      
          if (!response.ok) {
            const errorData = await response.json()
            alert(errorData.message || response.status)
            return
          }
      
          const matchStatistic = await response.json()
          setMatch(matchStatistic)
        } catch (error) {
          console.error("Сетевая ошибка:", error)
        }
  }
  useEffect(() => {
    FetchMatch()
  })

  if (!isOpen) return null

  const { statistic_measurements, home_team_statistic, away_team_statistic } = match

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
            <div className="text-white text-5xl font-bold">{home_team_statistic.score}</div>
            <div className="text-white text-5xl font-bold mx-4">:</div>
            <div className="text-white text-5xl font-bold">{away_team_statistic.score}</div>
          </div>

          <h3 className="text-white text-2xl font-bold text-center mb-6">Статистика</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team 1 Statistics */}
            <div className="flex flex-col">
              <h4 className="text-white text-xl font-bold mb-3 text-center">{home_team_statistic.name}</h4>
              <div className="bg-white rounded-xl overflow-hidden">
                <div
                  className="overflow-x-auto max-h-[300px] scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-[#374b9b]/20">
                        {statistic_measurements.map((measurement) => (
                          <th
                            key={measurement.key}
                            className="py-3 px-4 text-[#374b9b] font-bold text-center whitespace-nowrap"
                          >
                            {measurement.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {home_team_statistic.players_stats.map((player, index) => (
                        <tr key={index} className="border-b border-[#374b9b]/10">
                          {statistic_measurements.map((measurement) => (
                            <td
                              key={`${index}-${measurement.key}`}
                              className="py-3 px-4 text-[#374b9b] text-center whitespace-nowrap"
                            >
                              {player[measurement.key as keyof typeof player]}
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
              <h4 className="text-white text-xl font-bold mb-3 text-center">{away_team_statistic.name}</h4>
              <div className="bg-white rounded-xl overflow-hidden">
                <div
                  className="overflow-x-auto max-h-[300px] scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-[#374b9b]/20">
                        {defaultMeasurements.map((measurement) => (
                          <th
                            key={measurement.key}
                            className="py-3 px-4 text-[#374b9b] font-bold text-center whitespace-nowrap"
                          >
                            {measurement.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {away_team_statistic.players_stats.map((player, index) => (
                        <tr key={index} className="border-b border-[#374b9b]/10">
                          {defaultMeasurements.map((measurement) => (
                            <td
                              key={`${index}-${measurement.key}`}
                              className="py-3 px-4 text-[#374b9b] text-center whitespace-nowrap"
                            >
                              {player[measurement.key as keyof typeof player]}
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
