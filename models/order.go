package models

import (
	"time"
	"github.com/go-ozzo/ozzo-validation"
)

type Order struct {
	Id                 int       `json:"id"`
	CustomerId         int       `json:"customerId"`
	Registered         bool      `json:"registered"`
	AdditionalOptionId int       `json:"additionalOptionId"`
	DeliveryOptionId   int       `json:"deliveryOptionId"`
	PaymentOptionId    int       `json:"paymentOptionId"`
	Date               time.Time `json:"date"`
	Status             int       `json:"status"`
	Total              float64   `json:"itemsTotal"`
	GrossTotal float64          `json:"grossTotal"`
}

func (m Order) Validate() error {
	return validation.ValidateStruct(&m,
		//validation.Field(&m.CustomerId, validation.Required, ),
		//validation.Field(&m.Registered, validation.Required),
		validation.Field(&m.PaymentOptionId, validation.Required),
	)
}

type CartOrderInput struct {
	Order
	Items      []*OrderItem `json:"items"`
	Customer   *Customer    `json:"customer"`
}

type CartOrderItemEmail struct {
	Name string
	Quantity int
}
