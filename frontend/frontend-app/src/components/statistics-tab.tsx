"use client"

import { useState, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MatchStatisticsModal from "./match-statistics-modal"

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

interface Match {
  id: string
  round: number
  team1: string
  team2: string
  score1: number
  score2: number
  date: string
  statistics?: {
    team1Stats: TeamStats
    team2Stats: TeamStats
    columns: StatColumn[]
  }
}

interface StatisticsTabProps {
  userTeams?: string[]
  tournaments?: string[]
}

// Helper function to generate random integer between min and max (inclusive)
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

// Helper function to generate random player statistics
const generatePlayerStats = (playerNumber: number, isScoringTeam = false) => {
  // Base stats that are more likely to be higher for scoring team
  const basePoints = isScoringTeam ? randomInt(4, 20) : randomInt(2, 15)

  // Generate field goal attempts and makes
  const fgAttempts = randomInt(5, 15)
  const fgMade = Math.min(randomInt(1, fgAttempts), fgAttempts)

  // Generate 3-point attempts and makes
  const tpAttempts = randomInt(2, 8)
  const tpMade = Math.min(randomInt(0, tpAttempts), tpAttempts)

  // Generate free throw attempts and makes
  const ftAttempts = randomInt(0, 8)
  const ftMade = Math.min(randomInt(0, ftAttempts), ftAttempts)

  // Calculate total points
  const points = (fgMade - tpMade) * 2 + tpMade * 3 + ftMade

  return {
    number: playerNumber,
    name: `Игрок${playerNumber}`,
    points: points,
    fgm: fgMade,
    fga: fgAttempts,
    fgp: fgAttempts > 0 ? Math.round((fgMade / fgAttempts) * 100) : 0,
    tpm: tpMade,
    tpa: tpAttempts,
    tpp: tpAttempts > 0 ? Math.round((tpMade / tpAttempts) * 100) : 0,
    ftm: ftMade,
    fta: ftAttempts,
    ftp: ftAttempts > 0 ? Math.round((ftMade / ftAttempts) * 100) : 0,
    oreb: randomInt(0, 5),
    dreb: randomInt(0, 7),
    reb: randomInt(1, 10),
    ast: randomInt(0, 8),
    stl: randomInt(0, 4),
    blk: randomInt(0, 3),
    to: randomInt(0, 5),
    pf: randomInt(0, 5),
    plusMinus: randomInt(-15, 15),
    min: `${randomInt(10, 35)}:${randomInt(0, 59).toString().padStart(2, "0")}`,
  }
}

// Helper function to generate team statistics
const generateTeamStats = (teamName: string, score: number, isWinningTeam = false) => {
  const players = []
  for (let i = 1; i <= 12; i++) {
    players.push(generatePlayerStats(i, isWinningTeam))
  }

  return {
    teamName,
    score,
    players,
  }
}

export default function StatisticsTab({
  userTeams = ["Команда1", "Команда2", "Команда3"],
  tournaments = ["Лига 2025", "Кубок 2025", "Чемпионат 2025"],
}: StatisticsTabProps) {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined)
  const [selectedTournament, setSelectedTournament] = useState<string | undefined>(undefined)
  const [matches, setMatches] = useState<Match[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Extended columns for basketball statistics
  const basketballColumns: StatColumn[] = [
    { key: "number", label: "№" },
    { key: "name", label: "Игрок" },
    { key: "min", label: "МИН" },
    { key: "points", label: "ОЧК" },
    { key: "fgm", label: "2ОЧК-М" },
    { key: "fga", label: "2ОЧК-П" },
    { key: "fgp", label: "2ОЧК%" },
    { key: "tpm", label: "3ОЧК-М" },
    { key: "tpa", label: "3ОЧК-П" },
    { key: "tpp", label: "3ОЧК%" },
    { key: "ftm", label: "ШТР-М" },
    { key: "fta", label: "ШТР-П" },
    { key: "ftp", label: "ШТР%" },
    { key: "oreb", label: "ПД-Н" },
    { key: "dreb", label: "ПД-З" },
    { key: "reb", label: "ПД-В" },
    { key: "ast", label: "ПРД" },
    { key: "stl", label: "ПРХ" },
    { key: "blk", label: "БЛК" },
    { key: "to", label: "ПОТ" },
    { key: "pf", label: "ФОЛ" },
    { key: "plusMinus", label: "+/-" },
  ]

  // Sample match data with statistics - in a real app, this would come from an API
  const sampleMatches: Match[] = [
    {
      id: "1",
      round: 1,
      team1: "Команда1",
      team2: "Команда2",
      score1: 40,
      score2: 20,
      date: "6 апреля, 2025",
      statistics: {
        columns: basketballColumns,
        team1Stats: generateTeamStats("Команда1", 40, true),
        team2Stats: generateTeamStats("Команда2", 20, false),
      },
    },
    {
      id: "2",
      round: 2,
      team1: "Команда1",
      team2: "Команда3",
      score1: 65,
      score2: 64,
      date: "12 апреля, 2025",
      statistics: {
        columns: basketballColumns,
        team1Stats: generateTeamStats("Команда1", 65, true),
        team2Stats: generateTeamStats("Команда3", 64, false),
      },
    },
    {
      id: "3",
      round: 3,
      team1: "Команда1",
      team2: "Команда4",
      score1: 75,
      score2: 68,
      date: "24 апреля, 2025",
      statistics: {
        columns: basketballColumns,
        team1Stats: generateTeamStats("Команда1", 75, true),
        team2Stats: generateTeamStats("Команда4", 68, false),
      },
    },
    {
      id: "4",
      round: 4,
      team1: "Команда2",
      team2: "Команда1",
      score1: 55,
      score2: 60,
      date: "30 апреля, 2025",
      statistics: {
        columns: basketballColumns,
        team1Stats: generateTeamStats("Команда2", 55, false),
        team2Stats: generateTeamStats("Команда1", 60, true),
      },
    },
  ]

  const handleUpdate = () => {
    if (!selectedTeam || !selectedTournament) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Filter matches where the selected team participated
      const teamMatches = sampleMatches.filter((match) => match.team1 === selectedTeam || match.team2 === selectedTeam)

      setMatches(teamMatches.length > 0 ? teamMatches : [])
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

  const openMatchStatistics = (match: Match) => {
    setSelectedMatch(match)
    setIsModalOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <h3 className="text-[#0f2d69] font-bold text-xl mb-2">Команда</h3>
          <Select onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-full border-2 border-[#0f2d69] rounded-full">
              <SelectValue placeholder="Choose type of sport" />
            </SelectTrigger>
            <SelectContent>
              {userTeams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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

        <div className="flex items-end">
          <Button
            onClick={handleUpdate}
            disabled={!selectedTeam || !selectedTournament || isLoading}
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
            Выберите команду и турнир, затем нажмите &apos;Обновить&apos; для просмотра матчей
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Нет матчей для выбранной команды в этом турнире</div>
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
                  key={match.id}
                  className="flex-shrink-0 w-72 bg-white rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => openMatchStatistics(match)}
                >
                  <h4 className="text-[#0f2d69] font-bold text-xl text-right mb-6">Тур {match.round}</h4>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0f2d69]">{match.score1}</div>
                      <div className="mt-2 text-[#0f2d69]">{match.team1}</div>
                    </div>

                    <div className="text-3xl font-bold text-[#0f2d69]">:</div>

                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0f2d69]">{match.score2}</div>
                      <div className="mt-2 text-[#0f2d69]">{match.team2}</div>
                    </div>
                  </div>

                  <div className="text-center text-[#0f2d69] mt-6">
                    {match.date}
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
        <MatchStatisticsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} match={selectedMatch} />
      )}
    </div>
  )
}
