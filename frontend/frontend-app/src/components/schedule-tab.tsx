"use client"
import { useState, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MatchStatisticsModal from "./match-statistics-modal"

interface Match {
  match_id: number
  round: number
  home_team: string
  away_team: string
  home_team_score: number
  away_team_score: number
  date_ms: number
}

interface ScheduleTabProps {
  tournaments?: string[]
}

export default function ScheduleTab({ tournaments = ["Лига 2025", "Кубок 2025", "Чемпионат 2025"] }: ScheduleTabProps) {
  const [selectedTournament, setSelectedTournament] = useState<string | undefined>(undefined)
  const [matches, setMatches] = useState<Match[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sampleMatches: Match[] = [
    {
      match_id: 1,
      round: 1,
      home_team: "Команда1",
      away_team: "Команда2",
      home_team_score: 40,
      away_team_score: 20,
      date_ms: (new Date()).getTime(),
    },
    {
      match_id: 2,
      round: 2,
      home_team: "Команда1",
      away_team: "Команда3",
      home_team_score: 65,
      away_team_score: 64,
      date_ms: (new Date()).getTime(),
    },
    {
      match_id: 3,
      round: 3,
      home_team: "Команда1",
      away_team: "Команда4",
      home_team_score: 75,
      away_team_score: 68,
      date_ms: (new Date()).getTime(),
    },
    {
      match_id: 4,
      round: 4,
      home_team: "Команда2",
      away_team: "Команда1",
      home_team_score: 0,
      away_team_score: 0,
      date_ms: (new Date()).getTime(),
    },
  ]

  
  const handleUpdate = () => {
    if (!selectedTournament) return

    setIsLoading(true)
    // TODO: fetch data for schedule from server
    setTimeout(() => {
      setMatches(sampleMatches.length > 0 ? sampleMatches : [])
      setIsLoading(false)
    }, 500)
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 300

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  const openMatchStatistics = (match_id: number) => {
      setSelectedMatch(match_id)
      setIsModalOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        <div className="w-full md:w-1/2">
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

        <div className="flex items-end">
          <Button
            onClick={handleUpdate}
            disabled={!selectedTournament || isLoading}
            className="w-full md:w-auto bg-[#0f2d69] hover:bg-[#0f2d69]/90 text-white font-medium py-2 px-8 rounded-full"
          >
            {isLoading ? "Загрузка..." : "Обновить"}
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-[#0f2d69] font-bold text-xl mb-4">Матчи</h3>

        {matches === null ? (
          <div className="text-center py-8 text-gray-500">
            Выберите турнир, затем нажмите &apos;Обновить&apos; для просмотра матчей
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Нет матчей в этом турнире</div>
        ) : (
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-[#0f2d69]" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 py-4 px-10 bg-[#374b9b] rounded-3xl scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {matches.map((match) => (
                <div
                  key={match.match_id}
                  className={`flex-shrink-0 w-72 bg-white rounded-xl p-6 transition-shadow`}
                  onClick={() => openMatchStatistics(match.match_id)}
                >
                  <h4 className="text-[#0f2d69] font-bold text-xl text-right mb-6">Тур {match.round}</h4>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0f2d69]">{match.home_team_score}</div>
                      <div className="mt-2 text-[#0f2d69]">{match.home_team}</div>
                    </div>

                    <div className="text-3xl font-bold text-[#0f2d69]">:</div>

                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0f2d69]">{match.away_team_score}</div>
                      <div className="mt-2 text-[#0f2d69]">{match.away_team}</div>
                    </div>
                  </div>

                  <div className="text-center text-[#0f2d69] mt-6">
                    {new Date(match.date_ms).toDateString()}
                    <div className="mt-1 text-sm text-[#374b9b] font-medium">Нажмите для просмотра статистики</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-[#0f2d69]" />
            </button>
          </div>
        )}
      </div>

      {selectedMatch && (
        <MatchStatisticsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} match_id={selectedMatch} />
      )}
    </div>
  )
}
