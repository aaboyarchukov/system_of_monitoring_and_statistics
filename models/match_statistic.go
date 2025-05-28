package models

type MatchStatistic[T any] struct {
	StatisticMeasurements []MeasurementsFields
	HomeTeamStatistic     TeamStatistic[T]
	AwayTeamStatistic     TeamStatistic[T]
}
