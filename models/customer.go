package models

type Customer struct {
	FirstName string `json:"firstName"`
	LastName string `json:"lastName"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}
