package models

type PaymentOption struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Price string `json:"price"`
}
