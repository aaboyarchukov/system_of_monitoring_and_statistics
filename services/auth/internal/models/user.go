package models

type User struct {
	UserID     int64
	Login      string
	Password   string
	Name       string
	Surname    string
	Sex        string
	Height     int64
	Weight     int64
	Birth_date int64
}
