package user_manager_grpc

import (
	"context"
	"system_of_monitoring_statistics/services/models"
	user_manager_v1 "system_of_monitoring_statistics/services/user_manager/gen/protos"

	"google.golang.org/grpc"
)

type UserManager interface {
	GetUserProfile(ctx context.Context,
		userID int64,
	) (models.User, error)
	GetMatchStatistic(context.Context) error
	GetUserMatchesStatistic(context.Context) error
	GetLeagueSchedule(context.Context) error
	GetLeagueStanding(context.Context) error
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
	user, errGetUser := userManager.userManager.GetUserProfile(ctx, request.GetUserId())
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
	}, nil
}

func (userManager *userManagerApi) GetMatchStatistic(
	context.Context,
	*user_manager_v1.GetUserStatisticRequest,
) (*user_manager_v1.UserStatistic, error) {
	// TODO: реализовать метод получения статистики по матчу
	return &user_manager_v1.UserStatistic{}, nil
}

func (userManager *userManagerApi) GetUserMatchesStatistic(
	context.Context,
	*user_manager_v1.GetUserStatisticRequest,
) (*user_manager_v1.UserMatchesStatistic, error) {
	// TODO: реализовать метод получения статистики по матчам
	return &user_manager_v1.UserMatchesStatistic{}, nil
}

func (userManager *userManagerApi) GetLeagueSchedule(
	context.Context,
	*user_manager_v1.GetLeagueScheduleRequest,
) (*user_manager_v1.LeagueSchedule, error) {
	// TODO: реализовать метод получения расписания лиги
	return &user_manager_v1.LeagueSchedule{}, nil
}

func (userManager *userManagerApi) GetLeagueStanding(
	context.Context,
	*user_manager_v1.GetLeagueStandingRequest,
) (*user_manager_v1.LeagueStanding, error) {
	// TODO: реализовать метод получения турнирной таблицы турнира
	return &user_manager_v1.LeagueStanding{}, nil
}
