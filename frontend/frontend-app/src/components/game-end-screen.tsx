"use client"

import { Button } from "@/components/ui/button"
import type { GameState } from "../types/game"

interface GameEndScreenProps {
  gameState: GameState
  onNewGame: () => void
  onBackToGame: () => void
}

export function GameEndScreen({ gameState, onNewGame, onBackToGame }: GameEndScreenProps) {
  const winner =
    gameState.team1.score > gameState.team2.score
      ? gameState.team1.name
      : gameState.team2.score > gameState.team1.score
        ? gameState.team2.name
        : "Ничья"

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 flex items-center justify-center">
      <div className="bg-white text-blue-900 rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">Игра завершена!</h1>

        <div className="text-center mb-8">
          <div className="text-6xl font-bold mb-4">
            {gameState.team1.score} : {gameState.team2.score}
          </div>
          <div className="text-2xl mb-4">
            {gameState.team1.name} vs {gameState.team2.name}
          </div>
          <div className="text-xl font-semibold">{winner === "Ничья" ? "Ничья!" : `Победитель: ${winner}`}</div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">{gameState.team1.name}</h3>
            <div className="space-y-2">
              <div>Очки: {gameState.team1.score}</div>
              <div>Фолы: {gameState.team1.fouls}</div>
              <div>Тайм-ауты использовано: {gameState.team1.timeouts}</div>
              <div>Дисквалифицированные: {gameState.team1.players.filter((p) => p.isDisqualified).length}</div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">{gameState.team2.name}</h3>
            <div className="space-y-2">
              <div>Очки: {gameState.team2.score}</div>
              <div>Фолы: {gameState.team2.fouls}</div>
              <div>Тайм-ауты использовано: {gameState.team2.timeouts}</div>
              <div>Дисквалифицированные: {gameState.team2.players.filter((p) => p.isDisqualified).length}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={onBackToGame} className="bg-[#0F2D69] hover:bg-[#0A1F4A]">
            Вернуться к игре
          </Button>
          <Button onClick={onNewGame} className="bg-green-600 hover:bg-green-700">
            Новая игра
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Подробная статистика и отчеты будут доступны в следующих версиях</p>
        </div>
      </div>
    </div>
  )
}
