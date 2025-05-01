package postgres_storage

import (
	"context"
	"fmt"
	"os"
	"system_of_monitoring_statistics/services/auth/internal/models"

	"github.com/jackc/pgx/v5"
)

type PostgresStorage struct {
	// db *pgxpool.Pool - for the future - connect a pool of connections
	DB *pgx.Conn
}

func New() (*PostgresStorage, error) {
	const operation string = "postgres_storage.New"

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

func (db *PostgresStorage) GetUser(ctx context.Context, login string) (models.User, error) {
	sqlQuery := `SELECT * FROM users 
					WHERE users.login = @userLogin;`

	queryArgs := pgx.NamedArgs{
		"userLogin": login,
	}

	queryRows, errExecQuery := db.DB.Query(ctx, sqlQuery, queryArgs)
	if errExecQuery != nil {
		return models.User{}, errExecQuery
	}
	defer queryRows.Close()

	getUser, errGetUser := pgx.CollectExactlyOneRow(queryRows, pgx.RowToStructByName[models.User])
	if errGetUser != nil {
		return models.User{}, errGetUser
	}

	return getUser, nil
}
func (db *PostgresStorage) SaveUser(
	ctx context.Context,
	email string,
	password string,
	name string,
	surname string,
	sex string,
	height int64,
	weight int64,
	birthDate int64) (int64, error) {

	sqlQuery := `INSERT INTO 
					users(login, password, name, surname, sex, height, weight, birth_date) 
					VALUES(@userLogin, @userPassword, @userName, @userSurname, @userSex, @userHeight, @userWeight, @userBirthDate)
					RETURNING user_id;`

	queryArgs := pgx.NamedArgs{
		"userLogin":     email,
		"userPassword":  password,
		"userName":      name,
		"userSurname":   surname,
		"userSex":       sex,
		"userHeight":    height,
		"userWeight":    weight,
		"userBirthDate": birthDate,
	}

	queryRow := db.DB.QueryRow(ctx, sqlQuery, queryArgs)

	var userID int64
	errGetID := queryRow.Scan(&userID)

	if errGetID != nil {
		return -1, errGetID
	}

	return userID, nil
}

func (db *PostgresStorage) IsLoginExist(ctx context.Context, login string) (bool, error) {
	return false, nil
}
