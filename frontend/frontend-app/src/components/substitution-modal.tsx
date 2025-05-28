"use client"

import { useState, useEffect } from "react"
import type { Player } from "../types/game"
import { PlayerCircle } from "./player-circle"

interface SubstitutionModalProps {
  isOpen: boolean
  onClose: () => void
  benchPlayers: Player[]
  courtPlayers: Player[]
  onSubstitute: (playerOut: Player, playerIn: Player) => void
  isForced?: boolean
  forcedPlayer?: Player
}

export function SubstitutionModal({
  isOpen,
  onClose,
  benchPlayers,
  courtPlayers,
  onSubstitute,
  isForced = false,
  forcedPlayer = null,
}: SubstitutionModalProps) {
  const [selectedOut, setSelectedOut] = useState<Player | null>(null)
  const [selectedIn, setSelectedIn] = useState<Player | null>(null)

  // Set the forced player when modal opens for forced substitution
  useEffect(() => {
    if (isForced && forcedPlayer) {
      setSelectedOut(forcedPlayer)
    } else if (!isForced) {
      setSelectedOut(null)
    }
  }, [isForced, forcedPlayer, isOpen])

  // Reset selections when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedOut(null)
      setSelectedIn(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  const availableBenchPlayers = benchPlayers.filter((p) => !p.isDisqualified)

  const handleSubstitute = () => {
    if (selectedOut && selectedIn) {
      onSubstitute(selectedOut, selectedIn)
      setSelectedOut(null)
      setSelectedIn(null)
      onClose()
    }
  }

  const handleClose = () => {
    if (isForced) {
      alert("Необходимо выполнить замену дисквалифицированного игрока!")
      return
    }
    setSelectedOut(null)
    setSelectedIn(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4 text-center text-[#0F2D69]">
          {isForced ? "Обязательная замена" : "Замена игроков"}
        </h3>
        {isForced && (
          <p className="text-red-600 text-center mb-4 font-semibold">Игрок дисквалифицирован и должен быть заменен!</p>
        )}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 text-[#0F2D69]">Убрать с площадки:</h4>
            <div className="grid grid-cols-3 gap-2">
              {courtPlayers.map((player) => (
                <PlayerCircle
                  key={player.id}
                  number={player.number}
                  isOnCourt={player.isOnCourt}
                  isHighlighted={selectedOut?.id === player.id}
                  isDisqualified={player.isDisqualified}
                  fouls={player.fouls}
                  onClick={() => !isForced && setSelectedOut(player)}
                />
              ))}
            </div>
            {isForced && selectedOut && (
              <p className="text-sm text-gray-600 mt-2">
                Выбран для замены: Игрок №{selectedOut.number} (дисквалифицирован)
              </p>
            )}
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-[#0F2D69]">Поставить на площадку:</h4>
            <div className="grid grid-cols-3 gap-2">
              {benchPlayers.map((player) => (
                <PlayerCircle
                  key={player.id}
                  number={player.number}
                  isOnCourt={player.isOnCourt}
                  isHighlighted={selectedIn?.id === player.id}
                  isDisqualified={player.isDisqualified}
                  fouls={player.fouls}
                  onClick={() => !player.isDisqualified && setSelectedIn(player)}
                />
              ))}
            </div>
            {availableBenchPlayers.length === 0 && (
              <p className="text-red-600 text-sm mt-2">Нет доступных игроков для замены!</p>
            )}
            {selectedIn && <p className="text-sm text-green-600 mt-2">Выбран для входа: Игрок №{selectedIn.number}</p>}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleClose}
            className={`px-6 py-2 rounded text-white ${
              isForced ? "bg-gray-400 cursor-not-allowed" : "bg-[#0F2D69] hover:bg-[#0A1F4A]"
            }`}
            disabled={isForced}
          >
            {isForced ? "Замена обязательна" : "Отмена"}
          </button>
          <button
            onClick={handleSubstitute}
            disabled={!selectedOut || !selectedIn || availableBenchPlayers.length === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Заменить
          </button>
        </div>
      </div>
    </div>
  )
}
