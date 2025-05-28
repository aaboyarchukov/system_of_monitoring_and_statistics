package organizator_logic

import (
	"context"
	"log/slog"
	"system_of_monitoring_statistics/models"
)

type SportDataProvider interface {
	GetLeaguesOfSportType()
	GetSportTypes()
	GetToursOfLeague()
	GetTeamsOfLeague()
	GetPlayersOfTeam()
	GetAllPlayers()
	GetRoundsOfTour()
	GetMatchesOfRound()
	GetGroupsOfTour()
}
type SportDataSaver interface {
	SaveNewLeague()
	SaveNewTour()
	SaveTourIntoLeague()
	SaveTeamIntoLeague()
	SaveTeamIntoGroup()
	SavePlayerIntoTeam()
	SaveNewTeam()
	SaveNewGroupOfTour()
	SaveNewPlayer()
}

type Organizator struct {
	log               *slog.Logger
	sportDataProvider SportDataProvider
	sportDataSaver    SportDataSaver
}

func New(
	log *slog.Logger,
	sportDataProvider SportDataProvider,
	sportDataSaver SportDataSaver,
) *Organizator {
	return &Organizator{
		log:               log,
		sportDataProvider: sportDataProvider,
		sportDataSaver:    sportDataSaver,
	}
}

// TODO: implement Organizator interface for grpc server
func (admin *Organizator) GetSportTypes(
	ctx context.Context,
) ([]models.SportType, error) {
	return []models.SportType{}, nil
}

func (admin *Organizator) GetLeagues(
	ctx context.Context,
	sportTypeID int64,
) ([]models.League, error) {
	return []models.League{}, nil
}
func (admin *Organizator) PostNewLeague(
	ctx context.Context,
	sportTypeID int64,
	leagueName string,
) (models.League, error) {
	return models.League{}, nil
}
func (admin *Organizator) GetLeaguesTours(
	ctx context.Context,
	leagueID int64,
) ([]models.Tour[any], error) {
	return []models.Tour[any]{}, nil
}
func (admin *Organizator) GetLeaguesTeams(
	ctx context.Context,
	leagueID int64,
) ([]models.Team, error) {
	return []models.Team{}, nil
}
func (admin *Organizator) PostTourIntoLeague(
	ctx context.Context,
	leagueID int64,
	newTour models.Tour[any],
) (models.Tour[any], error) {
	return models.Tour[any]{}, nil
}
func (admin *Organizator) PostTeamIntoLeague(
	ctx context.Context,
	leagueID int64,
	team_id int64,
) (models.Team, error) {
	return models.Team{}, nil
}
func (admin *Organizator) PostNewTeam(
	ctx context.Context,
	leagueID int64,
	teamName string,
) (models.Team, error) {
	return models.Team{}, nil
}
func (admin *Organizator) PostPlayerIntoTeam(
	ctx context.Context,
	teamID int64,
	userID int64,
	gameNumber int64,
) (models.Player, error) {
	return models.Player{}, nil
}
func (admin *Organizator) PostNewPlayer(
	ctx context.Context,
	user models.User,
) (models.User, error) {
	return models.User{}, nil
}
func (admin *Organizator) GetRoundsOfTour(
	ctx context.Context,
	tourID int64,
) ([]models.Round, error) {
	return []models.Round{}, nil
}
func (admin *Organizator) GetMatchesOfRound(
	ctx context.Context,
	roundID int64,
) ([]models.Match, error) {
	return []models.Match{}, nil
}
func (admin *Organizator) GetAllPlayers(
	ctx context.Context,
) ([]models.User, error) {
	return []models.User{}, nil
}
func (admin *Organizator) GetPlayersOfTeam(
	ctx context.Context,
	teamID int64,
) ([]models.Player, error) {
	return []models.Player{}, nil
}
func (admin *Organizator) PostNewGroupOfTour(
	ctx context.Context,
	tourID int64,
	newGroup models.Group,
) (models.Group, error) {
	return models.Group{}, nil
}
func (admin *Organizator) GetGroupsOfTour(
	ctx context.Context,
	tourID int64,
) ([]models.Group, error) {
	return []models.Group{}, nil
}
func (admin *Organizator) PostTeamIntoGroup(
	ctx context.Context,
	teamID int64,
	groupID int64,
) (models.Team, error) {
	return models.Team{}, nil
}
