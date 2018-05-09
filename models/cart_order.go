package models

import (
	"time"
	"github.com/go-ozzo/ozzo-validation"
)

type CartOrder struct {
	Id int `json:"id"`
	CustomerId int `json:"customer_id"`
	Registered bool `json:"registered"`
	PaymentType int `json:"payment_type"`
	Date time.Time `json:"date"`
	Status int `json:"status"`
	Total float64 `json:"total"`
}

func (m CartOrder) Validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.CustomerId, validation.Required,),
		//validation.Field(&m.Registered, validation.Required),
		validation.Field(&m.PaymentType, validation.Required),
	)
}

type CartOrderInput struct {
	CartOrder
	Items []*CartOrderItem `json:"items"`
}
