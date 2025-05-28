package models

type Match struct {
	MatchID       int64
	HomeTeam      string
	HomeTeamScore int64
	AwayTeam      string
	AwayTeamScore int64
	Round         string
	DateMs        int64
}
