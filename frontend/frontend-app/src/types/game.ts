export interface Player {
  id: number
  name: string
  number: number
  isOnCourt: boolean
  fouls: number
  isDisqualified: boolean
}

export interface Team {
  id: string
  name: string
  players: Player[]
  score: number
  fouls: number
  timeouts: number
  maxTimeoutsPerPeriod: number
}

export interface TimeoutState {
  isActive: boolean
  team: string
  timeRemaining: number
  duration: number
}

export interface GameConfig {
  playersOnCourt: number
  totalPlayers: number
  periods: number
  periodDuration: number // in minutes
  timeoutDuration: number // in seconds
  maxTimeoutsPerPeriod: number
  foulLimit: number
  playerFoulLimit: number
  sportType: "basketball" | "football" | "volleyball"
}

export interface GameAction {
  id: string
  name: string
  points?: number
}

export interface GameState {
  team1: Team
  team2: Team
  currentPeriod: number
  timeRemaining: number // in seconds
  isRunning: boolean
  config: GameConfig
  timeout: TimeoutState
}
