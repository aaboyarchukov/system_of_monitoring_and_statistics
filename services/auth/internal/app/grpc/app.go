package auth_app_grpc

import (
	"fmt"
	"log/slog"
	"net"
	auth_grpc "system_of_monitoring_statistics/services/auth/internal/grpc/auth"

	"google.golang.org/grpc"
)

// конфигурируем сервис auth
type App struct {
	log        *slog.Logger
	grpcServer *grpc.Server
	port       int
}

func New(
	log *slog.Logger,
	auth auth_grpc.Auth,
	port int,
) *App {
	// logging
	// recovery
	authServer := grpc.NewServer(grpc.ChainUnaryInterceptor())
	auth_grpc.RegisterServer(authServer, auth)

	return &App{
		log:        log,
		grpcServer: authServer,
		port:       port,
	}
}

func (app *App) Run() error {
	const operation string = "auth_app_grpc.Run"
	listenHost, errListen := net.Listen("tcp", fmt.Sprintf(":%d", app.port))
	if errListen != nil {
		return fmt.Errorf("%s: %w", operation, errListen)
	}

	app.log.Info("grpc server started", slog.String("addr", listenHost.Addr().String()))

	if errHandleServer := app.grpcServer.Serve(listenHost); errHandleServer != nil {
		return fmt.Errorf("%s: %w", operation, errHandleServer)
	}

	return nil
}

func (app *App) MustRun() {
	if err := app.Run(); err != nil {
		app.log.Info(err.Error())
		panic("failed on run app")
	}
}

func (app *App) Stop() {
	const operation string = "auth_app_grpc.Stop"

	app.log.With(slog.String("op", operation)).
		Info("stopping gRPC server", slog.Int("port", app.port))

	app.grpcServer.GracefulStop()
}
