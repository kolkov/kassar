package models

import "github.com/go-ozzo/ozzo-validation"

type Customer struct {
	Id int
	Fio string `json:"fio"`
	FirstName string `json:"firstName"`
	LastName string `json:"lastName"`
	Patronymic string `json:"patronymic"`
	Gender string `json:"gender"`
	Phone string `json:"phone"`
	Email string `json:"email"`
	Address DeliveryAddress `json:"address" db:"-"`
	FiasAddress *Address `json:"fiasAddress" db:"-"`
}

func (m Customer) Validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.Fio, validation.Required),
		// validation.Field(&m.FirstName, validation.Required),
		/*validation.Field(&m.LastName, validation.Required),*/
		validation.Field(&m.Phone, validation.Required),
		validation.Field(&m.Email, validation.Required),
	)
}
/*
type CustomerIn struct {
	Customer
}*/