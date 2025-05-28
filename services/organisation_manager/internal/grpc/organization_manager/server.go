package organization_manager_grpc

import (
	"context"
	"system_of_monitoring_statistics/models"
	organisation_manager_v1 "system_of_monitoring_statistics/services/organisation_manager/gen/protos"

	"google.golang.org/grpc"
)

type Organizator interface {
	GetSportTypes(
		ctx context.Context,
	) ([]models.SportType, error)

	GetLeagues(
		ctx context.Context,
		sportTypeID int64,
	) ([]models.League, error)

	PostNewLeague(
		ctx context.Context,
		sportTypeID int64,
		leagueName string,
	) (models.League, error)

	GetLeaguesTours(
		ctx context.Context,
		leagueID int64,
	) ([]models.Tour, error)

	GetLeaguesTeams(
		ctx context.Context,
		leagueID int64,
	) ([]models.Team, error)

	PostTourIntoLeague(
		ctx context.Context,
		leagueID int64,
		newTour models.Tour,
	) (models.Tour, error)

	PostTeamIntoLeague(
		ctx context.Context,
		leagueID int64,
		team models.Team,
	) (models.Team, error)

	PostNewTeam(
		ctx context.Context,
		leagueID int64,
		teamName string,
	) (models.Team, error)

	PostPlayerIntoTeam(
		ctx context.Context,
		teamID int64,
		userID int64,
		gameNumber int64,
	) (models.Player, int64, error)

	PostNewPlayer(
		ctx context.Context,
		user models.User,
	) (models.User, error)

	GetRoundsOfTour(
		ctx context.Context,
		tourID int64,
	) ([]models.Round, error)

	GetMatchesOfRound(
		ctx context.Context,
		roundID int64,
	) ([]models.Match, error)

	GetAllPlayers(
		ctx context.Context,
	) ([]models.User, error)

	GetPlayersOfTeam(
		ctx context.Context,
		teamID int64,
	) ([]models.Player, error)

	PostNewGroupOfTour(
		ctx context.Context,
		tourID int64,
		newGroup models.Group,
	) (models.Group, error)

	GetGroupsOfTour(
		ctx context.Context,
		tourID int64,
	) ([]models.Group, error)

	PostTeamsIntoGroup(
		ctx context.Context,
		teamID int64,
		groupID int64,
	) (models.Group, error)
}

type organizatorApi struct {
	organisation_manager_v1.UnimplementedOrganisationManagerServer
	organizator Organizator
}

func RegisterServer(gRPC *grpc.Server, organizator Organizator) {
	organisation_manager_v1.RegisterOrganisationManagerServer(
		gRPC, &organizatorApi{
			organizator: organizator,
		},
	)
}

func (admin *organizatorApi) GetSportTypes(
	ctx context.Context,
	request *organisation_manager_v1.Empty,
) (*organisation_manager_v1.SportTypes, error) {
	return nil, nil
}

func (admin *organizatorApi) GetLeagues(
	ctx context.Context,
	request *organisation_manager_v1.GetLeaguesRequest,
) (*organisation_manager_v1.Leagues, error) {
	return nil, nil
}

func (admin *organizatorApi) PostNewLeague(
	ctx context.Context,
	request *organisation_manager_v1.PostNewLeagueRequest,
) (*organisation_manager_v1.League, error) {
	return nil, nil
}

func (admin *organizatorApi) GetLeaguesTours(
	ctx context.Context,
	request *organisation_manager_v1.GetLeaguesToursRequest,
) (*organisation_manager_v1.Tours, error) {
	return nil, nil
}

func (admin *organizatorApi) GetLeaguesTeams(
	ctx context.Context,
	request *organisation_manager_v1.GetLeaguesTeamsRequest,
) (*organisation_manager_v1.Teams, error) {
	return nil, nil
}

func (admin *organizatorApi) PostTourIntoLeague(
	ctx context.Context,
	request *organisation_manager_v1.PostTourRequest,
) (*organisation_manager_v1.Tour, error) {
	return nil, nil
}

func (admin *organizatorApi) PostTeamIntoLeague(
	ctx context.Context,
	request *organisation_manager_v1.PostTeamRequest,
) (*organisation_manager_v1.Team, error) {
	return nil, nil
}

func (admin *organizatorApi) PostNewTeam(
	ctx context.Context,
	request *organisation_manager_v1.PostNewTeamRequest,
) (*organisation_manager_v1.Team, error) {
	return nil, nil
}

func (admin *organizatorApi) PostPlayerIntoTeam(
	ctx context.Context,
	request *organisation_manager_v1.PostPlayerRequest,
) (*organisation_manager_v1.Player, error) {
	return nil, nil
}

func (admin *organizatorApi) PostNewPlayer(
	ctx context.Context,
	request *organisation_manager_v1.PostNewPlayerRequest,
) (*organisation_manager_v1.Player, error) {
	return nil, nil
}

func (admin *organizatorApi) GetRoundsOfTour(
	ctx context.Context,
	request *organisation_manager_v1.GetRoundsRequest,
) (*organisation_manager_v1.Rounds, error) {
	return nil, nil
}

func (admin *organizatorApi) GetMatchesOfRound(
	ctx context.Context,
	request *organisation_manager_v1.GetMatchesOfRoundRequest,
) (*organisation_manager_v1.Matches, error) {
	return nil, nil
}

func (admin *organizatorApi) GetAllPlayers(
	ctx context.Context,
	request *organisation_manager_v1.Empty,
) (*organisation_manager_v1.Players, error) {
	return nil, nil
}

func (admin *organizatorApi) GetPlayersOfTeam(
	ctx context.Context,
	request *organisation_manager_v1.GetPlayersOfTeamRequest,
) (*organisation_manager_v1.Players, error) {
	return nil, nil
}

func (admin *organizatorApi) PostNewGroupOfTour(
	ctx context.Context,
	request *organisation_manager_v1.PostNewGroup,
) (*organisation_manager_v1.Group, error) {
	return nil, nil
}

func (admin *organizatorApi) GetGroupsOfTour(
	ctx context.Context,
	request *organisation_manager_v1.GetGroupsRequest,
) (*organisation_manager_v1.Groups, error) {
	return nil, nil
}

func (admin *organizatorApi) PostTeamsIntoGroup(
	ctx context.Context,
	request *organisation_manager_v1.PostTeamsRequest,
) (*organisation_manager_v1.Teams, error) {
	return nil, nil
}
