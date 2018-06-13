package models

import "github.com/go-ozzo/ozzo-validation"

type Customer struct {
	Id int
	fio int
	FirstName string `json:"firstName"`
	LastName string `json:"lastName"`
	Patronymic string `json:"patronymic"`
	Gender string `json:"gender"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}

func (m Customer) Validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.fio, validation.Required),
		validation.Field(&m.FirstName, validation.Required),
		/*validation.Field(&m.LastName, validation.Required),*/
		validation.Field(&m.Phone, validation.Required),
		validation.Field(&m.Email, validation.Required),
	)
}