package organization_manager_grpc

import (
	"context"
	"system_of_monitoring_statistics/models"
	organisation_manager_v1 "system_of_monitoring_statistics/services/organisation_manager/gen/protos"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/structpb"
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
	) ([]models.Tour[any], error)

	GetLeaguesTeams(
		ctx context.Context,
		leagueID int64,
	) ([]models.Team, error)

	PostTourIntoLeague(
		ctx context.Context,
		leagueID int64,
		newTour models.Tour[any],
	) (models.Tour[any], error)

	PostTeamIntoLeague(
		ctx context.Context,
		leagueID int64,
		team_id int64,
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
	) (models.Player, error)

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

	PostTeamIntoGroup(
		ctx context.Context,
		teamID int64,
		groupID int64,
	) (models.Team, error)
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
	// TODO: validate data
	sportTypes, errGetSportTypes := admin.organizator.GetSportTypes(ctx)
	if errGetSportTypes != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultSportTypes []*organisation_manager_v1.SportType
	for _, sportType := range sportTypes {
		resultSportTypes = append(resultSportTypes, &organisation_manager_v1.SportType{
			Id:   sportType.ID,
			Name: sportType.Name,
		})
	}

	return &organisation_manager_v1.SportTypes{
		SportType: resultSportTypes,
	}, nil
}

func (admin *organizatorApi) GetLeagues(
	ctx context.Context,
	request *organisation_manager_v1.GetLeaguesRequest,
) (*organisation_manager_v1.Leagues, error) {
	// TODO: validate data
	leagues, errGetLeagues := admin.organizator.GetLeagues(
		ctx, request.GetSportTypeId(),
	)
	if errGetLeagues != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultLeagues []*organisation_manager_v1.League
	for _, league := range leagues {
		resultLeagues = append(resultLeagues, &organisation_manager_v1.League{
			Id:   league.Id,
			Name: league.Name,
		})
	}
	return &organisation_manager_v1.Leagues{
		League: resultLeagues,
	}, nil
}

func (admin *organizatorApi) PostNewLeague(
	ctx context.Context,
	request *organisation_manager_v1.PostNewLeagueRequest,
) (*organisation_manager_v1.League, error) {
	// TODO: validate data
	newLeague, errPostNewLeague := admin.organizator.PostNewLeague(
		ctx, request.GetSportTypeId(), request.GetLeagueName(),
	)
	if errPostNewLeague != nil {
		return nil, status.Error(codes.InvalidArgument, "failed add new league")
	}

	return &organisation_manager_v1.League{
		Id:   newLeague.Id,
		Name: newLeague.Name,
	}, nil
}

func (admin *organizatorApi) GetLeaguesTours(
	ctx context.Context,
	request *organisation_manager_v1.GetLeaguesToursRequest,
) (*organisation_manager_v1.Tours, error) {
	// TODO: validate data
	toursOfLeague, errGetTours := admin.organizator.GetLeaguesTours(
		ctx, request.GetLeagueId(),
	)
	if errGetTours != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultTours []*organisation_manager_v1.Tour
	for _, tour := range toursOfLeague {
		tourConfig, errConvert := structpb.NewStruct(tour.Config)
		if errConvert != nil {
			return nil, status.Error(codes.Unknown, "failed convert map to structpb")
		}

		resultTours = append(resultTours, &organisation_manager_v1.Tour{
			Id:         tour.Id,
			Name:       tour.Name,
			TourConfig: tourConfig,
		})
	}

	return &organisation_manager_v1.Tours{
		Tours: resultTours,
	}, nil
}

func (admin *organizatorApi) GetLeaguesTeams(
	ctx context.Context,
	request *organisation_manager_v1.GetLeaguesTeamsRequest,
) (*organisation_manager_v1.Teams, error) {
	// TODO: validate data
	teamsOfLeague, errGetTeams := admin.organizator.GetLeaguesTeams(
		ctx, request.GetLeagueId(),
	)
	if errGetTeams != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultTeams []*organisation_manager_v1.Team
	for _, team := range teamsOfLeague {
		resultTeams = append(resultTeams, &organisation_manager_v1.Team{
			Id:   team.Id,
			Name: team.Name,
		})
	}

	return &organisation_manager_v1.Teams{
		Teams: resultTeams,
	}, nil
}

func (admin *organizatorApi) PostTourIntoLeague(
	ctx context.Context,
	request *organisation_manager_v1.PostTourRequest,
) (*organisation_manager_v1.Tour, error) {
	// TODO: validate data
	newTour, errPostNewTour := admin.organizator.PostTourIntoLeague(
		ctx, request.GetLeagueId(), models.Tour[any]{
			Name:   request.GetName(),
			Place:  request.GetPlace(),
			DateMS: request.GetDateMs(),
			Config: request.GetTourConfig().AsMap(),
		},
	)
	if errPostNewTour != nil {
		return nil, status.Error(codes.Unknown, "failed add new tour")
	}

	tourConfig, errConvert := structpb.NewStruct(newTour.Config)
	if errConvert != nil {
		return nil, status.Error(codes.Unknown, "failed convert map to structpb")
	}

	return &organisation_manager_v1.Tour{
		Id:         newTour.Id,
		Name:       newTour.Name,
		TourConfig: tourConfig,
	}, nil
}

func (admin *organizatorApi) PostTeamIntoLeague(
	ctx context.Context,
	request *organisation_manager_v1.PostTeamRequest,
) (*organisation_manager_v1.Team, error) {
	// TODO: validate data
	team, errPostTeam := admin.organizator.PostTeamIntoLeague(
		ctx, request.GetLeagueId(), request.GetTeamId(),
	)
	if errPostTeam != nil {
		return nil, status.Error(codes.Unknown, "failed add new team")
	}

	return &organisation_manager_v1.Team{
		Id:   team.Id,
		Name: team.Name,
	}, nil
}

func (admin *organizatorApi) PostNewTeam(
	ctx context.Context,
	request *organisation_manager_v1.PostNewTeamRequest,
) (*organisation_manager_v1.Team, error) {
	team, errPostNewTeam := admin.organizator.PostNewTeam(
		ctx, request.GetLeagueId(), request.GetTeamName(),
	)

	if errPostNewTeam != nil {
		return nil, status.Error(codes.Unknown, "failed add new team")
	}

	return &organisation_manager_v1.Team{
		Id:   team.Id,
		Name: team.Name,
	}, nil
}

func (admin *organizatorApi) PostPlayerIntoTeam(
	ctx context.Context,
	request *organisation_manager_v1.PostPlayerRequest,
) (*organisation_manager_v1.Player, error) {
	// TODO: validate data
	player, errPostPlayerIntoTeam := admin.organizator.PostPlayerIntoTeam(
		ctx, request.GetTeamId(), request.GetPlayerId(), request.GetGameNumber(),
	)
	if errPostPlayerIntoTeam != nil {
		return nil, status.Error(codes.Unknown, "failed add player into team")
	}

	return &organisation_manager_v1.Player{
		Id:         player.UserID,
		GameNumber: player.GameNumber,
	}, nil
}

func (admin *organizatorApi) PostNewPlayer(
	ctx context.Context,
	request *organisation_manager_v1.PostNewPlayerRequest,
) (*organisation_manager_v1.Player, error) {
	// TODO: validate data
	newPlayer, errPostNewPlayer := admin.organizator.PostNewPlayer(
		ctx, models.User{
			Login:       request.GetEmail(),
			Password:    request.GetPassword(),
			Name:        request.GetName(),
			Surname:     request.GetSurname(),
			Sex:         request.GetSex(),
			Height:      request.GetHeight(),
			Weight:      request.GetWeight(),
			BirthDateMs: request.GetDateBirthMs(),
			PhotoURl:    "",
		},
	)
	if errPostNewPlayer != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	return &organisation_manager_v1.Player{
		Id:          newPlayer.UserID,
		Email:       newPlayer.Login,
		Name:        newPlayer.Name,
		Surname:     newPlayer.Surname,
		Height:      newPlayer.Height,
		Weight:      newPlayer.Weight,
		DateBirthMs: newPlayer.BirthDateMs,
		PhotoUrl:    newPlayer.PhotoURl,
		GameNumber:  -1,
	}, nil
}

func (admin *organizatorApi) GetRoundsOfTour(
	ctx context.Context,
	request *organisation_manager_v1.GetRoundsRequest,
) (*organisation_manager_v1.Rounds, error) {
	// TODO: validate data
	rounds, errGetRounds := admin.organizator.GetRoundsOfTour(
		ctx, request.GetTourId(),
	)
	if errGetRounds != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultRounds []*organisation_manager_v1.Round
	for _, round := range rounds {
		resultRounds = append(resultRounds, &organisation_manager_v1.Round{
			Id:   round.ID,
			Name: round.Name,
		})
	}
	return &organisation_manager_v1.Rounds{
		Rounds: resultRounds,
	}, nil
}

func (admin *organizatorApi) GetMatchesOfRound(
	ctx context.Context,
	request *organisation_manager_v1.GetMatchesOfRoundRequest,
) (*organisation_manager_v1.Matches, error) {
	// TODO: validate data
	matches, errGetMatches := admin.organizator.GetMatchesOfRound(
		ctx, request.GetRoundId(),
	)
	if errGetMatches != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultMatches []*organisation_manager_v1.Match
	for _, match := range matches {
		resultMatches = append(resultMatches, &organisation_manager_v1.Match{
			MatchId:       match.MatchID,
			HomeTeam:      match.HomeTeam,
			HomeTeamScore: match.HomeTeamScore,
			AwayTeam:      match.AwayTeam,
			AwayTeamScore: match.AwayTeamScore,
			Round:         match.Round,
			DateMs:        match.DateMs,
		})
	}
	return &organisation_manager_v1.Matches{
		Matches: resultMatches,
	}, nil
}

func (admin *organizatorApi) GetAllPlayers(
	ctx context.Context,
	request *organisation_manager_v1.Empty,
) (*organisation_manager_v1.Players, error) {
	// TODO: validate data
	allPlayers, errGetPlayers := admin.organizator.GetAllPlayers(ctx)
	if errGetPlayers != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultAllPlayers []*organisation_manager_v1.Player
	for _, player := range allPlayers {
		resultAllPlayers = append(resultAllPlayers, &organisation_manager_v1.Player{
			Id:          player.UserID,
			Email:       player.Login,
			Name:        player.Name,
			Surname:     player.Surname,
			Height:      player.Height,
			Weight:      player.Weight,
			DateBirthMs: player.BirthDateMs,
			PhotoUrl:    player.PhotoURl,
			GameNumber:  -1,
		})
	}
	return &organisation_manager_v1.Players{
		Players: resultAllPlayers,
	}, nil
}

func (admin *organizatorApi) GetPlayersOfTeam(
	ctx context.Context,
	request *organisation_manager_v1.GetPlayersOfTeamRequest,
) (*organisation_manager_v1.Players, error) {
	// TODO: validate data
	allTeamPlayers, errGetPlayers := admin.organizator.GetPlayersOfTeam(
		ctx, request.GetTeamId(),
	)
	if errGetPlayers != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultAllPlayers []*organisation_manager_v1.Player
	for _, player := range allTeamPlayers {
		resultAllPlayers = append(resultAllPlayers, &organisation_manager_v1.Player{
			Id:          player.UserID,
			Email:       player.Login,
			Name:        player.Name,
			Surname:     player.Surname,
			Height:      player.Height,
			Weight:      player.Weight,
			DateBirthMs: player.BirthDateMs,
			PhotoUrl:    player.PhotoURl,
			GameNumber:  -1,
		})
	}
	return &organisation_manager_v1.Players{
		Players: resultAllPlayers,
	}, nil
}

func (admin *organizatorApi) PostNewGroupOfTour(
	ctx context.Context,
	request *organisation_manager_v1.PostNewGroup,
) (*organisation_manager_v1.Group, error) {
	// TODO: validate data
	newGroup, errPostNewGroup := admin.organizator.PostNewGroupOfTour(
		ctx, request.GetTourId(), models.Group{
			Name: request.GetGroupName(),
		},
	)
	if errPostNewGroup != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	return &organisation_manager_v1.Group{
		Id:   newGroup.Id,
		Name: newGroup.Name,
	}, nil
}

func (admin *organizatorApi) GetGroupsOfTour(
	ctx context.Context,
	request *organisation_manager_v1.GetGroupsRequest,
) (*organisation_manager_v1.Groups, error) {

	// TODO: validate data
	groups, errGetGroups := admin.organizator.GetGroupsOfTour(
		ctx, request.GetTourId(),
	)
	if errGetGroups != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultGroups []*organisation_manager_v1.Group
	for _, group := range groups {
		resultGroups = append(resultGroups, &organisation_manager_v1.Group{
			Id:   group.Id,
			Name: group.Name,
		})
	}

	return &organisation_manager_v1.Groups{
		Groups: resultGroups,
	}, nil
}

func (admin *organizatorApi) PostTeamIntoGroup(
	ctx context.Context,
	request *organisation_manager_v1.PostTeamInGroupRequest,
) (*organisation_manager_v1.Team, error) {
	// TODO: validate data
	team, errPostTeamIntoGroup := admin.organizator.PostTeamIntoGroup(
		ctx, request.GetTeamId(), request.GetGroupId(),
	)
	if errPostTeamIntoGroup != nil {
		return nil, status.Error(codes.Unknown, "failed add team in group")
	}
	return &organisation_manager_v1.Team{
		Id:   team.Id,
		Name: team.Name,
	}, nil
}
