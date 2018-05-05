package models

type ProductProperties struct {
	Id int `json:"id"`
	ProductId int `json:"product_id"`
	Name string `json:"name"`
	Value string `json:"value"`
}

