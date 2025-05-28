package models

type Tour[T any] struct {
	Id     int64
	Name   string
	Place  string
	DateMS int64
	Config map[string]T
}
