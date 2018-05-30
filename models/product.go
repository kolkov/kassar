package models

import "time"

type Product struct {
	Id             int                 `json:"id"`
	CategoryId     int                 `json:"-"`
	Name           string              `json:"name"`
	ProductType    string              `json:"product_type"`
	Price          float64             `json:"price"`
	Description    string              `json:"description"`
	Img            string              `json:"img"`
	Url            string              `json:"url"`
	TagDescription string              `json:"tag_description"`
	Keywords       string              `json:"keywords"`
	Properties     []ProductProperties `json:"properties"`
	UpdatedAt      time.Time           `json:"updatedAt"`
}
