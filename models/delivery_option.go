package models

type DeliveryOption struct {
	Id int `json:"id"`
	Enabled bool `json:"enabled"`
	Name string `json:"name"`
	Description string `json:"description"`
	Price float64 `json:"price"`
}
