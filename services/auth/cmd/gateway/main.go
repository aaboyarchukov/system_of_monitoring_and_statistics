package main

import (
	"log/slog"
	"os"
	auth_config "system_of_monitoring_statistics/services/auth/config"
	auth_gateway "system_of_monitoring_statistics/services/auth/gateway"

	"github.com/joho/godotenv"
)

func main() {
	// load env variables
	MustSetUpEnv()

	// TODO: инициализировать объект loger
	log := SetupLoger("local")

	// инициализировать config для auth
	authConfig := auth_config.MustLoad()
	// инициализировать gateway для auth
	authGateway := auth_gateway.New(log, authConfig.Gateway.Port, authConfig.GRPC.Port)
	authGateway.MustRun()
	// TODO: все упаковать в gorutines и добавить канал,
	// который ожидает сигнала по завершению
	// затем GracefulShotDowmn
}

func MustSetUpEnv() {
	if err := godotenv.Load(".env"); err != nil {
		panic("failed with load env file")
	}
}

func SetupLoger(enviroment string) *slog.Logger {
	// for future development

	// var log *slog.Logger
	// switch enviroment {
	// case "local":
	// 	log = slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
	// 		Level: slog.LevelDebug,
	// 	}))

	// case "dev":
	// 	log = slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
	// 		Level: slog.LevelDebug,
	// 	}))

	// case "prod":
	// 	log = slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
	// 		Level: slog.LevelInfo,
	// 	}))
	// }

	return slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}))
}
