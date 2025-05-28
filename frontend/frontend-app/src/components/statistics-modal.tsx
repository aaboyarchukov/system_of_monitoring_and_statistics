"use client"

import type { GameAction } from "../types/game"

interface StatisticsModalProps {
  isOpen: boolean
  onClose: () => void
  onActionSelect: (action: GameAction) => void
  actions: GameAction[]
}

export function StatisticsModal({ isOpen, onClose, onActionSelect, actions }: StatisticsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-blue-600 to-blue-800 p-8 rounded-lg w-full max-w-2xl mx-4">
        <h2 className="text-white text-3xl font-bold mb-8 text-center">Статистика</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                onActionSelect(action)
                onClose()
              }}
              className="bg-white text-blue-900 font-bold py-4 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              {action.name}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-white text-blue-900 font-bold py-2 px-8 rounded-full hover:bg-gray-100 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
