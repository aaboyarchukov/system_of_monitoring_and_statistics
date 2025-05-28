package auth_app

import (
	"log/slog"
	auth_app_grpc "system_of_monitoring_statistics/services/auth/internal/app/grpc"
	"system_of_monitoring_statistics/services/auth/internal/logic"
	auth_postgres_storage "system_of_monitoring_statistics/services/auth/internal/storage/postgres"
)

// создаем итоговую сконфигурируенную версию сервиса auth
type App struct {
	GRPCServer *auth_app_grpc.App
}

func New(
	log *slog.Logger,
	port int,
) *App {
	// инициализация storage и передача в service
	storagePostgres, errInitPostgres := auth_postgres_storage.New()
	if errInitPostgres != nil {
		panic(errInitPostgres)
	}

	service := logic.New(log, storagePostgres, storagePostgres)
	grpcApp := auth_app_grpc.New(log, service, port)

	return &App{
		GRPCServer: grpcApp,
	}
}
