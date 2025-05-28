package user_manager_postgres_storage

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
)

type PostgresStorage struct {
	// db *pgxpool.Pool - for the future - connect a pool of connections
	DB *pgx.Conn
}

func New() (*PostgresStorage, error) {
	const operation string = "user_manager_postgres_storage.New"

	// connToDB, errConn := pgxpool.New(context.Background(), os.Getenv("DB_URL"))

	connToDB, errConn := pgx.Connect(context.Background(), os.Getenv("DB_URL"))
	if errConn != nil {
		return nil, fmt.Errorf("%s: %w", operation, errConn)
	}

	if errToPing := connToDB.Ping(context.Background()); errToPing != nil {
		return nil, fmt.Errorf("%s: %w", operation, errToPing)
	}

	return &PostgresStorage{
		DB: connToDB,
	}, nil
}

// future funcitons... for PostgresStorage
