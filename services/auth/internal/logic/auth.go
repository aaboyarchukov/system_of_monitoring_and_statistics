package logic

import (
	"context"
	"fmt"
	"log/slog"
	auth_jwt "system_of_monitoring_statistics/services/auth/internal/jwt"
	"system_of_monitoring_statistics/services/auth/internal/models"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type UserProvider interface {
	GetUser(ctx context.Context, login string) (models.User, error)
	IsLoginExist(ctx context.Context, login string) (bool, error)
}

type UserSaver interface {
	SaveUser(ctx context.Context,
		email string,
		password string,
		name string,
		surname string,
		sex string,
		height int64,
		weight int64,
		birth_date int64) (int64, error)
}

type Auth struct {
	log          *slog.Logger
	userProvider UserProvider
	userSaver    UserSaver
}

func New(log *slog.Logger,
	userProvider UserProvider,
	userSaver UserSaver,
) *Auth {
	return &Auth{
		log:          log,
		userProvider: userProvider,
		userSaver:    userSaver,
	}
}

func (a *Auth) Login(ctx context.Context,
	email string,
	password string,
) (string, error) {
	const operation string = "logic.Login"

	log := a.log.With(
		slog.String("operation", operation),
	)

	log.Info("attempting getting user")

	userData, errGetUserData := a.userProvider.GetUser(ctx, email)
	if errGetUserData != nil {
		// TODO: add specific error processing
		log.Warn("user not found", slog.Attr{
			Key:   "error",
			Value: slog.StringValue(errGetUserData.Error()),
		})

		log.Error("user not found", slog.Attr{
			Key:   "error",
			Value: slog.StringValue(errGetUserData.Error()),
		})

		return "", fmt.Errorf("%s: %w", operation, errGetUserData)
	}

	errComparePasswords := bcrypt.CompareHashAndPassword([]byte(userData.Password), []byte(password))
	if errComparePasswords != nil {
		log.Info("invalid credentials", slog.Attr{
			Key:   "error",
			Value: slog.StringValue(errComparePasswords.Error()),
		})

		return "", fmt.Errorf("%s: %w", operation, errComparePasswords)
	}

	// generate jwt
	token, errGetToken := auth_jwt.GenerateJWT(userData, time.Hour*8)
	if errGetToken != nil {
		log.Error("err generate jwt", slog.Attr{
			Key:   "error",
			Value: slog.StringValue(errGetToken.Error()),
		})
	}

	log.Info("user logged in successfully")

	return token, nil
}

func (a *Auth) Register(ctx context.Context,
	email string,
	password string,
	name string,
	surname string,
	sex string,
	height int64,
	weight int64,
	birthDate int64,
) (int64, error) {
	const operation string = "logic.Register"

	log := a.log.With(
		slog.String("operation", operation),
	)

	log.Info("starting loging user")
	log.Info("check login")

	existLogin, errExistLogin := a.userProvider.IsLoginExist(ctx, email)

	if errExistLogin != nil {
		// TODO: add specific error processing
		log.Error("error with sql row", slog.Attr{
			Key:   "error",
			Value: slog.StringValue(errExistLogin.Error()),
		})

		return -1, fmt.Errorf("%s: %w", operation, errExistLogin)
	}

	if existLogin {
		log.Info("login alredy exist")
		return -1, fmt.Errorf("%s: login exist", operation)
	}

	log.Info("generating password")
	userPass, errGeneratePass := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if errGeneratePass != nil {
		log.Error("error with sql row", slog.Attr{
			Key:   "error",
			Value: slog.StringValue(errGeneratePass.Error()),
		})
		return -1, fmt.Errorf("%s: %w", operation, errGeneratePass)
	}

	log.Info("saving user")
	newUserID, errSaveUser := a.userSaver.SaveUser(
		ctx, email, string(userPass),
		name, surname, sex, height,
		weight, birthDate,
	)
	if errSaveUser != nil {
		log.Error("error save user", slog.Attr{
			Key:   "error",
			Value: slog.StringValue(errSaveUser.Error()),
		})
		return -1, fmt.Errorf("%s: %w", operation, errSaveUser)
	}

	log.Info("user saved successfuly")

	return newUserID, nil
}
