package user_manager_grpc

import (
	"context"
	"system_of_monitoring_statistics/models"
	user_manager_v1 "system_of_monitoring_statistics/services/user_manager/gen/protos"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/structpb"
)

type UserManager interface {
	GetUserProfile(
		ctx context.Context,
		userID int64,
	) (models.User, error)

	GetUserMatchesStatistic(
		ctx context.Context,
		userID int64,
		teamID int64,
		tourID int64,
	) ([]models.Match, error)

	GetMatchStatistic(
		ctx context.Context,
		matchID int64,
	) (models.MatchStatistic[any], error)

	GetMeasurementsFields(
		ctx context.Context,
		sportTypeID int64,
	) ([]models.MeasurementsFields, error)

	GetPlayerTeams(
		ctx context.Context,
		playerID int64,
		tourID int64,
	) ([]models.Team, error)

	GetLeaguesTours(
		ctx context.Context,
		leagueID int64,
	) ([]models.Tour[any], error)

	GetTourGroups(
		ctx context.Context,
		tourID int64,
	) ([]models.Group, error)

	GetLeaguesBelongsToSportType(
		ctx context.Context,
		sportTypeID int64,
	) ([]models.League, error)

	GetTourSchedule(
		ctx context.Context,
		leagueID int64,
	) ([]models.Match, error)

	GetTourStanding(
		ctx context.Context,
		tourID int64,
		groupID int64,
	) (models.GroupStanding, error)
}

type userManagerApi struct {
	user_manager_v1.UnimplementedUserManagerServer
	manager UserManager
}

func RegisterServer(gRPC *grpc.Server, userManager UserManager) {
	user_manager_v1.RegisterUserManagerServer(gRPC, &userManagerApi{
		manager: userManager,
	})
}

func (userManager *userManagerApi) GetUserProfile(
	ctx context.Context,
	request *user_manager_v1.GetUserProfileRequest,
) (*user_manager_v1.UserProfile, error) {
	// TODO: сделать валидацию данных
	user, errGetUser := userManager.manager.GetUserProfile(ctx, request.GetPlayerId())
	if errGetUser != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	return &user_manager_v1.UserProfile{
		Email:       user.Login,
		Name:        user.Name,
		Surname:     user.Surname,
		Sex:         user.Sex,
		Height:      user.Height,
		Weight:      user.Weight,
		DateBirthMs: user.BirthDateMs,
		PhotoUrl:    user.PhotoURl,
	}, nil
}

func (userManager *userManagerApi) GetUserMatchesStatistic(
	ctx context.Context,
	request *user_manager_v1.GetUserMatchesStatisticRequest,
) (*user_manager_v1.MatchesStatistic, error) {
	// TODO: validate data
	matchesStatistic, errGetMatches := userManager.manager.GetUserMatchesStatistic(
		ctx, request.GetUserId(), request.GetTeamId(), request.TourId,
	)
	if errGetMatches != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultMatchesStatistic []*user_manager_v1.Match
	for _, match := range matchesStatistic {
		resultMatchesStatistic = append(resultMatchesStatistic, &user_manager_v1.Match{
			MatchId:       match.MatchID,
			HomeTeam:      match.HomeTeam,
			HomeTeamScore: match.HomeTeamScore,
			AwayTeam:      match.AwayTeam,
			AwayTeamScore: match.AwayTeamScore,
			Round:         match.Round,
			DateMs:        match.DateMs,
		})
	}

	return &user_manager_v1.MatchesStatistic{
		MatchesStats: resultMatchesStatistic,
	}, nil
}

func (userManager *userManagerApi) GetMatchStatistic(
	ctx context.Context,
	request *user_manager_v1.GetMatchStatisticRequest,
) (*user_manager_v1.MatchStatistic, error) {
	// TODO: validate data
	matchStatistic, errGetMatchStatistic := userManager.manager.GetMatchStatistic(
		ctx, request.GetMatchId(),
	)
	if errGetMatchStatistic != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var homeTeamStatistic *user_manager_v1.TeamStatistic = &user_manager_v1.TeamStatistic{
		Name:  matchStatistic.HomeTeamStatistic.Name,
		Score: matchStatistic.HomeTeamStatistic.Score,
	}

	for _, player := range matchStatistic.HomeTeamStatistic.PlayersStats {
		playerStatistic, errConvertMapToSrtuct := structpb.NewStruct(
			player,
		)

		if errConvertMapToSrtuct != nil {
			return nil, status.Error(codes.Unknown, "failed to convert map to struct")
		}

		homeTeamStatistic.PlayersStats = append(homeTeamStatistic.PlayersStats, playerStatistic)

	}

	var awayTeamStatistic *user_manager_v1.TeamStatistic = &user_manager_v1.TeamStatistic{
		Name:  matchStatistic.AwayTeamStatistic.Name,
		Score: matchStatistic.AwayTeamStatistic.Score,
	}

	for _, player := range matchStatistic.AwayTeamStatistic.PlayersStats {
		playerStatistic, errConvertMapToSrtuct := structpb.NewStruct(
			player,
		)

		if errConvertMapToSrtuct != nil {
			return nil, status.Error(codes.Unknown, "failed to convert map to struct")
		}

		awayTeamStatistic.PlayersStats = append(awayTeamStatistic.PlayersStats, playerStatistic)
	}

	var statisticMeasurements []*user_manager_v1.MeasurementsFields
	for _, field := range matchStatistic.StatisticMeasurements {
		statisticMeasurements = append(statisticMeasurements, &user_manager_v1.MeasurementsFields{
			Key:   field.Key,
			Label: field.Label,
		})
	}

	return &user_manager_v1.MatchStatistic{
		StatisticMeasurements: statisticMeasurements,
		HomeTeamStatistic:     homeTeamStatistic,
		AwayTeamStatistic:     awayTeamStatistic,
	}, nil
}

func (userManager *userManagerApi) GetMeasurementsFields(
	ctx context.Context,
	request *user_manager_v1.GetMeasurementsFieldsRequest,
) (*user_manager_v1.MeasurementsFieldsResponse, error) {
	// TODO: validate data
	measurementsFields, errGetFields := userManager.manager.GetMeasurementsFields(
		ctx, request.GetSportTypeId(),
	)
	if errGetFields != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultMeasurementsFields []*user_manager_v1.MeasurementsFields
	for _, field := range measurementsFields {
		resultMeasurementsFields = append(resultMeasurementsFields, &user_manager_v1.MeasurementsFields{
			Key:   field.Key,
			Label: field.Label,
		})
	}

	return &user_manager_v1.MeasurementsFieldsResponse{
		StatisticMeasurements: resultMeasurementsFields,
	}, nil
}

func (userManager *userManagerApi) GetPlayerTeams(
	ctx context.Context,
	request *user_manager_v1.GetPlayerTeamsRequest,
) (*user_manager_v1.PlayerTeams, error) {
	// TODO: validate data
	playerTeams, errGetTeams := userManager.manager.GetPlayerTeams(
		ctx, request.GetPlayerId(), request.GetTourId(),
	)
	if errGetTeams != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultPlayerTeams []*user_manager_v1.Team
	for _, team := range playerTeams {
		resultPlayerTeams = append(resultPlayerTeams, &user_manager_v1.Team{
			Id:              team.Id,
			Name:            team.Name,
			TotalWins:       team.TotalWins,
			TotalLooses:     team.TotalLooses,
			TotalPointsDiff: team.TotalPointsDiff,
		})
	}
	return &user_manager_v1.PlayerTeams{
		PlayerTeams: resultPlayerTeams,
	}, nil
}

func (userManager *userManagerApi) GetLeaguesTours(
	ctx context.Context,
	request *user_manager_v1.GetLeaguesToursRequest,
) (*user_manager_v1.LeaguesTours, error) {
	// TODO: validate data
	toursOfLeague, errGetTours := userManager.manager.GetLeaguesTours(
		ctx, request.GetLeagueId(),
	)
	if errGetTours != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultToursOfLeague []*user_manager_v1.Tour
	for _, tour := range toursOfLeague {
		resultToursOfLeague = append(resultToursOfLeague, &user_manager_v1.Tour{
			Id:   tour.Id,
			Name: tour.Name,
		})
	}
	return &user_manager_v1.LeaguesTours{
		LeaguesTours: resultToursOfLeague,
	}, nil
}

func (userManager *userManagerApi) GetTourGroups(
	ctx context.Context,
	request *user_manager_v1.GetTourGroupsRequest,
) (*user_manager_v1.TourGroups, error) {
	// TODO: validate data
	groupsOfTour, errGetGroups := userManager.manager.GetTourGroups(
		ctx, request.GetTourId(),
	)
	if errGetGroups != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultGroupsOfTour []*user_manager_v1.Group

	for _, group := range groupsOfTour {
		resultGroupsOfTour = append(resultGroupsOfTour, &user_manager_v1.Group{
			Id:   group.Id,
			Name: group.Name,
		})
	}

	return &user_manager_v1.TourGroups{
		TourGroups: resultGroupsOfTour,
	}, nil
}

func (userManager *userManagerApi) GetLeaguesBelongsToSportType(
	ctx context.Context,
	request *user_manager_v1.GetLeagues,
) (*user_manager_v1.SportTypeLeagues, error) {
	// TODO: validate data
	leaguesOfSportType, errGetLeagues := userManager.manager.GetLeaguesBelongsToSportType(
		ctx, request.GetSportTypeId(),
	)
	if errGetLeagues != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultLeagues []*user_manager_v1.League
	for _, league := range leaguesOfSportType {
		resultLeagues = append(resultLeagues, &user_manager_v1.League{
			Id:   league.Id,
			Name: league.Name,
		})
	}
	return &user_manager_v1.SportTypeLeagues{
		Leagues: resultLeagues,
	}, nil
}

func (userManager *userManagerApi) GetTourSchedule(
	ctx context.Context,
	request *user_manager_v1.GetTourScheduleRequest,
) (*user_manager_v1.MatchesStatistic, error) {
	// TODO: validate data
	tourSchedule, errGetSchedule := userManager.manager.GetTourSchedule(
		ctx, request.GetTourId(),
	)
	if errGetSchedule != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	var resultSchedule []*user_manager_v1.Match
	for _, match := range tourSchedule {
		resultSchedule = append(resultSchedule, &user_manager_v1.Match{
			MatchId:       match.MatchID,
			HomeTeam:      match.HomeTeam,
			HomeTeamScore: match.HomeTeamScore,
			AwayTeam:      match.AwayTeam,
			AwayTeamScore: match.AwayTeamScore,
			Round:         match.Round,
			DateMs:        match.DateMs,
		})
	}
	return &user_manager_v1.MatchesStatistic{
		MatchesStats: resultSchedule,
	}, nil
}

func (userManager *userManagerApi) GetTourStanding(
	ctx context.Context,
	request *user_manager_v1.GetTourStandingRequest,
) (*user_manager_v1.TourStanding, error) {
	// TODO: validate data
	tourStanding, errGetStanding := userManager.manager.GetTourStanding(
		ctx, request.GetTourId(), request.GetGroupId(),
	)
	if errGetStanding != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid arguments")
	}

	// TODO: sorted result array of struct objects by wins, looses, points diff
	// or it is done by Postgres and GROUP + ORDER

	var teamsInGroup []*user_manager_v1.Team
	for _, team := range tourStanding.Teams {
		teamsInGroup = append(teamsInGroup, &user_manager_v1.Team{
			Id:              team.Id,
			Name:            team.Name,
			TotalWins:       team.TotalWins,
			TotalLooses:     team.TotalLooses,
			TotalPointsDiff: team.TotalPointsDiff,
		})
	}

	var resultStanding *user_manager_v1.GroupStanding = &user_manager_v1.GroupStanding{
		Group: tourStanding.GroupName,
		Teams: teamsInGroup,
	}

	return &user_manager_v1.TourStanding{
		GroupStanding: resultStanding,
	}, nil
}
