"use client"

import { useState } from "react"
import { Plus, ArrowLeft } from "lucide-react"

interface TournamentDetailsScreenProps {
  tournamentName: string
  sportType: string
  onBackClick: () => void
  onCreateGroup: () => void
  onAddTeamToGroup: (groupId: string) => void
  onCreateMatch: (roundId: string) => void
  onEditMatch: (match: any) => void
  onCreateRound: () => void
}

interface Group {
  id: string
  name: string
  teams: string[]
}

export default function TournamentDetailsScreen({
  tournamentName,
  sportType,
  onBackClick,
  onCreateGroup,
  onAddTeamToGroup,
  onCreateMatch,
  onEditMatch,
  onCreateRound,
}: TournamentDetailsScreenProps) {
  const [activeTab, setActiveTab] = useState<string>("groups")
  const [selectedGroupId, setSelectedGroupId] = useState<string>("group-a")
  const [expandedRounds, setExpandedRounds] = useState<string[]>(["round-1"])

  // Mock data for rounds and matches
  const rounds = [
    {
      id: "round-1",
      name: "Тур 1",
      matches: [
        {
          id: "match-1",
          homeTeam: "Команда1",
          awayTeam: "Команда2",
          homeScore: 0,
          awayScore: 0,
          date: null,
          status: "scheduled",
        },
        {
          id: "match-2",
          homeTeam: "Команда3",
          awayTeam: "Команда4",
          homeScore: 0,
          awayScore: 0,
          date: null,
          status: "scheduled",
        },
      ],
    },
    {
      id: "round-2",
      name: "Тур 2",
      matches: [
        {
          id: "match-3",
          homeTeam: "Команда1",
          awayTeam: "Команда3",
          homeScore: 0,
          awayScore: 0,
          date: null,
          status: "scheduled",
        },
      ],
    },
  ]

  const toggleRound = (roundId: string) => {
    setExpandedRounds((prev) => (prev.includes(roundId) ? prev.filter((id) => id !== roundId) : [...prev, roundId]))
  }

  const handleCreateMatch = (roundId: string) => {
    onCreateMatch(roundId)
  }

  const handleEditMatch = (match: any) => {
    onEditMatch(match)
  }

  const onMatchClick = (match: any) => {
    console.log(`Opening match: ${match.id}`)
  }

  // Mock data for groups
  const groups: Group[] = [
    {
      id: "group-a",
      name: "Группа A",
      teams: ["Команда1", "Команда2", "Команда3"],
    },
    {
      id: "group-b",
      name: "Группа B",
      teams: ["Команда4", "Команда5"],
    },
    {
      id: "group-c",
      name: "Группа C",
      teams: ["Команда6"],
    },
  ]

  const selectedGroup = groups.find((group) => group.id === selectedGroupId)

  return (
    <div className="p-6">
      <button
        onClick={onBackClick}
        className="text-white hover:text-gray-200 mb-4 flex items-center"
        aria-label="Назад"
      >
        <ArrowLeft size={24} className="mr-2" />
      </button>

      <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-primary">{tournamentName}</h1>
        <p className="text-xl text-primary">{sportType}</p>
      </div>

      <div className="flex mb-4">
        <div className="flex items-center">
          <button
            className={`text-2xl text-white mr-4 pb-2 ${activeTab === "groups" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("groups")}
          >
            Группы
          </button>
          <button onClick={onCreateGroup} className="text-white hover:text-gray-200 mr-8" aria-label="Создать группу">
            <Plus size={28} />
          </button>
        </div>

        <div className="flex items-center">
          <button
            className={`text-2xl text-white mr-4 pb-2 ${activeTab === "rounds" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("rounds")}
          >
            Туры
          </button>
          <button onClick={onCreateRound} className="text-white hover:text-gray-200 mr-8" aria-label="Создать тур">
            <Plus size={28} />
          </button>
        </div>

        <div className="flex items-center">
          <button
            className={`text-2xl text-white mr-4 pb-2 ${activeTab === "playoffs" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("playoffs")}
          >
            Плей-офф
          </button>
          <button className="text-white hover:text-gray-200" aria-label="Создать плей-офф">
            <Plus size={28} />
          </button>
        </div>
      </div>

      <div className="bg-374B9B rounded-lg p-6 max-w-4xl mx-auto">
        {activeTab === "groups" && (
          <div className="space-y-6">
            <div className="w-64">
              <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-4 py-3 appearance-none bg-white"
              >
                <option value="">Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedGroup && (
              <div className="bg-primary rounded-lg p-6 relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">{selectedGroup.name}</h3>
                  <button
                    onClick={() => onAddTeamToGroup(selectedGroup.id)}
                    className="text-white hover:text-gray-200"
                    aria-label="Добавить команду в группу"
                  >
                    <Plus size={28} />
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedGroup.teams.map((team, index) => (
                    <div
                      key={index}
                      className="bg-white bg-opacity-20 border-2 border-white rounded-full py-3 px-6 text-center"
                    >
                      <span className="text-xl font-semibold text-white">{team}</span>
                    </div>
                  ))}
                  {selectedGroup.teams.length === 0 && (
                    <div className="text-center text-white opacity-70 py-8">Нет команд в группе</div>
                  )}
                </div>
              </div>
            )}

            {!selectedGroup && selectedGroupId === "" && (
              <div className="text-center text-gray-500 py-8">Выберите группу для просмотра</div>
            )}
          </div>
        )}

        {activeTab === "rounds" && (
          <div className="space-y-4">
            {rounds.map((round) => (
              <div key={round.id} className="bg-primary rounded-lg overflow-hidden">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleRound(round.id)}
                >
                  <h3 className="text-2xl font-bold text-white">{round.name}</h3>
                  <div className="flex items-center gap-4">
                    {expandedRounds.includes(round.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCreateMatch(round.id)
                        }}
                        className="primary-button"
                      >
                        Создать игру
                      </button>
                    )}
                    <button className="text-white">
                      {expandedRounds.includes(round.id) ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 14l5-5 5 5z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 10l5 5 5-5z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {expandedRounds.includes(round.id) && (
                  <div className="p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {round.matches.map((match) => (
                        <div
                          key={match.id}
                          className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => onMatchClick(match)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditMatch(match)
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <span className="text-sm text-gray-600 font-medium">{round.name}</span>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center justify-center gap-4 mb-2">
                              <span className="text-4xl font-bold text-primary">{match.homeScore}</span>
                              <span className="text-2xl font-bold text-gray-400">:</span>
                              <span className="text-4xl font-bold text-primary">{match.awayScore}</span>
                            </div>

                            <div className="flex justify-between items-center text-sm font-medium text-primary mb-3">
                              <span>{match.homeTeam}</span>
                              <span>{match.awayTeam}</span>
                            </div>

                            <div className="text-sm text-gray-600">{match.date || "Дата"}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "playoffs" && (
          <div className="text-center text-gray-500 py-8">Функционал плей-офф будет добавлен позже</div>
        )}
      </div>
    </div>
  )
}
