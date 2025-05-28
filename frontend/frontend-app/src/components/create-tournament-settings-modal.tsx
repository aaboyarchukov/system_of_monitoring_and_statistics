"use client"

import type React from "react"

import { useState } from "react"

interface CreateTournamentSettingsModalProps {
  sportType: string
  currentStep: "data" | "settings"
  onBack: () => void
  onCreate: () => void
  onClose: () => void
}

export default function CreateTournamentSettingsModal({
  sportType,
  currentStep,
  onBack,
  onCreate,
  onClose,
}: CreateTournamentSettingsModalProps) {
  // Basketball specific settings
  const [playersInTeam, setPlayersInTeam] = useState<string>("")
  const [playersOnCourt, setPlayersOnCourt] = useState<string>("")
  const [rounds, setRounds] = useState<string>("")
  const [periods, setPeriods] = useState<string>("")
  const [periodDuration, setPeriodDuration] = useState<string>("")
  const [timeouts, setTimeouts] = useState<string>("")
  const [timeoutDuration, setTimeoutDuration] = useState<string>("")
  const [overtimeDuration, setOvertimeDuration] = useState<string>("")
  const [overtimeTimeouts, setOvertimeTimeouts] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate()
  }

  const SelectInput = ({
    label,
    value,
    onChange,
  }: {
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  }) => (
    <div className="mb-6">
      <label className="block text-primary font-medium mb-2">{label}</label>
      <div className="relative">
        <select value={value} onChange={onChange} className="select-input">
          <option value="">Count*</option>
          {[...Array(20)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-background p-6 rounded-lg w-full max-w-5xl relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          aria-label="Закрыть"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="flex justify-center mb-4">
          <div className="flex w-full max-w-md bg-white rounded-full overflow-hidden">
            <button
              onClick={onBack}
              className={`flex-1 py-3 px-4 text-xl font-bold ${currentStep === "data" ? "text-primary tab-active" : "text-gray-400"}`}
            >
              Данные
            </button>
            <button
              className={`flex-1 py-3 px-4 text-xl font-bold ${currentStep === "settings" ? "text-primary tab-active" : "text-gray-400"}`}
            >
              Настройки
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-4 gap-x-6">
              <SelectInput
                label="Количество игроков в команде"
                value={playersInTeam}
                onChange={(e) => setPlayersInTeam(e.target.value)}
              />

              <SelectInput
                label="Количество игроков на площадке от одной команды"
                value={playersOnCourt}
                onChange={(e) => setPlayersOnCourt(e.target.value)}
              />

              <SelectInput
                label="Количество туров в рамках турнира"
                value={rounds}
                onChange={(e) => setRounds(e.target.value)}
              />

              <SelectInput
                label="Количество игровых периодов"
                value={periods}
                onChange={(e) => setPeriods(e.target.value)}
              />

              <SelectInput
                label="Длительность игрового периода"
                value={periodDuration}
                onChange={(e) => setPeriodDuration(e.target.value)}
              />

              <SelectInput
                label="Количество тайм-аутов"
                value={timeouts}
                onChange={(e) => setTimeouts(e.target.value)}
              />

              <SelectInput
                label="Длительность тайм-аута"
                value={timeoutDuration}
                onChange={(e) => setTimeoutDuration(e.target.value)}
              />

              <SelectInput
                label="Длительность овертайма"
                value={overtimeDuration}
                onChange={(e) => setOvertimeDuration(e.target.value)}
              />

              <SelectInput
                label="Количество тайм-аутов в овертайме"
                value={overtimeTimeouts}
                onChange={(e) => setOvertimeTimeouts(e.target.value)}
              />
            </div>

            <div className="mt-8">
              <button type="submit" className="primary-button">
                Создать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
