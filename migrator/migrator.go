package main

import (
	"errors"
	"flag"
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/pgx"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func RunDownOrUpMigrations(conds string, migration *migrate.Migrate) error {
	switch conds {
	case "up":
		if errUpMigration := migration.Up(); errUpMigration != nil {
			return errUpMigration
		}
	case "down":
		if errDownMigration := migration.Down(); errDownMigration != nil {
			return errDownMigration
		}
	default:
		return fmt.Errorf("there are not conds")
	}

	return nil
}

func main() {
	var flagUpOrDown, pathToSQLFiles string
	flag.StringVar(&flagUpOrDown, "UpOrDown", "up", "for migrations directive")
	flag.StringVar(&pathToSQLFiles, "path-to-sql-files", "", "path to sql files")
	flag.Parse()

	migration, errMigration := migrate.New(
		fmt.Sprintf("file://%s", pathToSQLFiles),
		"pgx://postgres:8075@localhost:5432/vkr_test?sslmode=disable",
	)

	if errMigration != nil {
		panic(errMigration)
	}

	if errExecMigration := RunDownOrUpMigrations(flagUpOrDown, migration); errExecMigration != nil {

		if errors.Is(errExecMigration, migrate.ErrNoChange) {
			fmt.Println("no change")
			return
		}

		panic(errExecMigration)
	}

	fmt.Println("migrations applied")

}
