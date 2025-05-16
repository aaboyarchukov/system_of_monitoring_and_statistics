"use client"

import { useState, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
// import { ChevronDown, ChevronUp } from "lucide-react"

interface Team {
  id: string
  name: string
  position: number
  wins: number
  losses: number
  pointsDifference: number
}

interface TournamentTableTabProps {
  tournaments?: string[]
  groups?: string[]
}

export default function TournamentTableTab({
  tournaments = ["Лига 2025", "Кубок 2025", "Чемпионат 2025"],
  groups = ["Группа A", "Группа B", "Группа C", "Группа D"],
}: TournamentTableTabProps) {
  const [selectedTournament, setSelectedTournament] = useState<string | undefined>(undefined)
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined)
  const [teams, setTeams] = useState<Team[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  // Sample team data - in a real app, this would come from an API
  const sampleTeams: Team[] = [
    {
      id: "2",
      name: "Команда2",
      position: 1,
      wins: 7,
      losses: 0,
      pointsDifference: 50,
    },
    {
      id: "1",
      name: "Команда1",
      position: 2,
      wins: 5,
      losses: 2,
      pointsDifference: 30,
    },
    {
      id: "4",
      name: "Команда4",
      position: 3,
      wins: 4,
      losses: 3,
      pointsDifference: 10,
    },
    {
      id: "3",
      name: "Команда3",
      position: 4,
      wins: 4,
      losses: 3,
      pointsDifference: 5,
    },
    {
      id: "5",
      name: "Команда5",
      position: 5,
      wins: 3,
      losses: 4,
      pointsDifference: -5,
    },
    {
      id: "6",
      name: "Команда6",
      position: 6,
      wins: 2,
      losses: 5,
      pointsDifference: -15,
    },
    {
      id: "7",
      name: "Команда7",
      position: 7,
      wins: 1,
      losses: 6,
      pointsDifference: -30,
    },
    {
      id: "8",
      name: "Команда8",
      position: 8,
      wins: 0,
      losses: 7,
      pointsDifference: -45,
    },
  ]

  const handleUpdate = () => {
    if (!selectedTournament || !selectedGroup) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setTeams(sampleTeams.length > 0 ? sampleTeams : [])
      setIsLoading(false)
    }, 500)
  }

//   const scroll = (direction: "up" | "down") => {
//     if (tableRef.current) {
//       const { current } = tableRef
//       const scrollAmount = 100

//       if (direction === "up") {
//         current.scrollBy({ top: -scrollAmount, behavior: "smooth" })
//       } else {
//         current.scrollBy({ top: scrollAmount, behavior: "smooth" })
//       }
//     }
//   }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <h3 className="text-[#0f2d69] font-bold text-xl mb-2">Турнир</h3>
          <Select onValueChange={setSelectedTournament}>
            <SelectTrigger className="w-full border-2 border-[#0f2d69] rounded-full">
              <SelectValue placeholder="Choose type of sport" />
            </SelectTrigger>
            <SelectContent>
              {tournaments.map((tournament) => (
                <SelectItem key={tournament} value={tournament}>
                  {tournament}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <h3 className="text-[#0f2d69] font-bold text-xl mb-2">Группа</h3>
          <Select onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-full border-2 border-[#0f2d69] rounded-full">
              <SelectValue placeholder="Choose type of sport" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleUpdate}
            disabled={!selectedTournament || !selectedGroup || isLoading}
            className="w-full md:w-auto bg-[#0f2d69] hover:bg-[#0f2d69]/90 text-white font-medium py-2 px-8 rounded-full"
          >
            {isLoading ? "Загрузка..." : "Обновить"}
          </Button>
        </div>
      </div>

      {teams === null ? (
        <div className="text-center py-8 text-gray-500">
          Выберите турнир и группу, затем нажмите &apos;Обновить&apos; для просмотра таблицы
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Нет данных для выбранного турнира и группы</div>
      ) : (
        <div className="bg-[#374b9b] rounded-3xl p-6">
          <h3 className="text-white font-bold text-xl mb-4">Группа</h3>

          <div className="relative">
            {/* {teams.length > 5 && (
              <button
                onClick={() => scroll("up")}
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
                aria-label="Scroll up"
              >
                <ChevronUp className="h-5 w-5 text-[#0f2d69]" />
              </button>
            )} */}

            <div
              ref={tableRef}
              className="bg-white rounded-xl overflow-y-auto max-h-[400px] scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <table className="w-full">
                <thead className="bg-white sticky top-0 z-10">
                  <tr className="border-b border-[#0f2d69]/20">
                    <th className="py-4 px-4 text-left text-[#0f2d69] font-bold">Место</th>
                    <th className="py-4 px-4 text-left text-[#0f2d69] font-bold">Команда</th>
                    <th className="py-4 px-4 text-center text-[#0f2d69] font-bold">Победы</th>
                    <th className="py-4 px-4 text-center text-[#0f2d69] font-bold">Поражения</th>
                    <th className="py-4 px-4 text-center text-[#0f2d69] font-bold">Очки</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id} className="border-b border-[#0f2d69]/10 hover:bg-gray-50">
                      <td className="py-4 px-4 text-[#0f2d69] font-bold">{team.position}</td>
                      <td className="py-4 px-4 text-[#0f2d69] font-bold">{team.name}</td>
                      <td className="py-4 px-4 text-center text-[#0f2d69]">{team.wins}</td>
                      <td className="py-4 px-4 text-center text-[#0f2d69]">{team.losses}</td>
                      <td className="py-4 px-4 text-center text-[#0f2d69] font-bold">
                        {team.pointsDifference > 0 ? `+${team.pointsDifference}` : team.pointsDifference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* {teams.length > 5 && (
              <button
                onClick={() => scroll("down")}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/80 rounded-full p-1 shadow-md"
                aria-label="Scroll down"
              >
                <ChevronDown className="h-5 w-5 text-[#0f2d69]" />
              </button>
            )} */}
          </div>
        </div>
      )}
    </div>
  )
}
