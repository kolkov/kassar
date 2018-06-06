package models

type AdditionalOption struct {
	Id int `json:"id"`
	Enabled bool `json:"enabled"`
	Name string `json:"name"`
	Description string `json:"description"`
	Price string `json:"price"`
}
