package user_manager_grpc

import (
	"context"
	"system_of_monitoring_statistics/models"
	user_manager_v1 "system_of_monitoring_statistics/services/user_manager/gen/protos"

	"google.golang.org/grpc"
)

type UserManager interface {
	GetUserProfile(
		ctx context.Context,
		user_id int64,
	) (models.User, error)

	GetUserMatchesStatistic(
		ctx context.Context,
		user_id int64,
		team_id int64,
		tour_id int64,
	) error
	// GetUserProfile(context.Context, *user_manager_v1.GetUserProfileRequest) (*user_manager_v1.UserProfile, error)
	// GetUserMatchesStatistic(context.Context, *user_manager_v1.GetUserMatchesStatisticRequest) (*user_manager_v1.MatchesStatistic, error)
	// GetMatchStatistic(context.Context, *user_manager_v1.GetMatchStatisticRequest) (*user_manager_v1.MatchStatistic, error)
	// GetMeasurementsFields(context.Context, *user_manager_v1.GetMeasurementsFieldsRequest) (*user_manager_v1.MeasurementsFieldsResponse, error)
	// GetPlayerTeams(context.Context, *user_manager_v1.GetPlayerTeamsRequest) (*user_manager_v1.PlayerTeams, error)
	// GetLeaguesTours(context.Context, *user_manager_v1.GetLeaguesToursRequest) (*user_manager_v1.LeaguesTours, error)
	// GetTourGroups(context.Context, *user_manager_v1.GetTourGroupsRequest) (*user_manager_v1.TourGroups, error)

	// // return leagues wich are belongs to sport type
	// GetLeaguesBelongsToSportType(context.Context, *user_manager_v1.GetLeagues) (*user_manager_v1.SportTypeLeagues, error)

	// GetLeagueSchedule(context.Context, *user_manager_v1.GetLeagueScheduleRequest) (*user_manager_v1.MatchesStatistic, error)
	// GetTourStanding(context.Context, *user_manager_v1.GetTourStandingRequest) (*user_manager_v1.TourStanding, error)
}

type userManagerApi struct {
	user_manager_v1.UnimplementedUserManagerServer
	userManager UserManager
}

func RegisterServer(gRPC *grpc.Server, userManager UserManager) {
	user_manager_v1.RegisterUserManagerServer(gRPC, &userManagerApi{
		userManager: userManager,
	})
}

func (userManager *userManagerApi) GetUserProfile(
	ctx context.Context,
	request *user_manager_v1.GetUserProfileRequest,
) (*user_manager_v1.UserProfile, error) {
	// TODO: сделать валидацию данных
	user, errGetUser := userManager.userManager.GetUserProfile(ctx, request.GetPlayerId())
	if errGetUser != nil {
		return nil, errGetUser
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
