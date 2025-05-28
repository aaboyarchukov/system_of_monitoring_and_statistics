package models

type TeamStatistic[T any] struct {
	Name         string
	Score        int64
	PlayersStats []map[string]T
}
