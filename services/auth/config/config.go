package auth_config

import (
	"os"
	"time"

	"github.com/ilyakaznacheev/cleanenv"
)

type AuthConfig struct {
	Env     string      `yaml:"env" env-default:"local"`
	Gateway AuthGateway `yaml:"auth-gateway"`
	GRPC    AuthGRPC    `yaml:"grpc"`
}

type AuthGRPC struct {
	Port    int           `yaml:"port"`
	Timeout time.Duration `yaml:"timeout" env-default:"5h"`
}

type AuthGateway struct {
	Port int `yaml:"port"`
}

func MustLoad() *AuthConfig {
	var config AuthConfig
	configPath := getConfigPath()
	if configPath == "" {
		panic("failed on get env var CONFIG_AUTH_PATH")
	}

	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		panic("config is not exist or path to file is wrong")
	}

	errGetConfig := cleanenv.ReadConfig(configPath, &config)
	if errGetConfig != nil {
		panic("failed on parse config file")
	}

	return &config

}

func getConfigPath() string {
	return os.Getenv("CONFIG_AUTH_PATH")
}
