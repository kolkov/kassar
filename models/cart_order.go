package models

import (
	"time"
	"github.com/go-ozzo/ozzo-validation"
)

type CartOrder struct {
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

func (m CartOrder) Validate() error {
	return validation.ValidateStruct(&m,
		//validation.Field(&m.CustomerId, validation.Required, ),
		//validation.Field(&m.Registered, validation.Required),
		validation.Field(&m.PaymentOptionId, validation.Required),
	)
}

type CartOrderInput struct {
	CartOrder
	Items      []*CartOrderItem `json:"items"`
	Customer   *CartOrderCustomer`json:"customer"`
}

type CartOrderItemEmail struct {
	Name string
	Quantity int
}
