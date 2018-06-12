package models

import "github.com/go-ozzo/ozzo-validation"

type CartOrderCustomer struct {
	Id int
	OrderId int
	FirstName string `json:"firstName"`
	LastName string `json:"lastName"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}

func (m CartOrderCustomer) Validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.OrderId, validation.Required),
		validation.Field(&m.FirstName, validation.Required),
		/*validation.Field(&m.LastName, validation.Required),*/
		validation.Field(&m.Phone, validation.Required),
		validation.Field(&m.Email, validation.Required),
	)
}