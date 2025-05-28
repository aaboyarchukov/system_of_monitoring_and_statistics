"use client"

interface Player {
  id: string
  number: string
  name: string
  firstName?: string
  lastName?: string
  height?: string
  weight?: string
  age?: string
}

interface PlayerProfileModalProps {
  player: Player
  onClose: () => void
  onEdit: () => void
}

export default function PlayerProfileModal({ player, onClose, onEdit }: PlayerProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-3xl relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-8">Карточка игрока</h2>

        <div className="bg-white rounded-lg p-8">
          <div className="flex gap-8">
            {/* Photo section */}
            <div className="flex-shrink-0">
              <div className="w-64 h-80 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <span className="text-2xl font-semibold text-gray-400">Фото</span>
              </div>
            </div>

            {/* Player information */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xl font-semibold text-gray-800 mb-2">Имя:</label>
                  <div className="text-lg text-gray-600">{player.firstName || "Не указано"}</div>
                </div>

                <div>
                  <label className="block text-xl font-semibold text-gray-800 mb-2">Фамилия:</label>
                  <div className="text-lg text-gray-600">{player.lastName || "Не указано"}</div>
                </div>

                <div>
                  <label className="block text-xl font-semibold text-gray-800 mb-2">Рост:</label>
                  <div className="text-lg text-gray-600">{player.height ? `${player.height} см` : "Не указано"}</div>
                </div>

                <div>
                  <label className="block text-xl font-semibold text-gray-800 mb-2">Вес:</label>
                  <div className="text-lg text-gray-600">{player.weight ? `${player.weight} кг` : "Не указано"}</div>
                </div>

                <div>
                  <label className="block text-xl font-semibold text-gray-800 mb-2">Возраст:</label>
                  <div className="text-lg text-gray-600">{player.age ? `${player.age} лет` : "Не указано"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-start">
            <button onClick={onEdit} className="primary-button">
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
