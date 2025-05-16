package auth_gateway

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	auth_v1 "system_of_monitoring_statistics/services/auth/gen/protos"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type AuthGateway struct {
	log      *slog.Logger
	port     int
	grpcPort int
}

func New(
	log *slog.Logger,
	authGatewayPort int,
	grpcPort int,
) AuthGateway {
	return AuthGateway{
		log:      log,
		port:     authGatewayPort,
		grpcPort: grpcPort,
	}
}

func allowCORS(httpHandler http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Access-Control-Allow-Origin", "*")
		writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if request.Method == http.MethodOptions {
			writer.WriteHeader(http.StatusOK)
			return
		}

		httpHandler.ServeHTTP(writer, request)
	})
}

func (authGateway *AuthGateway) Run() error {
	const operation string = "auth_gateway.Run"
	authGateway.log = authGateway.log.With(slog.String("op", operation))

	gatewayOptions := []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	}

	gatewayMux := runtime.NewServeMux()
	gatewayMuxWithCors := allowCORS(gatewayMux)

	errRegisterHandler := auth_v1.RegisterAuthHandlerFromEndpoint(
		context.Background(),
		gatewayMux,
		fmt.Sprintf("localhost:%d", authGateway.grpcPort),
		gatewayOptions,
	)

	if errRegisterHandler != nil {
		authGateway.log.Info("failed run gateway")
		return fmt.Errorf("%s: %w", operation, errRegisterHandler)
	}

	listenHost, errListen := net.Listen("tcp", fmt.Sprintf(":%d", authGateway.port))
	if errListen != nil {
		return fmt.Errorf("%s: %w", operation, errListen)
	}
	authGateway.log.Info("auth gateway started", slog.String("addr", listenHost.Addr().String()))

	if errListen := http.Serve(
		listenHost,
		gatewayMuxWithCors,
	); errListen != nil {
		authGateway.log.Error("failed listen")
		return errListen
	}

	return nil
}

func (authGateway *AuthGateway) MustRun() {
	if errRun := authGateway.Run(); errRun != nil {
		panic(errRun)
	}
}
