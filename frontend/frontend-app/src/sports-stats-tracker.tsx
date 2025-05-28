"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlayerCircle } from "./components/player-circle"
import { TimerDisplay } from "./components/timer-display"
import { StatisticsModal } from "./components/statistics-modal"
import { SubstitutionModal } from "./components/substitution-modal"
import { TimeoutModal } from "./components/timeout-modal"
import { TimeAdjustmentModal } from "./components/time-adjustment-modal"
import { GameEndScreen } from "./components/game-end-screen"
import { useGameTimer } from "./hooks/use-game-timer"
import { useLocalStorage } from "./hooks/use-local-storage"
import type { GameState, GameAction, Player } from "./types/game"

// Football (Soccer) Actions
const FOOTBALL_ACTIONS: GameAction[] = [
  { id: "goal", name: "Гол", points: 1 },
  { id: "assist", name: "Голевая передача" },
  { id: "shot", name: "Удар по воротам" },
  { id: "save", name: "Сейв" },
  { id: "pass", name: "Передача" },
  { id: "tackle", name: "Отбор" },
  { id: "interception", name: "Перехват" },
  { id: "yellow_card", name: "Желтая карточка" },
  { id: "red_card", name: "Красная карточка" },
]

// Basketball Actions (keeping for reference)
const BASKETBALL_ACTIONS: GameAction[] = [
  { id: "2pt", name: "2 очка", points: 2 },
  { id: "3pt", name: "3 очка", points: 3 },
  { id: "1pt", name: "1 очко", points: 1 },
  { id: "rebound", name: "Подбор" },
  { id: "steal", name: "Перехват" },
  { id: "assist", name: "Передача" },
  { id: "turnover", name: "Потеря" },
  { id: "block", name: "Блок-шот" },
  { id: "foul", name: "Фол" },
]

// Football game configuration
const footballGameState: GameState = {
  team1: {
    id: "team1",
    name: "Реал Мадрид",
    players: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      number: i + 1,
      isOnCourt: i < 11, // 11 players on field
      fouls: 0,
      isDisqualified: false,
    })),
    score: 0,
    fouls: 0,
    timeouts: 0,
    maxTimeoutsPerPeriod: 0, // No timeouts in football
  },
  team2: {
    id: "team2",
    name: "Барселона",
    players: Array.from({ length: 16 }, (_, i) => ({
      id: i + 17,
      name: `Player ${i + 17}`,
      number: i + 1,
      isOnCourt: i < 11, // 11 players on field
      fouls: 0,
      isDisqualified: false,
    })),
    score: 0,
    fouls: 0,
    timeouts: 0,
    maxTimeoutsPerPeriod: 0, // No timeouts in football
  },
  currentPeriod: 1,
  timeRemaining: 2700, // 45 minutes
  isRunning: false,
  config: {
    playersOnCourt: 11, // 11 players on field
    totalPlayers: 16,
    periods: 2, // Two halves
    periodDuration: 45, // 45 minutes per half
    timeoutDuration: 0,
    maxTimeoutsPerPeriod: 0,
    foulLimit: 10, // Team foul limit
    playerFoulLimit: 2, // Red card after 2 yellow cards
    sportType: "football",
  },
  timeout: {
    isActive: false,
    team: "",
    timeRemaining: 0,
    duration: 0,
  },
}

// Basketball game configuration (keeping for reference)
const basketballGameState: GameState = {
  team1: {
    id: "team1",
    name: "Команда1",
    players: Array.from({ length: 11 }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      number: i + 1,
      isOnCourt: i < 5,
      fouls: 0,
      isDisqualified: false,
    })),
    score: 0,
    fouls: 0,
    timeouts: 0,
    maxTimeoutsPerPeriod: 2,
  },
  team2: {
    id: "team2",
    name: "Команда2",
    players: Array.from({ length: 11 }, (_, i) => ({
      id: i + 12,
      name: `Player ${i + 12}`,
      number: i + 1,
      isOnCourt: i < 5,
      fouls: 0,
      isDisqualified: false,
    })),
    score: 0,
    fouls: 0,
    timeouts: 0,
    maxTimeoutsPerPeriod: 2,
  },
  currentPeriod: 1,
  timeRemaining: 600, // 10 minutes
  isRunning: false,
  config: {
    playersOnCourt: 5,
    totalPlayers: 11,
    periods: 4,
    periodDuration: 10,
    timeoutDuration: 60,
    maxTimeoutsPerPeriod: 2,
    foulLimit: 5,
    playerFoulLimit: 5,
    sportType: "basketball",
  },
  timeout: {
    isActive: false,
    team: "",
    timeRemaining: 0,
    duration: 60,
  },
}

export default function SportsStatsTracker() {
  // Use football configuration by default - change to basketballGameState for basketball
  const [gameState, setGameState] = useLocalStorage("gameState", basketballGameState)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showSubModal, setShowSubModal] = useState<"team1" | "team2" | null>(null)
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [forcedSubstitution, setForcedSubstitution] = useState<{
    team: "team1" | "team2"
    player: Player
  } | null>(null)

  const { timeRemaining, isRunning, start, pause, reset } = useGameTimer(gameState.timeRemaining)

  // Determine which actions to use based on sport type
  const gameActions = gameState.config.sportType === "football" ? FOOTBALL_ACTIONS : BASKETBALL_ACTIONS

  // Save game state to localStorage when important changes happen
  const saveGameState = useCallback(
    (newState: GameState) => {
      setGameState(newState)
    },
    [setGameState],
  )

  // Handle automatic substitution when a player is disqualified
  const handlePlayerDisqualification = useCallback(
    (teamKey: "team1" | "team2", disqualifiedPlayer: Player) => {
      const team = gameState[teamKey]
      const availableBenchPlayers = team.players.filter((p) => !p.isOnCourt && !p.isDisqualified)

      if (availableBenchPlayers.length === 0) {
        // No available substitutes - team plays short-handed
        alert(`${team.name}: Нет доступных игроков для замены. Команда играет в меньшинстве!`)
        return
      }

      if (availableBenchPlayers.length === 1) {
        // Only one available substitute - automatic substitution
        const newState = { ...gameState }
        newState[teamKey].players = newState[teamKey].players.map((p) => {
          if (p.id === disqualifiedPlayer.id) return { ...p, isOnCourt: false }
          if (p.id === availableBenchPlayers[0].id) return { ...p, isOnCourt: true }
          return p
        })
        saveGameState(newState)
        alert(
          `${team.name}: Игрок №${disqualifiedPlayer.number} дисквалифицирован. Автоматическая замена на игрока №${availableBenchPlayers[0].number}`,
        )
      } else {
        // Multiple available substitutes - open substitution modal
        setForcedSubstitution({ team: teamKey, player: disqualifiedPlayer })
        setShowSubModal(teamKey)
      }
    },
    [gameState, saveGameState],
  )

  // Check for newly disqualified players
  useEffect(() => {
    const checkForNewDisqualifications = () => {
      // Check team1
      const team1NewlyDisqualified = gameState.team1.players.find(
        (p) => p.isOnCourt && p.isDisqualified && !forcedSubstitution,
      )
      if (team1NewlyDisqualified) {
        handlePlayerDisqualification("team1", team1NewlyDisqualified)
        return
      }

      // Check team2
      const team2NewlyDisqualified = gameState.team2.players.find(
        (p) => p.isOnCourt && p.isDisqualified && !forcedSubstitution,
      )
      if (team2NewlyDisqualified) {
        handlePlayerDisqualification("team2", team2NewlyDisqualified)
        return
      }
    }

    checkForNewDisqualifications()
  }, [gameState, forcedSubstitution, handlePlayerDisqualification])

  const handlePlayerClick = (player: Player) => {
    if (player.isOnCourt && !player.isDisqualified) {
      setSelectedPlayer(player)
      setShowStatsModal(true)
    }
  }

  const handleActionSelect = (action: GameAction) => {
    if (!selectedPlayer) return

    const newState = { ...gameState }
    const team = selectedPlayer.id <= gameState.config.totalPlayers / 2 ? "team1" : "team2"

    if (action.points) {
      newState[team].score += action.points
    }

    // Handle different types of fouls/cards based on sport
    if (action.id === "foul" || action.id === "yellow_card") {
      newState[team].fouls += 1
      newState[team].players = newState[team].players.map((p) => {
        if (p.id === selectedPlayer.id) {
          const newFouls = p.fouls + 1
          const isDisqualified = newFouls >= gameState.config.playerFoulLimit
          return {
            ...p,
            fouls: newFouls,
            isDisqualified,
          }
        }
        return p
      })
    }

    // Handle red card (immediate disqualification)
    if (action.id === "red_card") {
      newState[team].fouls += 1
      newState[team].players = newState[team].players.map((p) => {
        if (p.id === selectedPlayer.id) {
          return {
            ...p,
            fouls: p.fouls + 2, // Red card = 2 fouls
            isDisqualified: true,
          }
        }
        return p
      })
    }

    saveGameState(newState)
    setSelectedPlayer(null)
  }

  const handleSubstitution = (playerOut: Player, playerIn: Player) => {
    const newState = { ...gameState }
    const team = playerOut.id <= gameState.config.totalPlayers / 2 ? "team1" : "team2"

    newState[team].players = newState[team].players.map((p) => {
      if (p.id === playerOut.id) return { ...p, isOnCourt: false }
      if (p.id === playerIn.id) return { ...p, isOnCourt: true }
      return p
    })

    saveGameState(newState)

    // Clear forced substitution if this was a forced sub
    if (forcedSubstitution && playerOut.id === forcedSubstitution.player.id) {
      setForcedSubstitution(null)
    }
  }

  const handleTimeout = (team: "team1" | "team2") => {
    if (gameState.config.maxTimeoutsPerPeriod === 0) {
      alert("В этом виде спорта тайм-ауты не предусмотрены!")
      return
    }

    const currentTeam = gameState[team]
    if (currentTeam.timeouts >= currentTeam.maxTimeoutsPerPeriod) {
      alert("Превышено максимальное количество тайм-аутов для этого периода!")
      return
    }

    const newState = {
      ...gameState,
      [team]: { ...gameState[team], timeouts: gameState[team].timeouts + 1 },
      timeout: {
        isActive: true,
        team: gameState[team].name,
        timeRemaining: gameState.config.timeoutDuration,
        duration: gameState.config.timeoutDuration,
      },
    }

    pause()
    saveGameState(newState)
  }

  const handleTimeoutComplete = () => {
    const newState = {
      ...gameState,
      timeout: {
        ...gameState.timeout,
        isActive: false,
      },
    }
    saveGameState(newState)
  }

  const handleTimeChange = (newTime: number) => {
    reset(newTime)
  }

  const toggleTimer = () => {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }

  const handleNextPeriod = () => {
    if (gameState.currentPeriod < gameState.config.periods) {
      const newState = {
        ...gameState,
        currentPeriod: gameState.currentPeriod + 1,
        team1: {
          ...gameState.team1,
          timeouts: 0,
          fouls: 0,
        },
        team2: {
          ...gameState.team2,
          timeouts: 0,
          fouls: 0,
        },
      }
      reset(gameState.config.periodDuration * 60)
      saveGameState(newState)
    }
  }

  const handleEndGame = () => {
    setGameEnded(true)
  }

  const handleNewGame = () => {
    // Reset to initial state
    setGameState(footballGameState) // or basketballGameState
    setGameEnded(false)
    reset(footballGameState.timeRemaining)
  }

  const handleBackToGame = () => {
    setGameEnded(false)
  }

  const handleSubModalClose = () => {
    if (forcedSubstitution) {
      return
    }
    setShowSubModal(null)
  }

  // Show end game screen if game is ended
  if (gameEnded) {
    return <GameEndScreen gameState={gameState} onNewGame={handleNewGame} onBackToGame={handleBackToGame} />
  }

  const team1CourtPlayers = gameState.team1.players.filter((p) => p.isOnCourt)
  const team1BenchPlayers = gameState.team1.players.filter((p) => !p.isOnCourt)
  const team2CourtPlayers = gameState.team2.players.filter((p) => p.isOnCourt)
  const team2BenchPlayers = gameState.team2.players.filter((p) => !p.isOnCourt)

  const team1FoulWarning = gameState.team1.fouls >= gameState.config.foulLimit
  const team2FoulWarning = gameState.team2.fouls >= gameState.config.foulLimit

  const team1ActiveOnCourt = team1CourtPlayers.filter((p) => !p.isDisqualified).length
  const team2ActiveOnCourt = team2CourtPlayers.filter((p) => !p.isDisqualified).length

  const sportLabels = {
    court: gameState.config.sportType === "football" ? "На поле" : "На площадке",
    bench: gameState.config.sportType === "football" ? "На скамейке" : "На скамейке",
    fouls: gameState.config.sportType === "football" ? "Карточки" : "Фолы",
    foulAction: gameState.config.sportType === "football" ? "Карточка" : "Фол",
    period: gameState.config.sportType === "football" ? "Тайм" : "Период",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">{gameState.team1.name}</h2>
            {team1FoulWarning && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
          </div>
          <div className="text-sm mb-2">
            {sportLabels.fouls}: {gameState.team1.fouls}
            {gameState.config.maxTimeoutsPerPeriod > 0 && (
              <>
                {" "}
                | Тайм-ауты: {gameState.team1.timeouts}/{gameState.team1.maxTimeoutsPerPeriod}
              </>
            )}
          </div>
          <div className="text-xs mb-2">
            {sportLabels.court}: {team1ActiveOnCourt}/{gameState.config.playersOnCourt}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-white text-blue-900 hover:bg-gray-100"
              onClick={() => {
                const newState = { ...gameState }
                newState.team1.fouls += 1
                saveGameState(newState)
              }}
            >
              {sportLabels.foulAction}
            </Button>
            {gameState.config.maxTimeoutsPerPeriod > 0 && (
              <Button
                variant="outline"
                className="bg-white text-blue-900 hover:bg-gray-100"
                onClick={() => handleTimeout("team1")}
                disabled={gameState.team1.timeouts >= gameState.team1.maxTimeoutsPerPeriod}
              >
                Тайм-аут
              </Button>
            )}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Счет</h2>
          <div className="bg-white text-blue-900 rounded-full px-8 py-4 text-4xl font-bold">
            {gameState.team1.score} : {gameState.team2.score}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">{gameState.team2.name}</h2>
            {team2FoulWarning && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
          </div>
          <div className="text-sm mb-2">
            {sportLabels.fouls}: {gameState.team2.fouls}
            {gameState.config.maxTimeoutsPerPeriod > 0 && (
              <>
                {" "}
                | Тайм-ауты: {gameState.team2.timeouts}/{gameState.team2.maxTimeoutsPerPeriod}
              </>
            )}
          </div>
          <div className="text-xs mb-2">
            {sportLabels.court}: {team2ActiveOnCourt}/{gameState.config.playersOnCourt}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-white text-blue-900 hover:bg-gray-100"
              onClick={() => {
                const newState = { ...gameState }
                newState.team2.fouls += 1
                saveGameState(newState)
              }}
            >
              {sportLabels.foulAction}
            </Button>
            {gameState.config.maxTimeoutsPerPeriod > 0 && (
              <Button
                variant="outline"
                className="bg-white text-blue-900 hover:bg-gray-100"
                onClick={() => handleTimeout("team2")}
                disabled={gameState.team2.timeouts >= gameState.team2.maxTimeoutsPerPeriod}
              >
                Тайм-аут
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Playing Field */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Team 1 */}
        <div>
          <h3 className="text-xl font-bold mb-4">{sportLabels.court}</h3>
          <div className="grid grid-cols-6 gap-4 mb-8">
            {team1CourtPlayers.map((player) => (
              <PlayerCircle
                key={player.id}
                number={player.number}
                isOnCourt={player.isOnCourt}
                isDisqualified={player.isDisqualified}
                fouls={player.fouls}
                onClick={() => handlePlayerClick(player)}
              />
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4">{sportLabels.bench}</h3>
          <div className="grid grid-cols-6 gap-4 mb-4">
            {team1BenchPlayers.map((player) => (
              <PlayerCircle
                key={player.id}
                number={player.number}
                isOnCourt={player.isOnCourt}
                isDisqualified={player.isDisqualified}
                fouls={player.fouls}
                onClick={() => handlePlayerClick(player)}
              />
            ))}
          </div>
          <Button
            variant="outline"
            className="bg-white text-blue-900 hover:bg-gray-100"
            onClick={() => setShowSubModal("team1")}
          >
            Замена
          </Button>
        </div>

        {/* Team 2 */}
        <div>
          <h3 className="text-xl font-bold mb-4">{sportLabels.court}</h3>
          <div className="grid grid-cols-6 gap-4 mb-8">
            {team2CourtPlayers.map((player) => (
              <PlayerCircle
                key={player.id}
                number={player.number}
                isOnCourt={player.isOnCourt}
                isDisqualified={player.isDisqualified}
                fouls={player.fouls}
                onClick={() => handlePlayerClick(player)}
              />
            ))}
          </div>

          <h3 className="text-xl font-bold mb-4">{sportLabels.bench}</h3>
          <div className="grid grid-cols-6 gap-4 mb-4">
            {team2BenchPlayers.map((player) => (
              <PlayerCircle
                key={player.id}
                number={player.number}
                isOnCourt={player.isOnCourt}
                isDisqualified={player.isDisqualified}
                fouls={player.fouls}
                onClick={() => handlePlayerClick(player)}
              />
            ))}
          </div>
          <Button
            variant="outline"
            className="bg-white text-blue-900 hover:bg-gray-100"
            onClick={() => setShowSubModal("team2")}
          >
            Замена
          </Button>
        </div>
      </div>

      {/* Timer and Period */}
      <div className="text-center">
        <div className="mb-4 flex justify-center gap-4">
          <span className="bg-white text-blue-900 rounded-full px-6 py-2 font-bold">
            {sportLabels.period} {gameState.currentPeriod}
          </span>
          {gameState.currentPeriod < gameState.config.periods && (
            <Button variant="outline" className="bg-white text-blue-900 hover:bg-gray-100" onClick={handleNextPeriod}>
              Следующий {sportLabels.period.toLowerCase()}
            </Button>
          )}
          <Button variant="outline" className="bg-red-600 text-white hover:bg-red-700" onClick={handleEndGame}>
            Завершить игру
          </Button>
        </div>
        <TimerDisplay
          timeRemaining={timeRemaining}
          isRunning={isRunning}
          onToggle={toggleTimer}
          onTimeClick={() => setShowTimeModal(true)}
        />
      </div>

      {/* Modals */}
      <StatisticsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        onActionSelect={handleActionSelect}
        actions={gameActions}
      />

      <SubstitutionModal
        isOpen={showSubModal === "team1"}
        onClose={handleSubModalClose}
        benchPlayers={team1BenchPlayers}
        courtPlayers={team1CourtPlayers}
        onSubstitute={handleSubstitution}
        isForced={forcedSubstitution?.team === "team1"}
        forcedPlayer={forcedSubstitution?.team === "team1" ? forcedSubstitution.player : undefined}
      />

      <SubstitutionModal
        isOpen={showSubModal === "team2"}
        onClose={handleSubModalClose}
        benchPlayers={team2BenchPlayers}
        courtPlayers={team2CourtPlayers}
        onSubstitute={handleSubstitution}
        isForced={forcedSubstitution?.team === "team2"}
        forcedPlayer={forcedSubstitution?.team === "team2" ? forcedSubstitution.player : undefined}
      />

      <TimeoutModal
        isOpen={gameState.timeout.isActive}
        team={gameState.timeout.team}
        duration={gameState.timeout.duration}
        onComplete={handleTimeoutComplete}
      />

      <TimeAdjustmentModal
        isOpen={showTimeModal}
        currentTime={timeRemaining}
        onClose={() => setShowTimeModal(false)}
        onTimeChange={handleTimeChange}
      />
    </div>
  )
}
