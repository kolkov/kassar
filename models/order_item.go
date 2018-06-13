package models

import "github.com/go-ozzo/ozzo-validation"

type OrderItem struct {
	Id int `json:"id"`
	OrderId int `json:"order_id"`
	ProductId int `json:"product_id"`
	Quantity int `json:"quantity"`
}

func (m OrderItem) Validate() error {
	return validation.ValidateStruct(&m,
		validation.Field(&m.OrderId, validation.Required),
		validation.Field(&m.ProductId, validation.Required),
		validation.Field(&m.Quantity, validation.Required),
	)
}
