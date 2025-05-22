package models

type User struct {
	UserID      int64
	Login       string
	Password    string
	Name        string
	Surname     string
	Sex         string
	Height      int64
	Weight      int64
	BirthDateMs int64
	PhotoURl    string
}
