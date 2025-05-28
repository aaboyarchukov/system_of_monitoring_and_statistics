"use client"

import { useState } from "react"
import LeagueCreationScreen from "@/components/league-creation-screen"
import LeagueDetailsScreen from "@/components/league-details-screen"
import TeamDetailsScreen from "@/components/team-details-screen"
import TournamentDetailsScreen from "@/components/tournament-details-screen"
import CreateLeagueModal from "@/components/create-league-modal"
import CreateTournamentDataModal from "@/components/create-tournament-data-modal"
import CreateTournamentSettingsModal from "@/components/create-tournament-settings-modal"
import CreateTeamModal from "@/components/create-team-modal"
import AddTeamModal from "@/components/add-team-modal"
import PlayerProfileModal from "@/components/player-profile-modal"
import AddPlayerModal from "@/components/add-player-modal"
import AssignPlayerNumberModal from "@/components/assign-player-number-modal"
import CreatePlayerModal from "@/components/create-player-modal"
import CreateGroupModal from "@/components/create-group-modal"
import CreateRoundModal from "@/components/create-round-modal"
import CreateMatchTeamSelectionModal from "@/components/create-match-team-selection-modal"
import CreateMatchScheduleModal from "@/components/create-match-schedule-modal"
import EditMatchModal from "@/components/edit-match-modal"

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

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<string>("leagueCreation")
  const [showCreateLeagueModal, setShowCreateLeagueModal] = useState<boolean>(false)
  const [showCreateTournamentDataModal, setShowCreateTournamentDataModal] = useState<boolean>(false)
  const [showCreateTournamentSettingsModal, setShowCreateTournamentSettingsModal] = useState<boolean>(false)
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [sportType, setSportType] = useState<string>("Баскетбол")
  const [showCreateTeamModal, setShowCreateTeamModal] = useState<boolean>(false)
  const [showAddTeamModal, setShowAddTeamModal] = useState<boolean>(false)
  const [showPlayerProfileModal, setShowPlayerProfileModal] = useState<boolean>(false)
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false)
  const [showAssignPlayerNumberModal, setShowAssignPlayerNumberModal] = useState<boolean>(false)
  const [showCreatePlayerModal, setShowCreatePlayerModal] = useState<boolean>(false)
  const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false)
  const [showCreateRoundModal, setShowCreateRoundModal] = useState<boolean>(false)
  const [showCreateMatchTeamSelectionModal, setShowCreateMatchTeamSelectionModal] = useState<boolean>(false)
  const [showCreateMatchScheduleModal, setShowCreateMatchScheduleModal] = useState<boolean>(false)
  const [showEditMatchModal, setShowEditMatchModal] = useState<boolean>(false)
  const [playerToAssign, setPlayerToAssign] = useState<Player | null>(null)
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null)
  const [selectedMatchTeams, setSelectedMatchTeams] = useState<{ home: string; away: string } | null>(null)
  const [matchToEdit, setMatchToEdit] = useState<any>(null)

  // Tournament creation state
  const [tournamentData, setTournamentData] = useState({
    name: "",
    place: "",
    date: "",
  })
  const [tournamentStep, setTournamentStep] = useState<"data" | "settings">("data")

  // Available teams for match creation
  const availableTeams = ["Команда1", "Команда2", "Команда3", "Команда4", "Команда5", "Команда6", "Команда7"]

  const handleLeagueClick = (leagueName: string) => {
    setSelectedLeague(leagueName)
    setCurrentScreen("leagueDetails")
  }

  const handleTeamClick = (teamName: string) => {
    setSelectedTeam(teamName)
    setCurrentScreen("teamDetails")
  }

  const handleTournamentClick = (tournamentName: string) => {
    setSelectedTournament(tournamentName)
    setCurrentScreen("tournamentDetails")
  }

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player)
    setShowPlayerProfileModal(true)
  }

  const handleCreateLeague = () => {
    setShowCreateLeagueModal(true)
  }

  const handleCreateTournament = () => {
    setTournamentStep("data")
    setShowCreateTournamentDataModal(true)
  }

  const handleTournamentDataNext = (data: { name: string; place: string; date: string }) => {
    setTournamentData(data)
    setTournamentStep("settings")
    setShowCreateTournamentDataModal(false)
    setShowCreateTournamentSettingsModal(true)
  }

  const handleTournamentDataBack = () => {
    setTournamentStep("data")
    setShowCreateTournamentSettingsModal(false)
    setShowCreateTournamentDataModal(true)
  }

  const handleTournamentSettingsCreate = () => {
    setShowCreateTournamentSettingsModal(false)
    setTournamentData({ name: "", place: "", date: "" })
  }

  const handleCloseTournamentModals = () => {
    setShowCreateTournamentDataModal(false)
    setShowCreateTournamentSettingsModal(false)
    setTournamentData({ name: "", place: "", date: "" })
  }

  const handleCloseLeagueModal = () => {
    setShowCreateLeagueModal(false)
  }

  const handleCreateTeam = () => {
    setShowAddTeamModal(true)
  }

  const handleCreateNewTeam = () => {
    setShowAddTeamModal(false)
    setShowCreateTeamModal(true)
  }

  const handleAddExistingTeam = (teamName: string) => {
    console.log(`Adding existing team: ${teamName}`)
    setShowAddTeamModal(false)
  }

  const handleTeamCreated = () => {
    setShowCreateTeamModal(false)
  }

  const handleAddPlayer = () => {
    setShowAddPlayerModal(true)
  }

  const handleCreateNewPlayer = () => {
    setShowAddPlayerModal(false)
    setShowCreatePlayerModal(true)
  }

  const handleAssignPlayerNumber = (player: Player) => {
    setPlayerToAssign(player)
    setShowAddPlayerModal(false)
    setShowAssignPlayerNumberModal(true)
  }

  const handlePlayerNumberAssigned = (player: Player, number: string) => {
    console.log(`Assigning number ${number} to player ${player.name}`)
    setShowAssignPlayerNumberModal(false)
    setPlayerToAssign(null)
  }

  const handlePlayerCreated = (playerData: any) => {
    console.log("Creating new player:", playerData)
    setShowCreatePlayerModal(false)
    setShowAddPlayerModal(true)
  }

  const handleEditPlayer = () => {
    console.log("Edit player clicked")
    setShowPlayerProfileModal(false)
  }

  const handleCloseAllPlayerModals = () => {
    setShowAddPlayerModal(false)
    setShowAssignPlayerNumberModal(false)
    setShowCreatePlayerModal(false)
    setPlayerToAssign(null)
  }

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true)
  }

  const handleGroupCreated = (groupName: string) => {
    console.log(`Creating group: ${groupName}`)
    setShowCreateGroupModal(false)
  }

  const handleAddTeamToGroup = (groupId: string) => {
    console.log(`Adding team to group: ${groupId}`)
    setShowAddTeamModal(true)
  }

  const handleCreateRound = () => {
    setShowCreateRoundModal(true)
  }

  const handleRoundCreated = (roundName: string) => {
    console.log(`Creating round: ${roundName}`)
    setShowCreateRoundModal(false)
  }

  const handleCreateMatch = (roundId: string) => {
    setSelectedRoundId(roundId)
    setShowCreateMatchTeamSelectionModal(true)
  }

  const handleMatchTeamsSelected = (homeTeam: string, awayTeam: string) => {
    setSelectedMatchTeams({ home: homeTeam, away: awayTeam })
    setShowCreateMatchTeamSelectionModal(false)
    setShowCreateMatchScheduleModal(true)
  }

  const handleMatchScheduleBack = () => {
    setShowCreateMatchScheduleModal(false)
    setShowCreateMatchTeamSelectionModal(true)
  }

  const handleMatchCreated = (homeTeam: string, awayTeam: string, dateTime: string) => {
    console.log(`Creating match: ${homeTeam} vs ${awayTeam} at ${dateTime} in round ${selectedRoundId}`)
    setShowCreateMatchScheduleModal(false)
    setSelectedRoundId(null)
    setSelectedMatchTeams(null)
  }

  const handleEditMatch = (match: any) => {
    setMatchToEdit(match)
    setShowEditMatchModal(true)
  }

  const handleMatchEdited = (matchId: string, dateTime: string) => {
    console.log(`Editing match ${matchId} with new date: ${dateTime}`)
    setShowEditMatchModal(false)
    setMatchToEdit(null)
  }

  const handleCloseAllMatchModals = () => {
    setShowCreateMatchTeamSelectionModal(false)
    setShowCreateMatchScheduleModal(false)
    setShowEditMatchModal(false)
    setSelectedRoundId(null)
    setSelectedMatchTeams(null)
    setMatchToEdit(null)
  }

  const getBackClickHandler = () => {
    switch (currentScreen) {
      case "leagueDetails":
        return () => setCurrentScreen("leagueCreation")
      case "teamDetails":
        return () => setCurrentScreen("leagueDetails")
      case "tournamentDetails":
        return () => setCurrentScreen("leagueDetails")
      default:
        return () => setCurrentScreen("leagueCreation")
    }
  }

  return (
    <main className="min-h-screen">
      {currentScreen === "leagueCreation" && (
        <LeagueCreationScreen
          onLeagueClick={handleLeagueClick}
          onCreateLeague={handleCreateLeague}
          sportType={sportType}
        />
      )}

      {currentScreen === "leagueDetails" && selectedLeague && (
        <LeagueDetailsScreen
          leagueName={selectedLeague}
          sportType={sportType}
          onCreateTournament={handleCreateTournament}
          onCreateTeam={handleCreateTeam}
          onTeamClick={handleTeamClick}
          onTournamentClick={handleTournamentClick}
          onBackClick={getBackClickHandler()}
        />
      )}

      {currentScreen === "teamDetails" && selectedTeam && selectedLeague && (
        <TeamDetailsScreen
          teamName={selectedTeam}
          leagueName={selectedLeague}
          sportType={sportType}
          onPlayerClick={handlePlayerClick}
          onAddPlayer={handleAddPlayer}
          onBackClick={getBackClickHandler()}
        />
      )}

      {currentScreen === "tournamentDetails" && selectedTournament && (
        <TournamentDetailsScreen
          tournamentName={selectedTournament}
          sportType={sportType}
          onBackClick={getBackClickHandler()}
          onCreateGroup={handleCreateGroup}
          onAddTeamToGroup={handleAddTeamToGroup}
          onCreateMatch={handleCreateMatch}
          onEditMatch={handleEditMatch}
          onCreateRound={handleCreateRound}
        />
      )}

      {showCreateLeagueModal && <CreateLeagueModal onClose={handleCloseLeagueModal} />}

      {showCreateTournamentDataModal && (
        <CreateTournamentDataModal
          initialData={tournamentData}
          currentStep={tournamentStep}
          onNext={handleTournamentDataNext}
          onClose={handleCloseTournamentModals}
        />
      )}

      {showCreateTournamentSettingsModal && (
        <CreateTournamentSettingsModal
          sportType={sportType}
          currentStep={tournamentStep}
          onBack={handleTournamentDataBack}
          onCreate={handleTournamentSettingsCreate}
          onClose={handleCloseTournamentModals}
        />
      )}

      {showAddTeamModal && (
        <AddTeamModal
          onClose={() => setShowAddTeamModal(false)}
          onCreateNewTeam={handleCreateNewTeam}
          onAddExistingTeam={handleAddExistingTeam}
        />
      )}

      {showCreateTeamModal && (
        <CreateTeamModal onClose={() => setShowCreateTeamModal(false)} onCreate={handleTeamCreated} />
      )}

      {showPlayerProfileModal && selectedPlayer && (
        <PlayerProfileModal
          player={selectedPlayer}
          onClose={() => setShowPlayerProfileModal(false)}
          onEdit={handleEditPlayer}
        />
      )}

      {showAddPlayerModal && (
        <AddPlayerModal
          onClose={handleCloseAllPlayerModals}
          onCreateNewPlayer={handleCreateNewPlayer}
          onAssignPlayerNumber={() => handleAssignPlayerNumber}
        />
      )}

      {showAssignPlayerNumberModal && playerToAssign && (
        <AssignPlayerNumberModal
          player={playerToAssign}
          onClose={handleCloseAllPlayerModals}
          onAssignNumber={() => handlePlayerNumberAssigned}
        />
      )}

      {showCreatePlayerModal && (
        <CreatePlayerModal onClose={handleCloseAllPlayerModals} onCreatePlayer={handlePlayerCreated} />
      )}

      {showCreateGroupModal && (
        <CreateGroupModal onClose={() => setShowCreateGroupModal(false)} onCreateGroup={handleGroupCreated} />
      )}

      {showCreateRoundModal && (
        <CreateRoundModal onClose={() => setShowCreateRoundModal(false)} onCreateRound={handleRoundCreated} />
      )}

      {showCreateMatchTeamSelectionModal && (
        <CreateMatchTeamSelectionModal
          onClose={handleCloseAllMatchModals}
          onNext={handleMatchTeamsSelected}
          availableTeams={availableTeams}
        />
      )}

      {showCreateMatchScheduleModal && selectedMatchTeams && (
        <CreateMatchScheduleModal
          homeTeam={selectedMatchTeams.home}
          awayTeam={selectedMatchTeams.away}
          onClose={handleCloseAllMatchModals}
          onSave={handleMatchCreated}
          onBack={handleMatchScheduleBack}
        />
      )}

      {showEditMatchModal && matchToEdit && (
        <EditMatchModal match={matchToEdit} onClose={handleCloseAllMatchModals} onSave={handleMatchEdited} />
      )}
    </main>
  )
}
